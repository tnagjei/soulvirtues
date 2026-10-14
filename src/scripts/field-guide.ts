// input: Paid saved answers, automatic AI interpretation and local workbook notes
// output: A readable, interactive personal field guide with a print-ready workbook
// pos: src/scripts/field-guide.ts (更新规则：页面变化同步报告样式、数据模块与本目录 README)
import { GUIDE_COPY, GUIDE_VERSION, type GuideLanguage } from '../data/fieldGuide';
import { paidReport, privateReportLink, reportApi, resolveAccess, ReportApiError, type FieldGuide, type PaidReport, type ReportAccess } from '../data/paidReport';
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
let guide: FieldGuide;
let access: ReportAccess | null = null;
let paid: PaidReport | null = null;
let loadVersion = 0;
let state: { createdAt: string; focus: SoulCode; notes: Record<string, string>; completed: Record<string, boolean[]> };
let storageKey = '';
const note = (id: string, label: string, large = false) => `<div><label for="note-${id}">${escape(label)}</label><textarea class="note-input" id="note-${id}" data-note="${id}" maxlength="2000" rows="${large ? 5 : 3}" placeholder="${escape(guide.copy.notePlaceholder)}"></textarea><div class="print-note" data-print-note="${id}" data-placeholder="${escape(guide.copy.noteBlank)}"></div></div>`;
function applyInterpretation() {
  if(!paid)return;
  guide=structuredClone(paid.guide);
  if(!paid.ai)return;
  guide.title=paid.ai.summary.title;
  guide.summary=paid.ai.summary.interpretation+'\n\n'+paid.ai.summary.tension;
  for(const trait of guide.traits){
    const reading=paid.ai.traits.find(t=>t.code===trait.code)!;
    trait.signal=reading.interpretation;trait.pattern='';trait.prompt=reading.reflection;trait.experiment=reading.experiment;
  }
  guide.ranked=paid.guide.ranked.map(t=>guide.traits.find(item=>item.code===t.code)!);
}

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
  el('plan-rows').innerHTML = c.weeks.map((title, i) => `<div class="plan-row ${checked[i] ? 'completed' : ''}"><input type="checkbox" id="day-${i}" data-day="${i}" ${checked[i] ? 'checked' : ''}><div><label for="day-${i}">${escape(c.day)} ${i + 1} — ${escape(paid?.ai?.plan[i].title||title)}</label><p>${paid?.ai?escape(paid.ai.plan[i].task):escape(c.tasks[i])+(i===2?' '+escape(t.experiment):'')+(i===6?' '+escape(t.outcome):'')}</p><small>${escape(paid?.ai?.plan[i].observe||c.outputs[i])}</small></div></div>`).join('');
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
  pdf.disabled = !preview && !paid?.ai && paid?.aiState.status!=='awaiting-consent';
  el('contents-label').textContent = c.contents;
  const sections = ['overview', 'readings', 'practice', 'week', 'notes', 'method'] as const;
  el('contents').innerHTML = sections.map(key => `<a href="#${key}">${escape(c[key])}</a>`).join('');
  const first = guide.ranked[0];
  const second = guide.ranked[1];
  const dates = new Date(state.createdAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  root.innerHTML = `
    <section id="overview" class="cover print-page">
      ${preview ? `<p class="print-only sample-stamp">${escape(c.sample)}</p>` : ''}
      <p class="kicker">${paid?.ai ? (lang==='es'?'Interpretación con AI de tus 66 respuestas':'AI interpretation of your 66 answers') : escape(c.edition)} / ${guide.id}</p>
      <h1>${escape(c.title)}</h1><p class="cover-intro">${escape(c.lead)} ${escape(c.intro)}</p>
      <div class="report-meta"><span>${escape(dates)}</span><span>${guide.answers ? escape(c.scope) : escape(c.rank)}</span><span>Edition 01</span></div>
      <div class="overview-grid"><div class="profile-note"><div><h2>${escape(guide.title)}</h2><p>${escape(guide.summary)}</p><h4>${escape(c.try)}</h4><p>${escape(paid?.ai?.summary.nextStep||first.experiment)}</p></div><div><div class="pair"><span>${escape(first.name)} · ${format(first.score)}</span><span>${escape(second.name)} · ${format(second.score)}</span></div><strong class="pair-gap">${format(guide.gap)} <small style="font:14px var(--sans)">${escape(c.gap)}</small></strong></div></div><div class="spectrum"><h3>${escape(c.rank)}</h3><div class="spectrum-grid">${spectrum()}</div><p class="scale-legend">${escape(c.midpoint)}<br>${escape(c.scale)}</p></div></div>
      <div class="guide-includes"><span><strong>7</strong>${lang === 'es' ? 'rasgos' : 'traits'}</span><span><strong>${guide.answers ? '14' : '0'}</strong>${escape(c.receipt)}</span><span><strong>7</strong>${lang === 'es' ? 'días de práctica' : 'practice days'}</span></div>
      ${!guide.answers ? `<p class="language-note">${escape(c.legacy)}</p>` : ''}
    </section>
    <section id="readings" class="chapter print-page"><div class="chapter-heading"><h2>${escape(c.readings)}</h2><p class="section-intro">${escape(c.readingIntro)}</p></div>${guide.ranked.map(traitReading).join('')}</section>
    <section id="practice" class="chapter print-page"><h2>${escape(c.practice)}</h2><p class="section-intro">${escape(c.actionsIntro)}</p>
      ${paid?.ai ? paid.ai.scenarios.map(s=>`<article class="scenario"><div class="scenario-context"><h3>${escape(s.title)}</h3><p>${escape(s.context)}</p></div><div class="scenario-steps"><div><h4>${escape(c.next)}</h4><p>${escape(s.action)}</p></div><div><h4>${escape(c.after)}</h4><p>${escape(s.observe)}</p></div></div></article>`).join('') : [first, second, guide.ranked[6]].filter((t, i, arr) => arr.indexOf(t) === i).map(t => `<article class="scenario"><div class="scenario-context"><h3>${escape(t.name)}</h3><p>${escape(t.scenario)}</p><p class="small-note">${format(t.score)} / 100 · ${escape(t.signal)}</p></div><div class="scenario-steps"><div><h4>${escape(c.before)}</h4><p>${escape(t.prompt)}</p></div><div><h4>${escape(c.next)}</h4><p>${escape(t.experiment)}</p></div><div><h4>${escape(c.after)}</h4><p>${escape(t.outcome)}</p></div></div></article>`).join('')}
    </section>
    <section id="week" class="chapter print-page"><h2>${escape(c.week)}</h2><p class="section-intro">${paid?.ai?(lang==='es'?'Un plan de siete días basado en el conjunto de tus respuestas. Prueba cada paso cuando encaje en tu semana.':'A seven-day plan based on your whole answer pattern. Try each small step when it fits your week.'):escape(c.planIntro)}</p>
      <div class="focus-picker"><label for="practice-focus">${escape(c.focus)}</label><select id="practice-focus">${guide.traits.map(t => `<option value="${t.code}" ${t.code === state.focus ? 'selected' : ''}>${escape(t.name)}</option>`).join('')}</select><strong id="focus-print" class="print-only"></strong></div>
      <p class="small-note" id="plan-count" role="status"></p><div class="plan-meter" aria-hidden="true"><span id="plan-fill"></span></div><div id="plan-rows"></div>
    </section>
    <section id="notes" class="chapter print-page"><h2>${escape(c.notes)}</h2><p class="section-intro">${escape(c.notesIntro)}</p><div class="note-grid">${note('goal', c.goal, true)}${note('cue', c.cue, true)}${note('action', c.action, true)}${note('review', c.review, true)}</div></section>
    <section id="method" class="chapter source-footer print-page"><h2>${escape(c.sources)}</h2><p>${escape(c.sourcesBody)}</p><p>${escape(c.formula)}</p><p>${escape(c.limits)}</p><p><a href="${lang === 'es' ? '/es' : ''}/method/">${escape(c.methodLink)} ↗</a></p><p>${escape(c.support)} <a href="mailto:tangjei414@gmail.com">tangjei414@gmail.com</a></p><p class="small-note">${escape(c.notesIntro)}</p></section>
    <section class="ai-panel" id="ai"><h2>${lang==='es'?'Cómo se generó tu interpretación':'How your interpretation was generated'}</h2><p id="ai-status" class="small-note" role="status"></p>${paid?.aiState.status==='awaiting-consent'?`<p>${lang==='es'?'Este pedido anterior no autorizaba enviar tus respuestas a AI. Puedes consentir el envío de tus 66 respuestas y puntuaciones a DeepSeek sin volver a pagar. No se envían correo, pagos ni notas.':'This earlier order did not authorize AI processing of answers. You may consent to sending the 66 statements, answers and scores to DeepSeek without paying again. Email, payment details and notes are not sent.'}</p><button id="request-ai" class="secondary no-print">${lang==='es'?'Aceptar y preparar con AI':'Agree and prepare with AI'}</button>`:''}</section>
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
  document.getElementById('request-ai')?.addEventListener('click', requestAI);
  document.body.dataset.reportState = 'ready';
  root.setAttribute('aria-busy', 'false');
  saveState();
  if (!preview && paid) {
    if (paid.testMode) {
      el('preview-banner').hidden = false;
      el('preview-banner').textContent = lang === 'es' ? 'PAGO DE PRUEBA · No se ha cobrado dinero real' : 'TEST PAYMENT · No real money was charged';
    }
    const box = el('delivery-status');
    box.hidden = false;
    const number = paid.order.number || (lang === 'es' ? 'Ver recibo de Waffo' : 'See your Waffo receipt');
    const expiry = paid.expiresAt ? new Date(paid.expiresAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB') : '';
    box.textContent = lang === 'es'
      ? `Pago confirmado · Pedido ${number}. Guarda el PDF y tu enlace privado. Acceso online hasta ${expiry}; las notas quedan en este navegador.`
      : `Payment confirmed · Order ${number}. Save your PDF and private link. Online access until ${expiry}; notes stay in this browser.`;
    const copy = el('save-report-link') as HTMLButtonElement;
    copy.hidden = false; copy.disabled = false;
    copy.textContent = lang === 'es' ? 'Guardar enlace privado' : 'Save private link';
    updateAIStatus();
  }
}
function updateAIStatus() {
  if(!paid)return;
  const status=paid.aiState.status;
  document.body.dataset.aiState=status;
  const source=paid.ai ? `DeepSeek · ${paid.ai.model} · ${new Date(paid.ai.generatedAt).toLocaleString(lang==='es'?'es-ES':'en-GB')}` : '';
  el('ai-status').textContent=paid.ai ? source+' · '+(lang==='es'?'Interpretación de tus 66 respuestas, integrada en las lecturas y el PDF. Compruébala con ejemplos propios.':'Interpretation of your 66 answers, included throughout the readings and PDF. Check it against your own examples.') : status==='awaiting-consent' ? (lang==='es'?'Guía original disponible; AI requiere tu consentimiento.':'Your original workbook is available; AI requires your consent.') : status==='failed' ? (lang==='es'?'No se pudo finalizar la interpretación. No vuelvas a pagar; contacta con soporte con tu pedido.':'The AI interpretation could not finish. Do not pay again; contact support with your order number.') : (lang==='es'?'Tu interpretación se está preparando automáticamente en segundo plano. Puedes cerrar esta página y volver mediante tu enlace privado.':'Your AI interpretation is preparing automatically in the background. You can close this page and return using your private link.')+(status==='retrying'?' '+(lang==='es'?'Se está reintentando.':'An automatic retry is scheduled.'):'');
  if(!paid.ai && status!=='awaiting-consent')el('delivery-status').textContent=(lang==='es'?'Pago confirmado':'Payment confirmed')+(paid.order.number?' · '+paid.order.number:'')+'. '+el('ai-status').textContent;
}
async function requestAI() {
  if (preview || !access) return;
  const requestedLanguage = lang;
  const requestedAccess = access;
  const button = el('request-ai') as HTMLButtonElement;
  const status = el('ai-status');
  button.disabled = true;
  status.textContent = guide.copy.aiBusy;
  try {
    const response = await reportApi('/api/generate-report', access, { reportId: access.id, lang,consent:true });
    if (requestedLanguage !== lang || requestedAccess.id !== access?.id) return;
    await init();
  } catch(error) { status.textContent = error instanceof Error?error.message:guide.copy.aiError; }
  finally { button.disabled = false; }
}
async function init() {
  const version = ++loadVersion;
  pdf.disabled = true;
  const copyButton = el('save-report-link') as HTMLButtonElement;
  copyButton.disabled = true; copyButton.hidden = true;
  el('delivery-status').hidden = true;
  el('contents').textContent = '';
  root.setAttribute('aria-busy', 'true');
  try {
    if (preview) {
      const { buildFieldGuide, sampleGuideInput } = await import('../data/fieldGuide');
      const { computeScores } = await import('../data/scoring');
      const { QUESTIONS } = await import('../data/questions');
      const { normalizeReportInput } = await import('../data/reportDelivery');
      const answers = sampleGuideInput();
      const input = normalizeReportInput({ pct: computeScores(answers, QUESTIONS).pct, lang: 'en' })!;
      guide = buildFieldGuide(input, answers, lang);
      el('preview-banner').hidden = false;
      el('preview-banner').textContent = GUIDE_COPY[lang].sample;
    } else {
      const url = new URL(location.href);
      access = resolveAccess(localStorage, url);
      if (!access) throw new ReportApiError(401, 'Open your private report link or use the browser where you purchased.');
      if (url.hash && localStorage.getItem('soulvirtues_paid_access_v1')?.includes(access.token)) { url.hash = ''; history.replaceState(null, '', url); }
      paid = null;
      const deadline = Date.now() + 75000;
      for (let attempt = 0; attempt < 16 && Date.now() < deadline; attempt++) {
        if (version !== loadVersion) return;
        paid = await paidReport(access, lang, Math.min(16000, Math.max(1, deadline - Date.now())));
        if (paid) break;
        root.innerHTML = `<section class="empty-state"><h1>${lang === 'es' ? 'Confirmando tu pago' : 'Confirming your payment'}</h1><p>${lang === 'es' ? 'Estamos comprobando el pedido con Waffo. No vuelvas a pagar. Después del pago, pulsa Done en Waffo para regresar.' : 'We are checking the order with Waffo. Do not pay again. After payment, click Done in Waffo to return.'}</p></section>`;
        document.body.dataset.reportState = 'payment-pending';
        await new Promise(resolve => setTimeout(resolve, Math.min(4000, Math.max(0, deadline - Date.now()))));
      }
      if (version !== loadVersion) return;
      if (!paid) throw new ReportApiError(202, 'Payment confirmation is still pending. Do not pay again; check your Waffo receipt and retry.');
      applyInterpretation();
    }
    if (version !== loadVersion) return;
    storageKey = 'soul_field_notes_' + GUIDE_VERSION + '_' + guide.id;
    let saved;
    try { saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { /* Keep reading possible if old notes are damaged. */ }
    const notes: Record<string, string> = {};
    for (const [key, value] of Object.entries(saved?.notes || {})) if (typeof value === 'string') notes[key] = value.slice(0, 2000);
    const completed: Record<string, boolean[]> = {};
    for (const code of SOUL_CODES) completed[code] = Array.isArray(saved?.completed?.[code]) ? Array.from({ length: 7 }, (_, i) => saved.completed[code][i] === true) : Array(7).fill(false);
    state = { createdAt: typeof saved?.createdAt === 'string' && Number.isFinite(Date.parse(saved.createdAt)) ? saved.createdAt : new Date().toISOString(), focus: SOUL_CODES.includes(saved?.focus) ? saved.focus : guide.ranked[0].code, notes, completed };
    render();
    if(!preview && paid && !['ready','failed','awaiting-consent'].includes(paid.aiState.status)) void watchAI(version);
  } catch (error) {
    if (version !== loadVersion) return;
    const c = GUIDE_COPY[lang];
    const message = error instanceof Error ? error.message : c.noAnswersBody;
    root.innerHTML = `<section class="empty-state"><h1>${lang === 'es' ? 'Acceso a tu informe' : 'Your report access'}</h1><p>${escape(message)}</p><p>${lang === 'es' ? 'Si pagaste, no necesitas volver a pagar. Contacta con nosotros con tu número de pedido.' : 'If you already paid, do not pay again. Contact us with your Waffo order number if you need help.'}</p><button id="retry-report" class="secondary">${lang === 'es' ? 'Volver a comprobar' : 'Check again'}</button><p><a href="mailto:tangjei414@gmail.com">tangjei414@gmail.com</a></p><a href="/#test">${escape(c.home)} →</a></section>`;
    el('retry-report').addEventListener('click', init);
    root.setAttribute('aria-busy', 'false');
    document.body.dataset.reportState = error instanceof ReportApiError && error.status === 202 ? 'payment-pending' : 'access-error';
    pdf.disabled = true;
  }
}
async function watchAI(version:number) {
  const deadline=Date.now()+600000;
  while(version===loadVersion && access && paid && Date.now()<deadline){
    await new Promise(resolve=>setTimeout(resolve,6000));
    if(version!==loadVersion)return;
    try{
      const latest=await paidReport(access,lang);
      if(version!==loadVersion)return;
      if(!latest)continue;
      paid=latest;
      if(paid.ai){
        const opened=new Set(Array.from(root.querySelectorAll<HTMLDetailsElement>('details[open]'),d=>d.id));
        applyInterpretation();render();
        root.querySelectorAll<HTMLDetailsElement>('details').forEach(d=>d.open=opened.has(d.id));
        return;
      }
      updateAIStatus();
      if(['failed','awaiting-consent'].includes(paid.aiState.status))return;
    }catch(error){
      if(version!==loadVersion)return;
      if(error instanceof ReportApiError && [401,403,404,410].includes(error.status)){void init();return;}
      el('delivery-status').textContent=lang==='es'?'La conexión se interrumpió; volveremos a comprobar el mismo pedido. No vuelvas a pagar.':'Connection interrupted; checking the same order again automatically. Do not pay again.';
    }
  }
  if(version===loadVersion && paid && !paid.ai)el('delivery-status').textContent=lang==='es'?'La preparación está tardando más de lo esperado. Guarda tu enlace privado para volver a este pedido. Si necesitas ayuda, contacta con tangjei414@gmail.com; no vuelvas a pagar.':'Preparation is taking longer than expected. Save your private link to return to this order. For help, contact tangjei414@gmail.com; do not pay again.';
}
language.addEventListener('change', () => {
  lang = language.value === 'es' ? 'es' : 'en';
  const url = new URL(location.href);url.searchParams.set('lang', lang);history.replaceState(null, '', url);init();
});
const openBeforePrint = new Map<HTMLDetailsElement, boolean>();
window.addEventListener('beforeprint', () => { document.querySelectorAll<HTMLDetailsElement>('.trait-detail').forEach(detail => { if (!openBeforePrint.has(detail)) openBeforePrint.set(detail, detail.open);detail.open = true; }); });
window.addEventListener('afterprint', () => { openBeforePrint.forEach((open, detail) => { detail.open = open; });openBeforePrint.clear(); });
pdf.addEventListener('click', () => { el('save-state').textContent = guide.copy.printHelp;window.print(); });
el('save-report-link').addEventListener('click', async () => {
  if (!access || preview) return;
  const link = privateReportLink(location.origin, access);
  const warning = lang === 'es' ? 'Guarda este enlace en privado: quien lo tenga podrá leer tu informe. Las notas no se sincronizan entre dispositivos.' : 'Keep this link private: anyone with it can read your report. Notes do not sync between devices.';
  try { await navigator.clipboard.writeText(link); el('save-state').textContent = (lang === 'es' ? 'Enlace copiado. ' : 'Link copied. ') + warning; }
  catch {
    const input = el('private-report-link') as HTMLInputElement;
    input.value = link; input.hidden = false; input.focus(); input.select();
    el('save-state').textContent = (lang === 'es' ? 'Copia manualmente el enlace mostrado. ' : 'Copy the displayed link manually. ') + warning;
  }
});
init();
