// input: Bing Webmaster Tools「网站地图中缺少重要页面」报错截图 + 线上实测数据
// output: 该报错的成因排查报告，含我方全部验证证据、真实问题修正与待办动作
// pos: reports/gsc/bing-sitemap-warning-investigation-2026-09-20.md（更新规则：非代码文件，无同步要求）

> 背景：2026-09-20 用户在 Bing Webmaster Tools 的 Recommendations 中看到一条高严重性告警，指向 `https://soulvirtues.org/pt/souls/justice/`。本报告为排查结论。

# Bing「网站地图中缺少重要页面」报错排查

- 排查日期：2026-09-20
- 站点：`sc-domain:soulvirtues.org`
- Bing 报错内容：严重性「高」／出现错误的页面 1／错误总数 1／URL = `https://soulvirtues.org/pt/souls/justice/`
- 结论：**Bing 侧误报（stale state）。本站对该 URL 与 sitemap 的处理全部正确，无需为此修复任何东西。**
  → **已由 Bing 后台实测确认：URL 检查显示该 URL「已成功编制索引」。** 见第 0 节。
- 附带发现：**sitemap 的 `lastmod` 有 40 条与实际内容改动不符** —— 这是真实问题，已修正。

---

## 0. 结论更新｜Bing 后台实测证据（2026-09-20 16:45 补充）

用户在 Bing Webmaster Tools 后台提供了两份实测证据，**本案已可结案**。

### 0.1 URL 检查 → **Bing 自己确认该 URL 已索引**

`URL 检查` → `https://soulvirtues.org/pt/souls/justice/` → 必应索引：

> ✅ **已成功编制索引**　该 URL 可以在必应上显示

**这是决定性证据。** 一条告警说「这个页面不在你的 sitemap 里」，而 Bing 自己对同一个 URL 的回答是「已成功编制索引」。**两者互斥，告警不成立。**

### 0.2 网站地图页 → Bing 的数据比我们晚一个周期

| Bing 显示 | 值 | 解读 |
|---|---|---|
| 已知的网站地图 | 1 | 只认 `https://soulvirtues.org/sitemap.xml`，与本地一致 |
| 存在错误的网站地图 | **0** | sitemap 无错误 |
| 存在警告的网站地图 | **0** | sitemap 无警告 |
| **已发现的总 URL 数** | **74** | **旧数量**。9-20 部署后应为 79 |
| 上次提交时间 | **2026/8/20 已过时** | 一个月前提交过，Bing 标记为「已过时」 |
| **上次爬网时间** | **2026/9/19** | **在我们 9-20 部署之前** |
| 状态 | 成功 | — |

**三个数字（74 / 9/19 / 已过时）互相印证同一件事：Bing 的 sitemap 数据是 9-19 的，还没看到 9-20 的部署。** 而 74 正是 8-28 ~ 9-20 之间 sitemap 的条目数 —— 完全对得上，说明 **Bing 的抓取本身是正常的**。

> 关键推论：告警由 Bing 某个**更早的扫描周期**生成，此后未刷新。它不等同于「Bing 现在认为缺失」。

### 0.3 那条「缺少图像的 Alt 属性」通知 —— 也是误报

同一次 URL 检查显示 `1 找到 SEO/GEO 问题 → 通知：缺少图像的 Alt 属性，找到 2 个实例`。逐项核对结果：

| 检查 | /pt/souls/justice/ 实测 |
|---|---|
| `<img>` 标签总数 | **14** |
| **真正缺 `alt` 属性的** | **0** |
| `alt=""`（空值） | 7 |
| 有实际 alt 文本 | 7 |
| 线上与本地是否一致 | **完全一致**（均为 14 / 0 / 7 / 7） |
| 是否有 `<picture>` / JS 动态插图 | **无**（`<picture>` 0 个，可能动态插图的 script 0 个） |

那 7 个 `alt=""` 的来源已定位：**页脚好友徽章是一条无缝滚动跑马灯**，结构为

```html
<div class="friend-marquee__track">
  <div class="friend-marquee__group">…7 个徽章，带 alt…</div>
  <div class="friend-marquee__group" aria-hidden="true">…7 个徽章，alt="" + tabindex="-1"…</div>
</div>
```

第二组是为无缝循环而复制出来的**装饰性副本**，已标 `aria-hidden="true"` 与 `tabindex="-1"`，其图片用 `alt=""` —— **这符合 WCAG 对装饰性图片的写法，是正确实现，不是缺陷。**

