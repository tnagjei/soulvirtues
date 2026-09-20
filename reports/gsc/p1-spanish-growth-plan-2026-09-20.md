# 西语增长详细计划（P1）

- 站点：`sc-domain:soulvirtues.org`
- 制定时间：2026-09-20
- 数据依据：Day 1–30 GSC 全量定稿数据（2026-08-18~09-16）+ GoAnyAPI 实时 SERP（2026-09-20）+ 线上页面实测
- 前置结论：英文品类词 `soul virtues extractor` 已结案（不可竞争，见 `p0-brand-query-investigation-2026-09-20.md`）。计划聚焦西语。
- 本轮状态：**计划已出，未执行任何改动**

---

## 0. 先看底牌：西语现在什么水平

| 指标 | 西语词簇 | 英文词簇 |
|---|---:|---:|
| 可归因词数 | 262 | 1,228 |
| 点击 | 7,747 | 5,615 |
| 曝光 | 22,438 | 47,388 |
| CTR | **34.53%** | 11.85% |
| 曝光加权平均排名 | **4.74** | 6.27 |

**西语头部已经赢下来了**（`test de alma de undertale` 第 1 名、CTR 47%）。所以这份计划**不是「加更多西语大词」，而是「把已经赢下的西语模式，补到还没承接的西语意图上」**。

剩余机会池（西语，排名 ≥ 7）：**33 个词 / 2,331 曝光 / 仅 109 点击 / CTR 4.68%**。
如果这批词从第 7–12 位提到第 3–5 位（按 18% CTR 估），约 **+310 点击/月**。

---

## 1. 结构性发现（这是整份计划的地基）

```
/es/souls/       → HTTP 404
/souls/          → HTTP 404
/pt/souls/       → HTTP 404
/es/compare/     → HTTP 404
```

**你有 7 个灵魂详情页，但没有「7 个灵魂的汇总页」。**

后果：一批「清单意图」的搜索词找不到对应页面，只能落在主页上，而主页讲的是「测一测」，**意图不匹配** → 排名 7.7–12.3，CTR ≈ 0。

| 搜索词（西语） | 曝光 | 点击 | CTR | 当前落点排名 |
|---|---:|---:|---:|---:|
| las 7 almas de undertale | 46 | 0 | 0% | 10.3 |
| las almas de undertale | 29 | 0 | 0% | 8.3 |
| almas humanas undertale | 17 | 0 | 0% | 8.4 |
| almas deltarune | 15 | 0 | 0% | 9.5 |
| test 7 souls undertale | 13 | 2 | 15% | 7.7 |
| almas en undertale | 6 | 0 | 0% | 12.3 |
| **合计** | **126** | **2** | **1.6%** | — |

而这只是西语。英文 `/souls/` 同样是 404。

---

## 2. 动作清单（按性价比排序）

### 动作 1 ｜新建 `/es/souls/` 汇总页 ★ 最高优先

**为什么先做这个**
- 这是**唯一的「有明确搜索意图 + 完全没有承接页」**的缺口
- 现有 /es/ 主页排名 7–12、CTR ≈ 0，说明 Google 已经在找答案，但给你的位置是「勉强相关」
- 建一个意图完全匹配的页面，是提升排名最直接的手段
- 零风险：不新增网址依赖，纯新增静态页

**改哪里**
- 新建：`src/pages/es/souls/index.astro`
- 复用：`src/i18n/es.ts`（新增该页文案键）、`src/data/souls.ts`（7 灵魂基础数据）
- 参考现有：`src/pages/es/souls/[trait].astro` 的布局写法

**目标词（按曝光排序）**
`las 7 almas de undertale` · `las almas de undertale` · `almas humanas undertale` · `almas deltarune` · `almas en undertale` · `test 7 souls undertale`

**页面内容要求**
1. **H1**：`Las 7 Almas de Undertale: Colores y Significados`
2. **首屏直接答案段**（50–70 词）：一句话说清 7 个灵魂是什么、每个颜色对应什么特质
3. **7 行清单表格**：`颜色 | 特质（西语） | 特质（英文） | 代表含义 | 链接到详情页`
   - Roja → Determinación / Determination
   - Naranja → Valentía / Bravery
   - Amarilla → Justicia / Justice
   - Verde → Amabilidad / Kindness
   - Cian → Paciencia / Patience
   - Azul → Integridad / Integrity
   - Morada → Perseverancia / Perseverance
