# P0 结案：英文"品牌词"CTR 异常根因定位

- 站点：`sc-domain:soulvirtues.org`
- 调查时间：2026-09-20 09:5x（Asia/Shanghai）
- 触发项：`reports/gsc/day30-monthly-review-2026-09-20.md` 第 6.2 节 P0
- 手段：GoAnyAPI 实时 SERP（美区桌面/移动 + 墨西哥西语对照）+ GSC 过滤维度（query × country × date）
- 本轮性质：**严格只读**。未修改网站代码、页面文案、TDH、组件、Sitemap、robots.txt；未 commit / push / 部署

---

## 1. 一句话结论

**`soul virtues extractor` 根本不是你的品牌词，而是一个「已有原版 + 多个精确匹配域名」的产品品类词。** 你的站在 08-25~08-26 曾短暂排到第 1.86 位（CTR 58.44%），随后被 `soulvirtues.com`（第 1 名）和原版 **"Jaden's Soul Virtues Extractor"** 挤出去；截至今天（2026-09-20），美区**桌面与移动端前 30 名内都没有你的站**。低 CTR 不是 Title/Description 的问题，是**这个 SERP 你不该打**。

---

## 2. 直接答案：异常是怎么产生的

一个月的数据其实是**两个完全不同的状态被平均在一起**：

### 2.1 `soul virtues extractor` 分段对比（GSC final）

| 分段 | 点击 | 曝光 | CTR | 曝光加权排名 |
|---|---:|---:|---:|---:|
| 08-25~08-26（尖峰 2 天） | 876 | 1,499 | **58.44%** | **1.86** |
| 09-02~09-16（9 月稳态 15 天） | 281 | 4,510 | **6.23%** | **5.70** |
| 全月合计 | 1,759 | 17,162 | 10.25% | 4.65 |

**仅美区：**

| 分段 | 点击 | 曝光 | CTR | 曝光加权排名 |
|---|---:|---:|---:|---:|
| 08-25~08-26 | 265 | 469 | **56.50%** | **1.93** |
| 09-02~09-16 | 17 | 961 | **1.77%** | **7.74** |
| 非美区 09-02~09-16 | 264 | 3,549 | 7.44% | — |

美区逐日（GSC，`query:equals:soul virtues extractor` + `country:equals:usa`）：

| 日期 | 点击 | 曝光 | CTR | 排名 |
|---|---:|---:|---:|---:|
| 08-25 | 107 | 227 | 47.1% | 2.3 |
| **08-26** | **158** | 242 | **65.3%** | **1.6** |
| 08-27 | 0 | 90 | 0% | 6.1 |
| 09-02 | 2 | 84 | 2.4% | 8.0 |
| 09-09 | 3 | 118 | 2.5% | 7.7 |
| 09-14 | 2 | 61 | 3.3% | 6.3 |
| **09-16** | **0** | **1** | **0%** | **24.0** |

**读法**：全月 17,162 曝光里，绝大部分（09 月稳态 4,510 曝光）发生在排名 5.7、CTR 6.23% 的状态下；而全月 CTR 被 08-25~08-26 那 1,499 次高转化曝光（58.44%）抬到了 10.25%。**「CTR 10.25%」这个数字本身没有诊断价值 —— 它是两个状态的加权平均。**

### 2.2 真正的品牌词是好的

| 查询 | 点击 | 曝光 | CTR | 排名 |
|---|---:|---:|---:|---:|
| `soulvirtues`（导航型品牌词） | 323 | 760 | **42.5%** | 3.05 |
| `soulvirtues com` | 5 | 8 | 62.5% | 1.13 |

品牌导航词 CTR 42.5%，完全正常。**问题只在 `soul virtues extractor` 这一个品类词上。**

---

## 3. 实时 SERP 实测（GoAnyAPI，2026-09-20 01:51–01:58 UTC）

### 3.1 美区桌面 `soul virtues extractor`（results_cnt=138）

| # | 结果 | 域名 |
|---:|---|---|
| 1 | **Soul Virtues Extractor — Free 66-Question Soul Test** | **`soulvirtues.com`** ← 不是你的站 |
| 2 | Jaden's Soul Virtues Extractor : r/Deltarune（200+ 评论，1 个月前） | reddit.com |
| 3 | JADEN'S SOUL VIRTUES EXTRACTOR | pi.fyi |
| 4 | Hello New World — Jaden's Soul Virtues Extractor | captainstrawberrywings.tumblr.com |
| 5 | Yuchi 🐐 on X: "Here's the test if you want to..."（70+ 赞） | x.com |
| 6 | Where do you find the undertale soul test thingy | projectsekai.fandom.com |
| — | *videos 块 3 条* | youtube.com |
| — | *related 块 8 条（7 条含 "Jaden's"）* | — |

