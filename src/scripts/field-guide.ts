// input: Versioned quiz answers, workbook notes and optional report API response
// output: A readable, interactive personal field guide with a print-ready workbook
// pos: src/scripts/field-guide.ts (更新规则：页面变化同步报告样式、数据模块与本目录 README)
import { buildFieldGuide, readFieldGuide, sampleGuideInput, GUIDE_COPY, GUIDE_VERSION, type GuideLanguage } from '../data/fieldGuide';
import { normalizeReportInput, fetchDossier, isDossierReport } from '../data/reportDelivery';
import { computeScores } from '../data/scoring';
import { QUESTIONS } from '../data/questions';
import { SOUL_CODES, type SoulCode } from '../data/souls';

const el = (id: string) => document.getElementById(id)!;
const escape = (s: unknown) => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);
const format = (n: number) => n.toFixed(1).replace(/\.0$/, '');
const root = el('guide');
const language = el('report-language') as HTMLSelectElement;
const pdf = el('save-pdf') as HTMLButtonElement;
const preview = import.meta.env.DEV && new URLSearchParams(location.search).get('preview') === '1';
let lang: GuideLanguage = new URLSearchParams(location.search).get('lang') === 'es' ? 'es' : 'en';
try { if (!new URLSearchParams(location.search).has('lang') && JSON.parse(localStorage.getItem('soul_virtues_last_result') || '{}')?.lang === 'es') lang = 'es'; } catch { /* The missing-answer screen handles damaged storage. */ }
let guide: ReturnType<typeof buildFieldGuide>;
let state: { createdAt: string; focus: SoulCode; notes: Record<string, string>; completed: Record<string, boolean[]> };
let storageKey = '';
const note = (id: string, label: string, large = false) => `<div><label for="note-${id}">${escape(label)}</label><textarea class="note-input" id="note-${id}" data-note="${id}" maxlength="2000" rows="${large ? 5 : 3}" placeholder="${escape(guide.copy.notePlaceholder)}"></textarea><div class="print-note" data-print-note="${id}" data-placeholder="${escape(guide.copy.noteBlank)}"></div></div>`;