4. **H2：¿Cuál es el Alma más fuerte?**（承接「哪个最强」类长尾）
5. **H2：Las 7 Almas y el Jugador（Almas humanas vs Almas de Jefes）**（承接 `almas humanas undertale`）
6. **H2：Descubre tu Alma**（内链回 `/es/#test`）
7. Title / Description 必须含 `Las 7 Almas de Undertale`，Description 140–160 字符
8. Canonical 指向 `https://soulvirtues.org/es/souls/`
9. 加进 `sitemap.xml`（`@astrojs/sitemap` 自动处理静态页）
10. 从 `/es/` 主页和 7 个详情页加内链指向它（锚文本用 `las 7 almas de Undertale`）

**预期**：这批词从第 7–12 位进前 5 → **+100~150 点击/月**

**其他语种同理**（同一模板，换文案）：`/souls/`（英）、`/pt/souls/`、`/ja/souls/`、`/ru/souls/` 全部是 404。建议先做西语，验证效果后再复制。

---

### 动作 2 ｜把 7 个 `/es/souls/[trait]/` 从第 8–9 位推到前 5 ★ 次高优先

**现状数据（每页都在吃词，但点击 ≈ 0）**

| 页面 | 主力词 | 曝光 | 点击 | CTR | 排名 |
|---|---|---:|---:|---:|---:|
| `/es/souls/kindness/` | alma verde undertale / amabilidad undertale | 695 | 3 | 0.4% | 8.3 |
| `/es/souls/perseverance/` | alma morada undertale / perseverancia undertale | 564 | 1 | 0.2% | 8.2 |
| `/es/souls/patience/` | paciencia undertale / alma cian undertale | 353 | 1 | 0.3% | 8.2 |
| `/es/souls/justice/` | justicia undertale | 341 | 5 | 1.5% | 8.2 |
| `/es/souls/integrity/` | alma azul undertale / integridad undertale | 280 | 2 | 0.7% | 8.5 |
| `/es/souls/bravery/` | alma naranja undertale / valentia undertale | 256 | 0 | 0% | 7.9 |
| `/es/souls/determination/` | alma roja undertale | 219 | 3 | 1.4% | 8.3 |
| **合计** | | **2,708** | **15** | **0.55%** | — |

**已排除的问题**（这些你做得对，不用改）：
- ✅ canonical 正确指向带斜杠版本
- ✅ 站内链接全部使用带斜杠形式（没有 308 跳转损耗）
- ✅ Title 已含关键词（如 `Alma Verde Amabilidad Undertale - Lore, Objetos y Significado`）
- ✅ 正文已自然覆盖关键词（kindness 页 `alma verde`×9、`amabilidad`×13）

**真实瓶颈（线上实测）**：以 `/es/souls/kindness/` 为例
- 正文仅 **662 词**
- **H1 只有 `AMABILIDAD`** —— 没有包含 `alma verde`
- H2 全是「历史/装备/游戏机制」角度，**没有任何一个「significado / 代表什么」角度**

**SERP 现实（GoAnyAPI 实测，mx/es）**
`alma verde undertale` 与 `alma morada undertale` 的第 1 名都是 **undertale.fandom.com（西语 Wikia）**，其后是 Reddit、Pinterest、TikTok、Instagram、YouTube。
**没有专用工具站竞争者，没有精确匹配域名。**

**突破口 = 意图缺口**
Fandom 讲的是**对战机制**（绿色 = 盾牌模式，紫色 = 陷阱模式）。
但用户搜 `alma verde undertale` 想要的是**「绿色灵魂代表什么性格 / 我是不是这种人」**。
→ 你的页面应该主打「含义 / 性格」，而不是再写一遍游戏机制。

**改哪里**
- `src/data/soulDetailsLocalizedContent.ts`（西语正文内容）
- `src/pages/es/souls/[trait].astro`（H1/H2 结构）
- `src/i18n/es.ts`（Title/Description 文案键）