逐位置核对确认：**7 个空 alt 图片全部落在 `aria-hidden="true"` 的那一组内，无一例外。**

→ Bing 的检查器不区分「装饰性空 alt」与「缺失 alt」。**不需要改。**

### 0.4 顺带核查：内联 SVG 的无障碍标记

URL 检查页另有「找到 1 个标记类型」。核查中发现 11 个内联 `<svg>` 里有 **10 个既无 `aria-hidden` 也无 `aria-label`**。逐个看上下文后判定**不是无障碍缺陷**：

| SVG | 位置 | 判定 |
|---|---|---|
| 页头 logo | `<a href="/pt/">` 内 | 装饰性，链接自身有文字 |
| 汉堡菜单图标 | `<button aria-label="Toggle navigation menu">` 内 | **按钮已带 aria-label** |
| Hero 巨型像素心 | 装饰性插画 | 语义由周围文字承载 |
| 7 色灵魂图标 | 每个在带文字的 `<a>` 内 | 装饰性 |
| 页脚 logo | `<a href="/pt/">` 内 | 装饰性 |

无 `role="img"` 且无 `<title>` 的内联 SVG 不会被读屏器当作有意义图形播报，且各自都在已有可访问名称的控件内。**属于可选的卫生改进，不属于缺陷，本次未改动。**

---

## 1. Counter｜先假设「Bing 是对的」，逐条验证，全部被证伪

排查原则：不先假定是误报，而是先假设 Bing 说得对，再找我方的反证。

| # | 假设（若成立则 Bing 正确） | 实测结果 | 判定 |
|---|---|---|---|
| 1 | 该页面不存在或返回错误 | `dist/pt/souls/justice/index.html` 存在（49,100 B）；线上 **HTTP 200** | ✗ 证伪 |
| 2 | 该 URL 不在 sitemap 中 | `public/sitemap.xml` **第 581 行**有 `<loc>https://soulvirtues.org/pt/souls/justice/</loc>` | ✗ 证伪 |
| 3 | 该 URL 是最近才加进 sitemap 的，Bing 还没读到 | 该条 **自 2026-08-20（提交 `1da1eb6`）起持续存在**，历经 `ac59ea9`／`7f495f0`／`0ebd8f5`／`4dda2a0` 五个版本从未缺席 | ✗ 证伪 |
| 4 | sitemap 本身格式错误，Bing 解析中断 | 严格 XML 解析通过；**79 个 `<url>`／79 个唯一 `<loc>`**；0 个控制字符；**纯 ASCII**（无 BOM）；线上与本地 **字节完全一致（61,212 B）** | ✗ 证伪 |
| 5 | 存在第二份 sitemap 把 Bing 带偏 | 历史上从未出现过第二个 sitemap 文件名（`git log --all --name-only` 仅 `public/sitemap.xml`）；`astro.config.mjs` 历代版本 **0 次**出现 sitemap 插件；`/sitemap-0.xml`、`/sitemap-index.xml` 线上均 404 | ✗ 证伪 |
| 6 | robots.txt 屏蔽了该路径或 Bingbot | `public/robots.txt` 第 28 行写的是 **`Allow: /souls/`**；全站无 `Disallow` 命中该路径 | ✗ 证伪 |
| 7 | Bingbot 被 Cloudflare 拦截 | 以 `bingbot/2.0` UA 实测：页面 **200**（49,067 B）、sitemap **200**（61,212 B，`application/xml`），响应中无 challenge 字样 | ✗ 证伪 |
| 8 | 页面有 noindex / canonical 指向别处 | 该页**无 `robots` meta**；`<link rel="canonical">` 自指 `https://soulvirtues.org/pt/souls/justice/`；`og:url` 一致；**6 条 hreflang**（en/ja/es/pt/ru/x-default）全部指向真实存在的页面 | ✗ 证伪 |
| 9 | 存在重复主机名／大小写变体导致 Bing 看到另一个 URL | 无尾斜杠 → **308** 永久重定向到带斜杠；`www.` → **301** 到裸域；`http://` → **301** 到 https；`/PT/`、`/pt/Souls/Justice/` → 404（符合预期）。**不存在被索引的第二个主机名或大小写变体** | ✗ 证伪 |
| 10 | 页面被 Cloudflare 缓存了旧的错误响应 | 密钥类静态文件 `cf-cache-status: DYNAMIC`；该 HTML 页同样 `cf-cache-status: DYNAMIC`（不走边缘缓存，每次回源） | ✗ 证伪 |