function saveState() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); el('save-state').textContent = guide.copy.saved; }
  catch { el('save-state').textContent = guide.copy.saveFailed; }
}
function spectrum() {
  return guide.traits.map(t => `<div class="bar-row" style="--trait:${t.ink}" data-score="${t.score}"><div class="bar-label"><span>${escape(t.name)}</span><strong>${format(t.score)} / 100</strong></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${t.score}%"></div></div></div>`).join('');
}
function traitReading(t: typeof guide.traits[number]) {
  const c = guide.copy;
  const receipts = t.evidence.map(item => `<article class="receipt"><p class="receipt-id">#${item.number} · ${escape(item.id)}</p><blockquote>“${escape(item.question)}”</blockquote><footer><span>${escape(c.response)}</span><strong>${escape(item.answer)}</strong></footer><small>${escape(item.reverse ? c.reverse : c.direct)} · ${escape(c.contribution)}: ${item.keyed - 3 > 0 ? '+' : ''}${item.keyed - 3}</small></article>`).join('');
  return `<details class="trait-detail" id="trait-${t.code}" style="--trait:${t.ink}" ${guide.ranked.slice(0, 2).includes(t) ? 'open' : ''}>
    <summary><span class="trait-dot" aria-hidden="true"></span><span class="trait-name">${escape(t.name)}</span><span class="trait-value">${format(t.score)}<small> / 100</small></span><span class="trait-plus" aria-hidden="true">+</span></summary>
    <div class="trait-inner"><p class="trait-definition">${escape(t.focus)}</p>
      <div class="trait-facts"><div><h4>${escape(c.signal)}</h4><p>${escape(t.signal)} ${escape(t.pattern)}</p><p class="small-note">${escape(c.mean)}: ${format(t.mean)} / 5 · ${t.total} ${escape(c.items)}</p></div><div><h4>${escape(c.check)}</h4><p>${escape(t.prompt)}</p><p class="small-note">${escape(c.scale)}</p></div></div>
      ${guide.answers ? `<div class="distribution"><span><strong>${t.positive}</strong>${escape(c.supports)}</span><span><strong>${t.neutral}</strong>${escape(c.neutral)}</span><span><strong>${t.negative}</strong>${escape(c.counters)}</span></div><p class="small-note">${escape(c.countNote)}</p><h4>${escape(c.receipt)}</h4><p class="small-note">${escape(c.evidenceNote)}</p><div class="evidence-grid">${receipts}</div>` : `<p class="small-note">${escape(c.legacy)}</p>`}
      <div class="reflection-prompt"><h4>${escape(c.try)}</h4><p>${escape(t.experiment)}</p><p class="small-note"><strong>${escape(c.boundary)}:</strong> ${escape(t.boundary)}</p>${note('trait-' + t.code, t.prompt)}</div>
    </div></details>`;
}
function renderPlan() {
  const c = guide.copy;
  const t = guide.traits.find(item => item.code === state.focus)!;
  const checked = state.completed[state.focus] || [];
  const done = checked.filter(Boolean).length;
  el('plan-count').textContent = done + ' / 7 ' + c.done;
  el('plan-fill').style.width = (done / 7 * 100) + '%';
  el('plan-rows').innerHTML = c.weeks.map((title, i) => `<div class="plan-row ${checked[i] ? 'completed' : ''}"><input type="checkbox" id="day-${i}" data-day="${i}" ${checked[i] ? 'checked' : ''}><div><label for="day-${i}">${escape(c.day)} ${i + 1} — ${escape(title)}</label><p>${escape(c.tasks[i])}${i === 2 ? ' ' + escape(t.experiment) : ''}${i === 6 ? ' ' + escape(t.outcome) : ''}</p><small>${escape(c.outputs[i])}</small></div></div>`).join('');
  el('focus-print').textContent = t.name;
  el('plan-rows').querySelectorAll<HTMLInputElement>('[data-day]').forEach(input => input.addEventListener('change', () => {
    const items = state.completed[state.focus] || Array(7).fill(false);
    items[Number(input.dataset.day)] = input.checked;
    state.completed[state.focus] = items;
    input.closest('.plan-row')!.classList.toggle('completed', input.checked);
    el('plan-count').textContent = items.filter(Boolean).length + ' / 7 ' + c.done;
    el('plan-fill').style.width = (items.filter(Boolean).length / 7 * 100) + '%';
    saveState();
  }));
}
function render() {
  const c = guide.copy;
  document.documentElement.lang = lang;
  language.value = lang;
  pdf.textContent = c.save;
  pdf.disabled = false;
  el('contents-label').textContent = c.contents;
  const sections = ['overview', 'readings', 'practice', 'week', 'notes', 'method'] as const;
  el('contents').innerHTML = sections.map(key => `<a href="#${key}">${escape(c[key])}</a>`).join('');
  const first = guide.ranked[0];
  const second = guide.ranked[1];
  const dates = new Date(state.createdAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  root.innerHTML = `
    <section id="overview" class="cover print-page">
      ${preview ? `<p class="print-only sample-stamp">${escape(c.sample)}</p>` : ''}
      <p class="kicker">${escape(c.edition)} / ${guide.id}</p>
      <h1>${escape(c.title)}</h1><p class="cover-intro">${escape(c.lead)} ${escape(c.intro)}</p>
      <div class="report-meta"><span>${escape(dates)}</span><span>${guide.answers ? escape(c.scope) : escape(c.rank)}</span><span>Edition 01</span></div>
      <div class="overview-grid"><div class="profile-note"><div><h2>${escape(guide.title)}</h2><p>${escape(guide.summary)}</p><h4>${escape(c.try)}</h4><p>${escape(first.experiment)}</p></div><div><div class="pair"><span>${escape(first.name)} · ${format(first.score)}</span><span>${escape(second.name)} · ${format(second.score)}</span></div><strong class="pair-gap">${format(guide.gap)} <small style="font:14px var(--sans)">${escape(c.gap)}</small></strong></div></div><div class="spectrum"><h3>${escape(c.rank)}</h3><div class="spectrum-grid">${spectrum()}</div><p class="scale-legend">${escape(c.midpoint)}<br>${escape(c.scale)}</p></div></div>
      <div class="guide-includes"><span><strong>7</strong>${lang === 'es' ? 'rasgos' : 'traits'}</span><span><strong>${guide.answers ? '14' : '0'}</strong>${escape(c.receipt)}</span><span><strong>7</strong>${lang === 'es' ? 'días de práctica' : 'practice days'}</span></div>
      ${!guide.answers ? `<p class="language-note">${escape(c.legacy)}</p>` : ''}
    </section>
    <section id="readings" class="chapter print-page"><div class="chapter-heading"><h2>${escape(c.readings)}</h2><p class="section-intro">${escape(c.readingIntro)}</p></div>${guide.ranked.map(traitReading).join('')}</section>
    <section id="practice" class="chapter print-page"><h2>${escape(c.practice)}</h2><p class="section-intro">${escape(c.actionsIntro)}</p>
      ${[first, second, guide.ranked[6]].filter((t, i, arr) => arr.indexOf(t) === i).map(t => `<article class="scenario"><div class="scenario-context"><h3>${escape(t.name)}</h3><p>${escape(t.scenario)}</p><p class="small-note">${format(t.score)} / 100 · ${escape(t.signal)}</p></div><div class="scenario-steps"><div><h4>${escape(c.before)}</h4><p>${escape(t.prompt)}</p></div><div><h4>${escape(c.next)}</h4><p>${escape(t.experiment)}</p></div><div><h4>${escape(c.after)}</h4><p>${escape(t.outcome)}</p></div></div></article>`).join('')}
    </section>
    <section id="week" class="chapter print-page"><h2>${escape(c.week)}</h2><p class="section-intro">${escape(c.planIntro)}</p>
      <div class="focus-picker"><label for="practice-focus">${escape(c.focus)}</label><select id="practice-focus">${guide.traits.map(t => `<option value="${t.code}" ${t.code === state.focus ? 'selected' : ''}>${escape(t.name)}</option>`).join('')}</select><strong id="focus-print" class="print-only"></strong></div>
      <p class="small-note" id="plan-count" role="status"></p><div class="plan-meter" aria-hidden="true"><span id="plan-fill"></span></div><div id="plan-rows"></div>
    </section>
    <section id="notes" class="chapter print-page"><h2>${escape(c.notes)}</h2><p class="section-intro">${escape(c.notesIntro)}</p><div class="note-grid">${note('goal', c.goal, true)}${note('cue', c.cue, true)}${note('action', c.action, true)}${note('review', c.review, true)}</div></section>
    <section id="method" class="chapter source-footer print-page"><h2>${escape(c.sources)}</h2><p>${escape(c.sourcesBody)}</p><p>${escape(c.formula)}</p><p>${escape(c.limits)}</p><p><a href="${lang === 'es' ? '/es' : ''}/method/">${escape(c.methodLink)} ↗</a></p><p>${escape(c.support)} <a href="mailto:tangjei414@gmail.com">tangjei414@gmail.com</a></p><p class="small-note">${escape(c.notesIntro)}</p></section>
    <section class="ai-panel print-page" id="ai"><h2>${escape(c.aiTitle)}</h2><p class="no-print">${escape(c.aiBody)}</p><button id="request-ai" class="secondary no-print" ${preview ? 'disabled' : ''}>${escape(c.aiButton)}</button><p class="small-note no-print" id="ai-status" role="status">${preview ? escape(c.sampleAi) : ''}</p><div class="ai-result" id="ai-result" hidden></div></section>
    <footer class="chapter no-print source-footer"><p>${escape(c.printHelp)}</p><a href="${lang === 'es' ? '/es/' : '/'}">← ${escape(c.home)}</a></footer>`;
  root.querySelectorAll<HTMLTextAreaElement>('[data-note]').forEach(input => {
    const id = input.dataset.note!;
    input.value = state.notes[id] || '';
    root.querySelector<HTMLElement>('[data-print-note="' + id + '"]')!.textContent = input.value;
    input.addEventListener('input', () => {
      state.notes[id] = input.value;
      root.querySelector<HTMLElement>('[data-print-note="' + id + '"]')!.textContent = input.value;
      saveState();
    });
  });
  el('practice-focus').addEventListener('change', event => { state.focus = (event.target as HTMLSelectElement).value as SoulCode; renderPlan(); saveState(); });
  renderPlan();
  el('request-ai').addEventListener('click', requestAI);
  document.body.dataset.reportState = 'ready';
  root.setAttribute('aria-busy', 'false');
  saveState();
}
async function requestAI() {
  if (preview) return;
  const button = el('request-ai') as HTMLButtonElement;
  const status = el('ai-status');
  const result = el('ai-result');
  button.disabled = true;
  status.textContent = guide.copy.aiBusy;
  try {
    const input = { ...guide.input, lang };
    const fingerprint = JSON.stringify(input);
    const cacheKey = 'soul_field_ai_' + guide.id + '_' + lang;
    let cache;
    try { cache = JSON.parse(localStorage.getItem(cacheKey) || 'null'); } catch { /* A damaged optional cache may be regenerated. */ }
    const local = ['localhost', '127.0.0.1'].includes(location.hostname);
    const report = cache?.fingerprint === fingerprint && isDossierReport(cache.report) ? cache.report : await fetchDossier(local ? 'https://soulvirtues.org/api/generate-report' : '/api/generate-report', input);
    try { localStorage.setItem(cacheKey, JSON.stringify({ fingerprint, report })); } catch { /* The guide remains usable without storage. */ }
    result.replaceChildren();
    for (const [heading, body] of [[guide.copy.check, report.engine], [guide.copy.try, report.actionPlan.quest]]) {
      const h = document.createElement('h3'); h.textContent = heading;
      const p = document.createElement('p'); p.textContent = body;
      result.append(h, p);
    }
    result.hidden = false;
    status.textContent = report.source === 'ai' ? guide.copy.aiSource : guide.copy.aiPrepared;
  } catch { status.textContent = guide.copy.aiError; }
  finally { button.disabled = false; }
}
function init() {
  try {
    if (preview) {
      const answers = sampleGuideInput();
      const input = normalizeReportInput({ pct: computeScores(answers, QUESTIONS).pct, lang: 'en' })!;
      guide = buildFieldGuide(input, answers, lang);
      el('preview-banner').hidden = false;
      el('preview-banner').textContent = GUIDE_COPY[lang].sample;
    } else {
      const stored = readFieldGuide(localStorage, lang);
      if (!stored) throw new Error('Missing completed answers');
      guide = stored;
    }
    storageKey = 'soul_field_notes_' + GUIDE_VERSION + '_' + guide.id;
    let saved;
    try { saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { /* Keep reading possible if old notes are damaged. */ }
    const notes: Record<string, string> = {};
    for (const [key, value] of Object.entries(saved?.notes || {})) if (typeof value === 'string') notes[key] = value.slice(0, 2000);
    const completed: Record<string, boolean[]> = {};
    for (const code of SOUL_CODES) completed[code] = Array.isArray(saved?.completed?.[code]) ? Array.from({ length: 7 }, (_, i) => saved.completed[code][i] === true) : Array(7).fill(false);
    state = { createdAt: typeof saved?.createdAt === 'string' && Number.isFinite(Date.parse(saved.createdAt)) ? saved.createdAt : new Date().toISOString(), focus: SOUL_CODES.includes(saved?.focus) ? saved.focus : guide.ranked[0].code, notes, completed };
    render();
  } catch {
    const c = GUIDE_COPY[lang];
    root.innerHTML = `<section class="empty-state"><h1>${escape(c.noAnswers)}</h1><p>${escape(c.noAnswersBody)}</p><a href="/#test">${escape(c.home)} →</a><p><a href="mailto:tangjei414@gmail.com">tangjei414@gmail.com</a></p></section>`;
    root.setAttribute('aria-busy', 'false');
    document.body.dataset.reportState = 'missing-answers';
    pdf.disabled = true;
  }
}
language.addEventListener('change', () => {
  lang = language.value === 'es' ? 'es' : 'en';
  const url = new URL(location.href);url.searchParams.set('lang', lang);history.replaceState(null, '', url);init();
});
const openBeforePrint = new Map<HTMLDetailsElement, boolean>();
window.addEventListener('beforeprint', () => { document.querySelectorAll<HTMLDetailsElement>('.trait-detail').forEach(detail => { if (!openBeforePrint.has(detail)) openBeforePrint.set(detail, detail.open);detail.open = true; }); });
window.addEventListener('afterprint', () => { openBeforePrint.forEach((open, detail) => { detail.open = open; });openBeforePrint.clear(); });
pdf.addEventListener('click', () => { el('save-state').textContent = guide.copy.printHelp;window.print(); });
init();