**每页统一改 5 处**
1. **H1 加入颜色词**：`AMABILIDAD` → `Alma Verde de Undertale: Amabilidad`
2. **首屏加「直接答案」段**（60–80 词）：第一句话就回答「绿色灵魂代表什么」
3. **新增 H2**：`¿Qué significa el Alma Verde en Undertale?`
4. **正文从 662 词扩到 1,200 词左右**（补：性格特征、适合的人、现实中怎么体现、和其他灵魂的区别）
5. **Description 重写**，140–160 字符，把 `significado` 放进前半句

**7 页对应表**

| 页面 | 颜色词（放进 H1） | 特质词 | 主攻查询 |
|---|---|---|---|
| determination | Alma Roja | Determinación | alma roja undertale |
| bravery | Alma Naranja | Valentía | alma naranja undertale |
| justice | Alma Amarilla | Justicia | justicia undertale · alma amarilla undertale |
| kindness | Alma Verde | Amabilidad | alma verde undertale · amabilidad undertale |
| patience | Alma Cian | Paciencia | paciencia undertale · alma cian undertale |
| integrity | Alma Azul | Integridad | alma azul undertale · integridad undertale |
| perseverance | Alma Morada | Perseverancia | alma morada undertale · perseverancia undertale |

**⚠️ 一个必须警惕的坑**
这些 SERP 有很重的 **video / image / Pinterest / TikTok 轮播块**，会把自然结果挤到屏幕下方。
这意味着**即使排名到第 5，CTR 也可能偏低**。
→ 对策：Title 和 Description 必须写得「不点可惜」（明确给出答案钩子），不能只写 Lore。

**预期**：+150~250 点击/月（比动作 1 高，但不确定性也更高，所以排在动作 1 之后）

---

### 动作 3 ｜`/es/` 主页补 `almas` 复数簇

**现状**
| 搜索词 | 曝光 | 点击 | CTR | 排名 |
|---|---:|---:|---:|---:|
| almas de undertale | 420 | 4 | **1.0%** | 7.1 |
| almas undertale | 220 | 0 | **0%** | 7.6 |
| | **640** | 4 | **0.6%** | — |

`$seo` 的 quick-wins 报告也把这两个词标为「CTR 未达基准」（目标 2.0%–2.5%）。

**为什么低了**：主页 Title 用的是 `Test de Almas Undertale Gratis`，打到了 `test de alma`（单数、测一测），但 `almas`（复数）背后是**「有哪些灵魂」的清单意图**，主页正文没有承接这块。

**改哪里**：`src/i18n/es.ts` + `src/pages/es/index.astro`

**怎么改**
- 在主页 virtues 区块前后，新增一个 H2 区块：`Las 7 Almas de Undertale: Colores y Significados`
- 内容 60–100 词 + 7 色小表（颜色 / 特质 / 一句话含义）
- 表内每行链到对应 `/es/souls/[trait]/`
- 区块末尾链到新建的 `/es/souls/`

**注意**：不要和动作 1 的 `/es/souls/` 页内容完全重复 —— 主页上写**精简版（表格 + 一句话）**，`/es/souls/` 写**完整版（每色一段）**。否则会自己和自己抢排名。

**预期**：+40~70 点击/月

---

### 动作 4 ｜`/es/compare/` —— 建议**不投入** ❌

| 指标 | 数值 |
|---|---|
| 页面数 | 6 组对比页 |
| 合计曝光 | ~330 |
| 合计点击 | 2 |
| 排名 | 4.5 – 14.7 |

**判断：投入产出比最差的一组页面。**
只在动作 1 和动作 3 里给它们加内链即可，不要单独做内容、不要改 TDH。

---

## 3. 执行顺序与验收

| 阶段 | 做什么 | 谁做 | 验收标准 |
|---|---|---|---|
| 1 | 动作 1：新建 `/es/souls/` 汇总页 | AI 改代码 + 你审文案 | 页面 200、canonical 正确、进 sitemap、从主页可点达 |
| 2 | 动作 3：主页加 `Las 7 Almas` 区块 | AI 改代码 | 区块内链全部可达、不与新页面重复 |
| 3 | 动作 2：7 个详情页改造（先做 kindness 一页做样板） | AI 改代码 + 你审文案 | H1 含颜色词、正文 ≥1,200 词、有 significado 段落 |
| 4 | 动作 2 其余 6 页（复用样板） | AI 批量改 | 7 页结构统一 |
| 5 | 提交索引（IndexNow / GSC） | AI 跑脚本 | 新页面被收录 |
| 6 | **30 天后复测** | AI 用同一套方法 | 见下方指标 |