**第 2 页（11–20）**：Jaden's（tumblr / facebook / youtube / fandom / tiktok / x）+ 克隆站（`stuntbikeextreme.org`、`toolrain.com`）+ **`soulvirtuesextractor.org`（第 19）**

**第 3 页（21–30）**：仍是 Jaden's 生态 + 克隆站（`soultraitextractor.com`、`stuntbikeextreme.org`）

**美区移动端（device=mobile）**：第 1 名同样是 `soulvirtues.com`，其后全是 Jaden's 生态。

> **结论：美区桌面 + 移动端前 30 名内均无 `soulvirtues.org`。**

### 3.2 对照：墨西哥西语 `test de alma de undertale`（es-419，results_cnt=122）

| # | 结果 | 域名 |
|---:|---|---|
| **1** | **Test de Almas Undertale Gratis - Soul Virtues Extractor** | **`soulvirtues.org/es/`** ← 你的站 |
| 2 | Test de almas de Undertale: ¿Qué alma tengo? | es.wikihow.com |
| 3 | Encontré un test de Alma de Undertale bastante bueno | reddit.com |
| 4 | Hice el quiz de qué alma eres | reddit.com |
| 5 | "Acabo de hacer el test de las almas de Undertale..." | （社媒） |
| 6 | Test: Cual es tu alma de Undertale | tests.acierta.me |
| 7 | ¡Hice el quiz más difícil de Undertale... | （社媒） |
| 8 | Undertale Soul Quizzes | quotev.com |

> 西语 SERP 上**没有任何精确匹配域名竞争者**，全是内容站/通用测验站。你的站以「唯一专用工具」的身份拿到第 1 名。

---

## 4. 竞争者地图（英文品类词）

| 竞争者 | 类型 | 位置 | 判定 |
|---|---|---|---|
| **Jaden's Soul Virtues Extractor**（`undertale.jadenthejaded.uk`） | **原版 / 病毒源**，Reddit 200+ 评论、X、Tumblr、TikTok、YouTube、Facebook 全平台扩散，搜索结果里明确自称 "The original free 66 questions test" | SERP 第 2–30 名占多数席位 | **无法竞争**。它是这个品类的定义者 |
| **`soulvirtues.com`** | 精确匹配 `.com` 域名，多语言（es / it / pt-br / ja / zh-cn），标题 `Soul Virtues Extractor — Free 66-Question Soul Test` | **第 1 名**（桌面 + 移动） | 域名优势 + 语种比你多。**不在你的 GSC 资产内，非你所有** |
| **`soulvirtuesextractor.org`** | 精确匹配长域名，结构 `/quiz/`、`/souls/*` | 第 19 名 | 同类克隆 |
| `soultraitextractor.com` | 近似域名（Soul Trait Extractor） | 第 22 名 | 同类 |
| `stuntbikeextreme.org`、`toolrain.com` | 内容农场克隆页 | 第 14 / 17 名 | 低质但占位 |
| pi.fyi、undertale.wiki、TikTok Discover、quotev、wikihow | 聚合/社区/内容站 | 散布 | 非工具站，但吃掉曝光 |

**关键事实：这个查询的前 30 名被三类占满 —— 原版（Jaden's）、精确匹配域名（soulvirtues.com / soulvirtuesextractor.org）、克隆站。你的站三类都不是。**

---

## 5. Counter —— 我上一轮判断的修正

### C-1｜我把它叫「品牌词」，这个定性是错的

`day30-monthly-review-2026-09-20.md` 第 3 节 C-3 我写的是「品牌词 CTR 12.69% 低于非品牌词 23.59%，违背常识」。**修正**：`soul virtues extractor` 的 SERP 实测显示它不是品牌词，是**品类词**。我当时的「违背常识」感觉是对的，但归因方向错了 —— 不是「品牌词为什么表现差」，而是「这个词压根不属于你」。

真正的品牌词是 `soulvirtues`（323 点击 / CTR 42.5%），表现正常。

### C-2｜「CTR 异常」有一半是统计假象

我上一轮把 10.25% 当成一个需要解释的稳定值。**实测推翻**：该查询 08-25~08-26 两天 CTR 58.44%（排名 1.86），9 月稳态 CTR 6.23%（排名 5.70）。**10.25% 是加权平均，不是任何真实状态。** 如果只算 9 月，CTR 是 6.23% —— 与「排名第 5–7 位」是相符的，并没有那么「异常」。