**交叉对照（证明问题只在 Bing 一侧）：** Google Search Console 第 30 天定稿数据中，`/pt/souls/justice/` 有真实表现 —— **2 点击 / 110 曝光 / 平均排名 8.2**。同一页面 Google 侧正常。

---

## 2. 成因判断

我方不存在任何可修复的缺陷，因此成因只能落在 Bing 侧。按可能性排序：

| 可能性 | 说明 | 置信度 |
|---|---|---|
| Bing 的 sitemap 副本为过期/部分解析状态 | Bing 官方说明其 recommendations 基于「**我们上次扫描时**」的结果；Bing 的 sitemap 处理是异步的，且官方文档承认其 sitemap 索引覆盖报告存在滞后 | **中高** |
| Bing 的 sitemap 副本在该 URL 附近发生部分解析 | 症状高度特异性（79 条中只报 1 条），与全量缺失不符 | 中 |
| Bing 首次扫描（用户近日才在 Bing WMT 完成站点验证）与部署时点交错 | 用户于本日才具备 Bing WMT 访问权限，告警可能由验证前的初次扫描生成 | 中 |

**明确标注：以上三条均为 [Inference]，我无法访问 Bing 侧状态来验证。** 可确认的只有一件事：**我方的页面与 sitemap 在当前时点全部合规。**

---

## 3. 附带发现的真实问题（已修正）

排查过程中发现一处**确实存在**的错误，与 Bing 的告警不同源：

**问题：sitemap 的 `lastmod` 与实际内容改动不一致。**

2026-09-20 的改动（提交 `4dda2a0`）修改了 **40 个页面**：
- 35 个灵魂详情页（H1 加入颜色词 + 新增「代表什么」直接答案区块）
- 5 个语言主页（H2 措辞调整 + 颜色清单接上内链 + 汇总页入口）

但这 40 条在 sitemap 中的 `lastmod` 仍停留在 `2026-08-20`（俄语版为 `2026-08-26`）—— **这些页面在 9 月 20 日确实被修改过，日期记录是错的。**

这在此刻尤其要紧：**Bing 的 IndexNow 通道当前不可用（见第 4 节），sitemap 的 `lastmod` 是我们唯一能向 Bing 传递「这些页面变了，请重新抓取」的信号。**

**修正内容**（`public/sitemap.xml`，40 增 40 删）：

```
lastmod 分布
  修正前： 2026-08-20 × 60  |  2026-08-26 × 14  |  2026-09-20 × 5
  修正后： 2026-08-20 × 28  |  2026-08-26 × 6   |  2026-09-20 × 45
```

仅改动「今天确实被修改过」的 40 条；其余 39 条（30 组对比页 + 4 个工具页 + 5 个新建汇总页）保持原值不变。

**验证**：XML 严格解析通过、`<url>` 仍为 79 且唯一、`npm run build` 通过（80 页）、`scripts/audit_site_seo.mjs` **79 页 0 错误**、`dist/sitemap.xml` 与 `public/sitemap.xml` 一致。

---

## 4. IndexNow 到 Bing 仍然 403（续查）

第 30 天复盘时发现 `node scripts/submit_indexnow.mjs` 对 Bing 返回 403。本轮在用户完成 Bing 站点验证后复测，**仍然 403**：

```
api.indexnow.org  → 403 {"errorCode":"UserForbiddedToAccessSite",
                         "message":"User is unauthorized to access the site. Please verify the site using the key and try again"}
www.bing.com      → 403 同上
yandex.com        → 200 OK ✅
```

**我方已排除的可能原因（逐项实测）：**

| 检查 | 结果 |
|---|---|
| 密钥文件是否存在 | `/e74f83b2d1c94a5ea6e0b7f8c9d1a2e3.txt` → **HTTP 200**，33 B |
| 文件名与内容是否一致 | 完全一致 |
| 密钥格式是否合法 | 32 位小写十六进制，符合 IndexNow 8–128 字符要求 |
| 是否带 BOM / 异常字符 | 无 BOM；内容为 `key + \n` |
| content-type 是否正确 | `text/plain; charset=utf-8` ✅ |
| 是否被 CDN 缓存了旧错误 | `cf-cache-status: DYNAMIC`（未缓存）；边缘与回源内容字节一致 |
| 是否被 Cloudflare 拦 UA | 用 curl / 空 UA / python-requests / IndexNow / bingbot / YandexBot / Chrome 共 7 种 UA 实测，**全部 200** |
| 最小载荷复测 | 只提交 1 条 URL，仍 403 → **不是我方载荷的问题** |
| 尾随换行是不是元凶 | **不是**。Yandex 用**同一份文件**验证通过（200），证明该文件可被正常验证 |