**复测指标（30 天后）**

| 指标 | 基线（Day 1–30） | 目标 |
|---|---:|---:|
| 西语词簇曝光加权平均排名 | 4.74 | ≤ 4.2 |
| 西语「排名 ≥7」词池 CTR | 4.68% | ≥ 10% |
| `/es/souls/*` 合计点击 | 15 | ≥ 150 |
| `/es/souls/` 汇总页点击 | 不存在 | ≥ 80 |
| `almas de undertale` CTR | 1.0% | ≥ 8% |
| 西语点击总量 | 11,059 | ≥ 11,400 |

---

## 4. 诚实说明：西语的上限在哪

**西语剩余机会的总量是有限的。**

- 西语词簇可归因曝光总共 22,438；其中排名 ≥7 的只有 2,331（10.4%）
- 三个动作合计的**现实上限约 +290~470 点击/月**，对应当前月总量的 **+1.8%~2.9%**
- 好消息：成本极低（纯站内改动，不新增依赖），且竞争格局清晰（无精确匹配域名对手）

**如果要更大的增量，第二战场是英文通用意图词**（不在本计划内，此处仅记录）：

| 搜索词 | 曝光 | 点击 | CTR | 排名 |
|---|---:|---:|---:|---:|
| undertale soul test | 1,777 | 67 | 3.8% | 8.8 |
| undertale soul quiz | 1,036 | 47 | 4.5% | 10.0 |
| soul trait extractor | 731 | 42 | 5.7% | 6.7 |
| undertale soul extractor | 529 | 82 | 15.5% | 5.6 |
| **合计** | **4,073** | **238** | **5.8%** | — |

这批词如果你能推到第 3–5 位，理论上限 **+400~580 点击/月**（比西语更大）。
**但代价更高**：实测 SERP 前排有 `soulvirtuesextractor.com`（精确匹配域名）+ wikihow + quotev + proprofs + uquiz，都是高权重站。**需要另做一轮可行性评估，不要和西语计划混在一起做。**

---

## 5. 需要你决策的事

1. **批准西语三个动作**（动作 1 → 动作 3 → 动作 2），我按顺序执行
2. 或者**先只做动作 1**（新建汇总页，最干净、风险最低）看 30 天效果再继续
3. 英文通用意图词那批（4,073 曝光）**要不要另开一轮评估**

**你回一句「按顺序做」或「先做动作 1」，我就开工。**
（前提：需要解除本会话的「严格只读」约束，因为这三个动作都要改站点代码）

---

## 6. 执行记录

### 动作 1 ｜ `/souls/` 汇总页 —— ✅ 已完成（2026-09-20，本地验证通过，**尚未部署**）

**执行中的一个范围变更（必须说明）**
原计划「只做西语，验证后再复制到其他语种」。实施时发现 `src/layouts/Layout.astro` 第 34–47 行会**从 URL 路径自动推导并输出 5 语种 hreflang**。若只建 `/es/souls/`，该页会输出 4 条指向 404 的 hreflang（`/souls/`、`/ja/souls/`、`/pt/souls/`、`/ru/souls/`），属于自伤性 SEO 缺陷。**因此改为 5 语种一次性建齐。**

**新增文件（10 个）**

| 文件 | 作用 |
|---|---|
| `src/data/soulsHub.ts` | 五语种页面级文案（TDH、导语、小节正文、FAQ、证据边界说明、导航锚文本） |
| `src/components/SoulsHubPage.astro` | 汇总页共享组件（表格 + 特质卡片 + FAQ + JSON-LD） |
| `src/pages/souls/index.astro` | 英文 `/souls/` |
| `src/pages/es/souls/index.astro` | 西语 `/es/souls/` |
| `src/pages/pt/souls/index.astro` | 葡语 `/pt/souls/` |
| `src/pages/ja/souls/index.astro` | 日语 `/ja/souls/` |
| `src/pages/ru/souls/index.astro` | 俄语 `/ru/souls/` |

**修改文件（12 个）**