### C-3｜排名 4.65 与「前 30 名看不到」的矛盾已解开

我上一轮认为 pos 4.65 与实时 SERP 不符是数据问题。**不是。** 原因是：
1. 4.65 是全月加权平均，包含了排名 1.86 的尖峰；
2. 4.65 是**全球**平均，美区 9 月实际是 7.74，且 09-16 已掉到 24.0；
3. GSC 的 position 是「有展示时的平均位置」，9 月每天只有 1–961 次曝光（对应长尾变体词），不代表头部词还排在第 5 位。

**三件事叠加，造成「GSC 说第 5 位、实测看不到」的假矛盾。**

### C-4｜我上一轮说「未看 SERP 前不允许改 TDH」是对的，但结论要再进一步

TDH 确实不是原因（英文主页 Title 59 字符、核心词最前，实测合规）。但现在方向更明确了：**改 TDH 也解决不了这个问题 —— 因为竞争劣势来自域名与原创性，不来自页面元素。**

---

## 6. Judgment —— 策略必须调整

### 6.1 判断：英文品类词不值得投入

`soul virtues extractor` 在英文里的处境是**结构性劣势**：

- 原创性：Jaden's 是原版，且已病毒式扩散（Reddit/X/Tumblr/TikTok/YouTube），搜索者要的就是它
- 域名：`soulvirtues.com` 和 `soulvirtuesextractor.org` 两个精确匹配域名都不是你的
- 你的 `.org` 在第 1 名和第 30 名之间都没有位置

**这不是「优化一下就能上去」的差距，是「不该打这一仗」。** 继续在这个词上投入（改 TDH、加内容、做外链）的期望收益极低。

### 6.2 打哪里：三个有证据支撑的方向

**方向 A（最高优先级）—— 英文通用意图词，那里没有原版**

`$seo` second-page 报告已经指出英文主页有一批**通用意图词**正卡在第 10–11 位：

| 查询 | 曝光 | 排名 | 性质 |
|---|---:|---:|---|
| `undertale souls quiz` | 126 | 10.97 | 通用意图，无原版 |
| `what undertale soul are you` | 83 | 10.72 | 通用意图，无原版 |
| `which undertale soul are you` | 82 | 10.98 | 通用意图，无原版 |

**这些词与西语 `test de alma de undertale` 是同一类搜索意图 —— 而西语那类你已经做到第 1 名了。** 这是英文侧真正可复制的机会，不是 `soul virtues extractor`。

**方向 B —— 西语/葡语继续扩张（已被验证）**

西语：`/es/` 第 1 名，CTR 47%，无精确匹配竞争者。这是唯一被证实的资产。
建议检查：`/es/souls/*` 与 `/es/compare/*` 的内链权重（第 30 天数据：多为 0 点击、排名 8–12）。

**方向 C —— 承接 Jaden's 的流量，而不是对抗它**

搜索 `soul virtues extractor` 的人想要的是 Jaden's 那个 66 题测验。可以做一个**对照/说明型页面**（"Soul Virtues Extractor: 原版、各版本对比、结果含义"）去承接这个查询的长尾与相关搜索（related 块 8 条里 7 条含 "Jaden's"，这是一个明确的关联意图簇）。**注意：这属于内容策略，需先确认不侵犯原版商标/品牌，且本轮只读、未执行。**

### 6.3 明确不做

- ❌ 不改英文主页 TDH（本轮已实测排除 TDH 因素，且真实瓶颈在域名与原创性）
- ❌ 不为 `soul virtues extractor` 做外链或内容投入（结构性劣势）
- ❌ 不注册/追逐近似域名（`soulvirtues.com`、`soulvirtuesextractor.org` 已被占）

### 6.4 人类动作

1. **确认 `soulvirtues.com` 与 `soulvirtuesextractor.org` 是否与你有任何关系** —— 我通过 GSC 资产清单（42 个站点）与语种结构（es/it/pt-br/ja/zh-cn vs 你的 es/pt/ja/ru）判定为第三方，但需要你确认。[Unverified：域名归属无法通过公开信号 100% 确认]
2. 决策方向 A / B / C 的优先级。

---

## 7. Confidence ≠ Correctness