**结论：密钥文件在我方可验证的范围内 100% 正确，问题在 Microsoft 侧。** 最可能是 Microsoft 的 IndexNow 验证抓取未能成功到达我方（例如被 Cloudflare 的机器人防护在非 bingbot 身份下挑战），但**这一点我无法从我方验证 [Unverified]**。

**注意：这不是本次改动引入的。** Day60 自动化任务跑 IndexNow 时不要误判为新问题。

---

## 5. 待办动作

**顺序很重要：先部署，再去 Bing 后台重新提交。** 否则 Bing 拉到的是旧版 sitemap（74 条 + 失真 lastmod）。

### 5.0 我方先做（需用户授权）

- 部署已就绪的 `public/sitemap.xml` lastmod 修正（当前仅在工作区，未 commit / 未 push / 未部署）。
- 部署后 Bing 会看到：**79 条 URL** + **45 条 lastmod = 2026-09-20**。

### 5.1 然后用户在 Bing Webmaster Tools 操作

| # | 位置 | 操作 | 目的 |
|---|---|---|---|
| 1 | **网站地图**（右上角蓝色按钮「**提交网站地图**」） | 点击重新提交 | 把「上次提交时间」从 2026/8/20 刷新，强制 Bing 重下，从而发现 79 条 |
| 2 | **URL 检查** | `https://soulvirtues.org/pt/souls/justice/` → 已于 9-20 实测为「已成功编制索引」，**无需再操作**；若想催，可点右上「请求编制索引」 | 已确认无问题 |
| 3 | **IndexNow** | 打开查看密钥验证状态；若显示未验证，按页面指引重新生成/绑定密钥（Bing 托管密钥优先） | 修复即时提交通道 |
| 4 | **Recommendations** | 等 **1–2 周**再看 | Bing 按扫描周期刷新，**不会立刻消失**，别急着以为没用 |

> 若 2 周后同一条告警仍在，而 URL 检查仍显示「已成功编制索引」，即可判定为 Bing 侧数据异常，走 Bing Webmaster 支持渠道提工单（Webmaster Support → Raise support request）。

### 5.2 长期维护约定

`public/sitemap.xml` 是**手工维护**的（项目无 sitemap 自动生成插件）。因此：

> **每次修改页面内容后，必须同步把对应 URL 的 `<lastmod>` 改为修改当日日期。**

本次即因漏做这一步导致 40 条日期失真。后续由 agent 执行的改动应把这一步纳入固定流程。

---

## 6. Confidence ≠ Correctness

| 结论 | 置信度 | 依据 |
|---|---|---|
| 该页面与 sitemap 条目当前完全合规 | **高** | 10 项独立实测，含 HTTP、XML 解析、字节比对、UA 模拟、重定向链 |
| **Bing 认为该 URL 已索引，告警不成立** | **很高** | **Bing 后台 URL 检查原文：「已成功编制索引 / 该 URL 可以在必应上显示」（2026-09-20 实测）** |
| **Bing 的 sitemap 数据晚一个周期（9-19，74 条）** | **很高** | **Bing 后台直接显示「上次爬网时间 2026/9/19」「已发现的总 URL 数 74」，与 8-28~9-20 的 sitemap 版本完全吻合** |
| 「缺少图像 Alt 属性」为误报 | **高** | 14 个 img 中真正缺 alt 的为 0；7 个空 alt 全部位于 `aria-hidden="true"` 的跑马灯副本组内 |
| 该 URL 自 2026-08-20 起持续在 sitemap 中 | **高** | git 全历史逐版本核对 |
| 不存在第二份 sitemap / 重复主机名 / 大小写变体 | **高** | 全历史文件名检索 + 6 种 URL 变体实测 |
| Google 侧该页面正常 | **高** | GSC 定稿数据：2 点击 / 110 曝光 / 排名 8.2 |
| Bing 告警的具体触发机制（哪个扫描周期、为何未刷新） | **低** | 无法访问 Bing 内部状态；但已不影响处置结论 |
| IndexNow 403 的根因在 Microsoft 侧 | **中高** | 最小载荷仍 403，且 Yandex 用同一密钥文件验证通过 |
| IndexNow 403 的具体原因（疑似 CF 机器人防护） | **极低** | 无法从我方验证 [Unverified] |

**已实测确认的事实**与**推断**在本文中已分别标注，引用时请勿混用。