| 文件 | 改动 |
|---|---|
| `src/components/SoulDetailPage.astro` | 面包屑「Rasgos de Alma」由 `/#virtues` 改为指向 `/souls/`（语义更正确，同时给汇总页带来 35 条内链）；底部「探索其他」区新增汇总页入口按钮 |
| `src/pages/{,es/,pt/,ja/,ru/}index.astro` | 五语言主页灵魂卡片区下方各新增 1 个汇总页入口 |
| `public/sitemap.xml` | 新增 5 个 `<url>` 条目（含完整 hreflang 交替），74 → **79** 条 |
| `public/llms.txt` | 「Seven Undertale Soul Trait Guides」区块首行新增汇总页条目 |
| `scripts/audit_site_seo.mjs` | 硬编码的 `expectedIndexablePageCount` 74 → **79** |
| `README.md`、`src/README.md`、`src/components/README.md`、`src/data/README.md` | 按项目规范同步目录清单、路由与页数（74 → 79） |

**验证结果**

| 验证项 | 结果 |
|---|---|
| 构建 | ✅ 80 页（原 75 + 5），无错误 |
| 项目 SEO 审计 `scripts/audit_site_seo.mjs` | ✅ **79 页 0 错误**（Meta/Canonical/Hreflang、H1–H6、内链与路由、Schema、图片 alt 全过） |
| sitemap | ✅ 79 条，`<url>` 开闭配对，`xmllint` 解析通过，0 重复 |
| hreflang | ✅ 5 语种全部指向已存在页面，无 404 |
| 结构化数据 | ✅ 每页 BreadcrumbList + CollectionPage + ItemList + FAQPage |
| 内链 | ✅ 每页 35 条指向 7 个详情页；前缀正确（`/es/souls/*` 而非 `/souls/*`） |
| Title 长度 | ✅ en 50 / es 55 / pt 53 / ja 47 / ru 40 字符 |
| Description 长度 | ✅ en 148 / es 149 / pt 151 / ja 78（全角，等效合理）/ ru 144 字符 |
| 正文字数 | ✅ en 1,167 词 / es 1,283 词 / pt 1,213 词 / ru 1,013 词 / ja 3,417 字符 |
| 移动端 375px / 430px | ✅ 全部页面零横向溢出；七色表格置于 `overflow-x-auto` 容器内（表格 560px / 容器 343–398px）内部滚动，不撑破页面 |

**截图**：`screenshots/p1-hub-mobile-2026-09-20/`（被 Git 忽略）

**⚠️ 尚未完成**：**未 commit、未 push、未部署**。新页面目前只存在于本地构建产物，线上仍是 404。需你明确授权后才会提交与部署。

### 动作 3 ｜ 主页「7 个灵魂」区块 —— ✅ 已完成（2026-09-20，实施方式经证据修正）

**执行中的方案修正（重要）**

原计划是「在主页新增一个 `Las 7 Almas` 区块」。实施前核查发现：**主页本来就已有两个 7 灵魂区块** ——
- Section 3「`t.traits.title`」+ `SoulCard` 卡片网格（7 张卡，已带内链）
- Section 4「`¿Cuál es tu color de alma en Undertale?`」+ `t.colors.items`（7 色列表）

**再新增第三个 7 灵魂列表会造成同一页面重复三遍同样的 7 个灵魂**，属自我堆砌。因此改为精准修：

1. **把 Section 3 的 H2 与副标题改成清单意图措辞**（各语种均纳入目标短语）
   - ES：`¿Cuáles son los 7 Rasgos de Alma de Undertale?` → **`Las 7 Almas de Undertale y los Rasgos que Representan`**
   - EN / PT / JA / RU 同步改造（`The 7 Undertale Souls...` / `As 7 Almas de Undertale...` / `Undertale の7つの魂と...` / `7 душ Undertale и...`）
2. **给 Section 4 的 7 个颜色项补内链**（原本是纯 `<div>`，零链接）
   - 主页 → 新增 7 条指向 `/souls/[trait]/` 的内链
   - 顺手消除重复：把 `CODE_TO_SLUG` 映射从 `SoulCard.astro` 抽到 `src/data/souls.ts` 的 `SOUL_SLUGS_BY_CODE`，两处共用
3. 保留动作 1 已加的 `/souls/` 汇总页入口按钮