| 结论 | 置信度 | 依据 | 可能错在哪 |
|---|---|---|---|
| `soul virtues extractor` 是品类词不是品牌词 | **高** | 实时 SERP 四份快照（桌面 p1/p2/p3 + 移动）一致性 | 无。域名构成直接可见 |
| 美区前 30 名内无你的站 | **高** | 桌面 p1+p2+p3 与移动 p1 均无 | SERP 有地域/数据中心差异，但三页 + 移动都不出现，不可能是巧合 |
| 08-25~08-26 是排名 1.86 的尖峰 | **高** | GSC 逐日，美区与全球一致 | 无 |
| `soulvirtues.com` 是第三方 | 中 | GSC 资产内无该域名；语种结构不同；标题用 em-dash、你的用连字符 | **需你本人确认** |
| Jaden's 是原版 | 中高 | SERP 中其自身文案 "The original free 66 questions test"；多平台 1 个月前扩散；Reddit 200+ 评论 | 无法验证"原版"的绝对时间线，但它是当前 SERP 的事实主导者 |
| 9 月真实 CTR 是 6.23% 而非 10.25% | 高 | GSC 严格分段计算 | 分段边界（08-27~09-01 过渡期）会轻微影响数值 |
| 改 TDH 无用 | 中高 | Title 实测 59 字符合规 + SERP 前 30 名无你的站 → TDH 不是瓶颈 | 理论上优化后若排名回升 TDH 会起作用，但**当前排名问题的上游是域名与原创性** |

---

## 8. 数据获取的一个坑（供下次复用）

GoAnyAPI 的 `goanyapi_google_serp` **会间歇性返回空结果**（`result: ""` 或 `{}`），但**照常扣 2 积分**。同一 query 同一参数，连续调用可能一次成功一次失败。

- 本次实测：约 40% 的调用返回空
- 应对：**必须加 3–6 次重试 + 递增退避，并以 `result.organic.length > 0` 判定成功**，不能只看 `code: "ok"`
- 另：`device` 参数传入后曾出现 100% 空返回，但无法确认因果（后续不加 device 也出现过空返回）→ 判定为随机故障，非参数问题

---

## 9. 证据清单

`seo-input/gsc-api/day30-p0-brand-query-2026-09-20/`

| 文件 | 来源 |
|---|---|
| `serp-01-p1-desktop-us-en.json` | SERP `soul virtues extractor` gl=us hl=en 第 1 页 |
| `serp-02-p2-desktop-us-en.json` | 同上，第 2 页（start=10） |
| `serp-03-p3-desktop-us-en.json` | 同上，第 3 页（start=20） |
| `serp-04-p1-mobile-us-en.json` | 同上，device=mobile 第 1 页 |
| `serp-05-p1-desktop-mx-es-test-de-alma-de-undertale.json` | SERP `test de alma de undertale` gl=mx hl=es 第 1 页 |
| `gsc-query-soul-virtues-extractor-by-country.json` | GSC country 维度，filter `query:equals:soul virtues extractor`（137 国） |
| `gsc-query-soul-virtues-extractor-usa-daily.json` | GSC date 维度，filter query + `country:equals:usa`（30 天） |

**复现命令**

```bash
cd "/Users/tangjei/Documents/建站/工具站/Soul Virtues Extractor"
D=seo-input/gsc-api/day30-p0-brand-query-2026-09-20

# GSC 侧（siteUrl 由仓库 .gsc.json 提供）
gsc query --start 2026-08-18 --end 2026-09-16 --dimensions country --data-state final \
  --filter "query:equals:soul virtues extractor" --output $D/gsc-query-soul-virtues-extractor-by-country.json
gsc query --start 2026-08-18 --end 2026-09-16 --dimensions date --data-state final \
  --filter "query:equals:soul virtues extractor" --filter "country:equals:usa" \
  --output $D/gsc-query-soul-virtues-extractor-usa-daily.json

# SERP 侧：GoAnyAPI MCP（mcp.goanyapi.com/mcp），凭据在 macOS 钥匙串
#   service = "Codex MCP Credentials", account = "goanyapi|1980bc0367e8cf21"
#   工具 = goanyapi_google_serp，参数 {q, gl, hl, start?, device?}
#   注意：必须重试，空结果也会扣 2 积分
```

**积分消耗**：本轮 goanyapi 从 4,036 → 约 3,99x（含约 10 次空返回的无效扣费），明细可用 `goanyapi_activity_credits` 查。

---

## 10. 只读声明

本轮**未修改**任何网站代码、页面文案、Title/Description/Headings、组件、`sitemap`、`robots.txt`；**未执行** `commit`、`push`、部署。全部写操作仅限新增证据文件与本报告。