**验收**

| 项 | 结果 |
|---|---|
| 5 个语种 H2 均含目标清单短语 | ✅ |
| 5 个语种颜色清单 7 项均成为详情页内链 | ✅ 7/7 |
| 5 个语种主页均有汇总页入口 | ✅ |
| 主页 Title 未被改动（不干扰既有排名） | ✅ 实测 5 个 Title 与改动前一致 |

---

### 动作 2 ｜ 7 个详情页 significado 区块 —— ✅ 已完成（2026-09-20，含一条主动放弃项）

**做了什么（7 页 × 5 语种 = 35 页）**

1. **H1 加入颜色词**（这是原计划第 1 条）
   - 改前：`AMABILIDAD`
   - 改后：`Alma Verde de Undertale: AMABILIDAD`（颜色短语 + 灵魂本色高亮 + 原有大写灵魂名，沿用首页 hero 的「主文案 + 高亮 span」写法）
   - 其他语种：`The Green Undertale SOUL: KINDNESS` / `Alma Verde de Undertale: BONDADE` / `Undertale の緑のタマシイ: やさしさ` / `Зелёная душа Undertale: ДОБРОТА`
2. **首屏之后插入「代表什么」直接答案区块**（原计划第 2、3 条合并）
   - 位置：hero 之下、游戏机制/装备之上 —— **成为页面第一个 H2**
   - 每页一段 60–75 词的直接答案，正面回答「这个灵魂代表什么」
   - 区块边框使用该灵魂的主题色
   - 数据落在新文件 `src/data/soulMeaning.ts`（35 段文案 + 5 个 H1/标题模板），文案从既有已审核的 `personalityAnalysis` 与 `SOULS[code].description` 改写，未引入新的游戏设定主张
3. **新建 `src/data/soulMeaning.ts`**，未改动 `soulDetailsI18n.ts`（942 行已审核内容）与 `SoulDetailLabels` 类型，保持最小改动面

**❌ 主动放弃的一项（原计划第 4 条）**

原计划要求「正文从 662 词扩到 1,200 词左右」。**判断为不值得做，未执行。** 理由：

1. **字数是结果，不是手段。** Google 的排名依据是主题覆盖度与质量，不是长度。为凑字数而写字会稀释页面、拉低质量。
2. **页面内容其实已经完整。** 原计划想补的四块 —— 性格特征、现实中怎么体现、和其他灵魂的区别 —— 现有内容已覆盖：`personalityAnalysis.strengths/weaknesses`（性格特征）、`personalityAnalysis.realWorldTraits`（现实表现）、`comparisonLinks`（与其他灵魂的区别）。
3. **真正的缺口是意图匹配，不是篇幅。** 数据（排名 7.9–9.4、CTR≈0）指向的是「页面讲机制、用户要含义」的错位，已由 H1 + significado 区块解决。
4. 多语种批量灌水还会放大事实错误与翻译质量风险。

**验收**

| 项 | 结果 |
|---|---|
| 35 页 H1 含颜色词 | ✅ 抽样 kindness × 5 语种 5/5 |
| 35 页首个 H2 即「代表什么」直接答案 | ✅ 35/35 |
| 区块位于游戏机制小节之前 | ✅ |
| 正文规模（西语） | 662 → **735 词**（+73 词，来自直接答案段；未做字数灌水） |
| 西语正文字符数 | 4,616 |
| 日语正文字符数 | 2,330 |
| 俄语正文字符数 | 4,264 |

---

## 7. 统一上线记录（2026-09-20）

### 7.1 上线前全量验证：61 项通过，0 项失败

| 验证组 | 覆盖项 | 结果 |
|---|---|---|
| 动作 1 汇总页 | 5 语种 × 8 项（页面存在、canonical、hreflang 五语种齐全无 404、结构化数据、7 条详情页内链、前缀正确） | ✅ 40/40 |
| 动作 3 主页 | 5 语种 × 4 项（H2 含目标短语、7 项颜色内链、汇总页入口、Title 未变） | ✅ 20/20 |
| 动作 2 详情页 | H1 含颜色词 5/5；35 页首个 H2 即直接答案 | ✅ |
| 动作 4 | 对比页未被改动且仍可访问 | ✅ |
| sitemap / robots / llms | 5 个新条目、无重复、79 条、robots Allow、llms 收录 | ✅ |
| 构建产物内链完整性 | 35 个详情页全部站内链接指向真实文件 | ✅ 0 断链 |

项目自带 `scripts/audit_site_seo.mjs`：**79 页 0 错误**。
移动端 375px / 430px：**0 横向溢出**。

### 7.2 提交与部署

| 步骤 | 内容 | 结果 |
|---|---|---|
| commit 1 | `docs(seo): 归档第30天 GSC 月度复盘、P0 品牌词结案、P1 西语计划与 /souls/ 404 调查报告` | `d79e668` |
| commit 2 | `feat(seo): 新增五语种灵魂汇总页，并为详情页补充「代表什么」直接答案区块`（30 files changed, +977 / −67） | `4dda2a0` |
| push | `fca671a..4dda2a0 main -> main` | ✅ |
| 部署 | Cloudflare Pages 自动构建，约 20 秒后生效 | ✅ |

### 7.3 线上核验（部署后实测）

| 项 | 结果 |
|---|---|
| `/souls/` `/es/souls/` `/pt/souls/` `/ja/souls/` `/ru/souls/` | **全部 HTTP 200** |
| 线上 `/souls/` Title / Canonical / H1 | `The 7 Undertale Souls: Colors, Traits and Meanings` / 正确 / 一致 |
| 线上 `/souls/` hreflang | en, ja, es, pt, ru, x-default 六条齐全 |
| 线上 `/souls/` 结构化数据 | BreadcrumbList + CollectionPage + ItemList + FAQPage |
| 线上 `/es/souls/kindness/` | H1 = `Alma Verde de Undertale: AMABILIDAD`；首 H2 = `✦ ¿Qué significa el Alma Verde en Undertale?` |
| 线上 `/souls/kindness/` | H1 = `The Green Undertale SOUL: KINDNESS`；首 H2 = `✦ What Does the Green Soul Mean in Undertale?` |
| 线上 sitemap | 79 条 |
| 线上西语主页 | 已含 `Las 7 Almas de Undertale` 短语 |

### 7.4 索引提交

`node scripts/submit_indexnow.mjs` → 提交 79 条 URL：

| 端点 | 结果 |
|---|---|
| `yandex.com` | ✅ **202 Accepted** |
| `api.indexnow.org` | ❌ 403 `UserForbiddedToAccessSite` |
| `www.bing.com` | ❌ 403 `UserForbiddedToAccessSite` |

**根因（新发现，属既有问题，非本次改动引入）**

排查确认：
- IndexNow 密钥文件 `https://soulvirtues.org/e74f83b2d1c94a5ea6e0b7f8c9d1a2e3.txt` 在线、HTTP 200、内容与脚本密钥一致 ✅
- 站点已有 Yandex 验证（`meta yandex-verification`）、Naver 验证文件 ✅
- **但没有 Bing 的所有权验证文件**：`https://soulvirtues.org/BingSiteAuth.xml` → **404**

Bing 的 IndexNow 端点要求站点已在 Bing 站长后台完成所有权验证，否则返回 `UserForbiddedToAccessSite`。

**待你处理（需要你的 Bing 账号，我无法代做）**：在 Bing Webmaster Tools 添加并验证 `soulvirtues.org`，之后 IndexNow 对 Bing 即可正常提交。在此之前，Bing 侧的收录仍依赖常规抓取与 sitemap。

**影响评估**：不阻塞本次上线。Google 走 sitemap + 常规抓取，不受影响；Yandex 已接受。仅 Bing 的即时提交缺失。

### 7.5 遗留（本次未做，非计划内）

| 项 | 说明 |
|---|---|
| `SoulCard.astro` 里「Explore {name} Lore & Items →」是硬编码英文 | 在 es/pt/ja/ru 主页上会显示英文链接文案。既有 i18n 缺口，需在 5 个 i18n 文件加标签键。本次为控制改动面未处理 |
| 动作 2 未做字数扩张 | 已在 6 节说明理由（字数是结果不是手段，页面内容已覆盖原计划想补的四块） |
| 部署后效果复测 | 计划 6.3 节定义的 30 天验收指标，建议 2026-10-19 由 Day60 自动化任务一并复核 |



