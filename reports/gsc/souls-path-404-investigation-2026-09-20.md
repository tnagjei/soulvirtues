# `/souls/` 404 成因调查：是不是当初故意设置的？

- 站点：`sc-domain:soulvirtues.org`（仓库 `/Users/tangjei/Documents/建站/工具站/Soul Virtues Extractor`）
- 调查时间：2026-09-20
- 触发：用户反馈「`/souls/` 仍返回 404」，并记得「之前是故意设成 404 的，但有原因忘了」
- 方法：全量 git 历史 + 分支/stash + 配置文件 + robots.txt + GSC 定稿数据精确比对 + 线上 curl 实测

---

## 结论（先给答案）

分两层，别混：

| 问题 | 答案 |
|---|---|
| **线上现在为什么 404？** | **因为动作 1 的改动还没部署。** 本地 `dist/souls/index.html` 已于 11:11 构建完成，线上仍是旧版。这是「没发布」，不是「被拦截」 |
| **`/souls/` 当初是被故意设成 404 的吗？** | **不是。查无此事。** 它是「从来没有创建过这个页面」的结构性结果，不是任何一次显式决策 |

**你的记忆最可能对应的是提交 `0ebd8f5`（2026-08-28）——但它的方向正好相反：那是「新增一个规范 404 页来修复软 404 索引问题」，不是「把 `/souls/` 设成 404」。**

---

## 一、线上 404 的直接原因

```
线上  https://soulvirtues.org/souls/     → HTTP 404
线上  https://soulvirtues.org/es/souls/  → HTTP 404
线上  https://soulvirtues.org/es/souls/kindness/ → HTTP 200（正常）

本地  dist/souls/index.html       已存在（2026-09-20 11:11 构建，59 KB）
本地  dist/es/souls/index.html    已存在（2026-09-20 11:11 构建，60 KB）
```

线上 `/souls/` 返回的 404 内容实测为：

```html
<title>Page Not Found - Soul Virtues Extractor</title>
<meta name="robots" content="noindex,follow">
ERROR 404 / PAGE NOT FOUND / "This route does not contain a Soul Virtues test or guide."
```

**这正是 `0ebd8f5` 新增的那个自定义 404 页。** 说明线上跑的是旧版构建，新页面还没上线。

→ **解决办法就是部署。** 不涉及任何历史配置冲突。

---

## 二、`/souls/` 的 404 是怎么来的（证据链）

### 证据 1｜git 全历史从未有过该文件（已用完整 pathspec 复核）

```bash
# 完整 pathspec，含 souls/index.astro 本身（补上了先前通配符的缺口）
git log --all --full-history --oneline -- "*souls/index*" "*souls/index.astro"
# → 零结果

# 全历史中 src/pages 下曾「新增」过的所有文件，按关键词筛选
git log --all --pretty=format: --name-only --diff-filter=A -- "src/pages" | grep -i "souls/" | sort -u
# → src/pages/souls/[trait].astro
#   src/pages/es/souls/[trait].astro
#   src/pages/ja/souls/[trait].astro
#   src/pages/pt/souls/[trait].astro
#   src/pages/ru/souls/[trait].astro
#   （只有动态路由，没有任何 index）

git log --all --pretty=format: --name-only --diff-filter=A -- "src/pages" | grep "index.astro" | sort -u
# → 只有 5 个语种首页：/、/ja/、/es/、/pt/、/ru/
#   （全历史从未创建过任何 souls 汇总页）
```

**全站历史上存在过的 `index.astro` 路由，只有 5 个语言首页。`/souls/` 汇总页从未被创建过，也从未被删除过。**

> 说明：先前用 `--diff-filter=D -- "src/pages/**/souls/**"` 得到的零结果**不足以单独作证**，因为该通配符匹配不到 `src/pages/souls/index.astro` 本身（`index.astro` 不在 `souls/` 下一层）。已改用上面的完整 pathspec 复核，缺口已闭合。

### 证据 2｜无重定向/头文件配置

```
public/_redirects   → 不存在
public/_headers     → 不存在
dist/_redirects     → 不存在
dist/_headers       → 不存在
```

### 证据 3｜astro.config.mjs 无相关配置

`grep -n "trailingSlash|build|format|404|redirect" astro.config.mjs` → 零匹配。配置里只有 `site` / `server` / `i18n` / `vite`，没有任何针对 `/souls/` 的路由或 404 处理。

### 证据 4｜robots.txt **明确允许**（反证）

`public/robots.txt` 第 28 行：

```
# Public routes
Allow: /about/
Allow: /contact/
Allow: /privacy/
Allow: /terms/
Allow: /souls/      ← 明确 Allow，不是 Disallow
Allow: /compare/
```

**如果设计意图是屏蔽 `/souls/`，这里应该写 `Disallow: /souls/`。** 实际写的是 `Allow`。这条规则本身也暗示「当初认为 `/souls/` 是公开路径」，与它 404 的现状自相矛盾。

### 证据 5｜无 stash、无其他相关分支

`git stash list` 空。另一分支 `chore/soulvirtues-seo-launchd` 的差异全部是 SEO LaunchAgent、隐私政策、i18n 等无关内容，不含 `/souls/` 索引页决策。

### 证据 6｜改动前(HEAD) 没有任何内链指向裸 `/souls/`

```bash
git grep -n -E '"/souls/"|/souls/`|href="/souls/"' HEAD -- src/ public/
# → 零结果
```

说明：**改动前并不存在指向 `/souls/` 的内部断链。** 这从侧面印证——站点从来没把 `/souls/` 当成一个应该存在的页面，所以也就没人去链它。

### 证据 7｜GSC 30 天定稿数据里，5 个汇总页 URL **从未出现过**

```
https://soulvirtues.org/souls/        ✗ 从未出现过
https://soulvirtues.org/es/souls/     ✗ 从未出现过
https://soulvirtues.org/pt/souls/     ✗ 从未出现过
https://soulvirtues.org/ja/souls/     ✗ 从未出现过
https://soulvirtues.org/ru/souls/     ✗ 从未出现过
（以 souls/ 结尾但不含 trait 的 URL：零条）
```

**Google 从未把 `/souls/` 当作有效页面返回过。** 若曾经是「故意 404」且被 Google 抓取过，通常会留下抓取/覆盖记录痕迹；这里干净得说明它连候选页都没进入过。

---

## 三、你记忆里的那次「404 决策」—— 找到对应提交了

```
0ebd8f5  2026-08-28 21:36  修复多语言站点地图与软404索引问题
```

这是全仓唯一一个同时涉及「404」和「索引」的提交。但它的方向与你的记忆**相反**：

### 它实际做了什么

| 改动 | 内容 |
|---|---|
| **新增** `src/pages/404.astro` | 一个真实的 404 页：`noindex,follow` + 返回首页按钮 + 开始测试按钮，深色像素风 |
| 改 `scripts/audit_site_seo.mjs` | 把 `dist/404.html` **排除**在可索引页计数之外；新增 `expectedIndexablePageCount = 74`；新增 404 页必须 `noindex,follow` 且必须链回首页的断言；新增 sitemap 与构建路由的奇偶校验（缺失/多余/重复） |
| 改 `public/sitemap.xml` | 从单行压缩格式改为缩进格式，并把 **ru 语种**补进所有 hreflang 交替 |
| 改 `Footer.astro` / `about` / `contact` / `privacy` / `terms` | 邮箱加 `<!--email_off-->`，防止 Cloudflare 邮箱改写破坏；徽章图片补 `alt="" aria-hidden="true"` |
| 改 `astro.config.mjs` | i18n locales 由 4 语种补为 5 语种（加 `ru`） |

### 「软 404」在这里指什么

**软 404（soft 404）= 服务器返回 200 但页面没有有效内容**，Google 会把它当成 404 处理，浪费抓取预算并污染索引。这个提交的修复方式是：**给全站配一个规范的、`noindex,follow` 的真实 404 页**，让不存在路径返回明确的 404 语义。

`src/pages/README` 里对它的描述也印证了这一点：

> `404.astro：Cloudflare Pages 使用的真实 404 页面，禁止索引并提供首页与测验返回入口`

**所以这个提交是「补一个 404 页」，不是「把某个路径设成 404」。**

### 另一个可能被你记成「故意不做」的地方

```
5411ba8  2026-08-20  feat: 上线七大灵魂特质中日英西葡多语言深度详情页与全站内链枢纽
```

这个提交只新增了 `src/pages/souls/[trait].astro`（以及 ja/es/pt 版本），**没有 index.astro**。它把所谓「全站内链枢纽」放在了：

- 主页的 `#virtues` 区块（`SoulCard` 七张卡片）
- `Footer.astro` 的本地化灵魂导航
- `Quiz.astro` 结果页的「七灵魂图鉴」

**也就是：用「主页锚点区块」充当枢纽，而不是建一个独立的 `/souls/` 汇总页。**

当时这样做的合理性是——**避免再产生一个与主页 `#virtues` 区块内容高度重叠的页面，从而避免内部竞争**。这是个说得通的选择。

而 `/souls/` 的 404，就是这个架构选择的**副产品**：Astro 静态路由下，一个目录只有 `[trait].astro` 动态路由而没有 `index.astro`，请求该目录本身自然 404。

---

## 四、当前配置是否仍然合理？

### 4.1 与 `0ebd8f5` 的修复**不冲突** —— 这点先明确

- `/souls/` 现在返回的是**真 404 + noindex**，属于**正确**的 404 行为，**不会**触发软 404 问题
- 本次新增的 `/souls/` 是**有真实内容的页面**，正常索引，也不会破坏 404 修复
- 两者互不干扰。新增汇总页**不需要**回滚或修改 `0ebd8f5` 的任何逻辑

### 4.2 但「不建汇总页」这个决定**已经不合理了**

当初的判断（避免薄内容、避免与主页抢排名）在 8 月上线期成立。**现在 GSC 数据已经把它证伪了：**

| 搜索词 | 曝光 | 点击 | CTR | 当前落点排名 |
|---|---:|---:|---:|---:|
| las 7 almas de undertale | 46 | 0 | **0%** | 10.3 |
| las almas de undertale | 29 | 0 | **0%** | 8.3 |
| almas humanas undertale | 17 | 0 | **0%** | 8.4 |
| almas deltarune | 15 | 0 | **0%** | 9.5 |
| almas en undertale | 6 | 0 | **0%** | 12.3 |

**这批「清单/枚举意图」的搜索有真实需求，但站内没有意图匹配的承接页**，只能全部落到主页。而主页讲的是「测一测」（测试意图），与「7 个灵魂分别是什么」（清单意图）不是一回事 —— 结果就是排名 7.7–12.3、点击几乎为零。

**另外两处自相矛盾，也支持建这个页面：**

1. `robots.txt` 已经写 `Allow: /souls/`，等于当初就假定这个路径是公开的
2. `Layout.astro` 会自动为**每个**路由输出 5 语种 hreflang —— 站点架构本身就假定所有路由都成体系存在

### 4.3 判断

**「不建 `/souls/` 汇总页」当初是合理选择，现在不再是。** 建它不违反任何历史决策，也不与 404 修复冲突。动作 1 可以继续。

唯一需要保留的原始顾虑是**内容重叠**。已在动作 1 中处理：主页写「精简版（表格 + 一句话）」，`/souls/` 写「完整版（每个灵魂一段）」，并在动作 3 里明确要求主页区块不得与汇总页重复。

---

## 五、待办

1. **部署即可解决线上 404** —— 需用户授权 `commit + push`（Cloudflare Pages 自动构建）
2. 部署后跑 `scripts/submit_indexnow.mjs`（自动扫描 `dist/` 提交全量路由，已自动包含 5 个新页面）
3. 同步修正：`scripts/README.md` 第 19 行的「74 个可索引页面」→ 79（本次调查中发现并已修复）

## 六、证据清单（可复现）

```bash
cd "/Users/tangjei/Documents/建站/工具站/Soul Virtues Extractor"

# 1. 历史上从未新增/删除过 souls/index
git log --all --diff-filter=A -- src/pages/souls/index.astro src/pages/es/souls/index.astro
git log --all --diff-filter=D --name-only --pretty=format:"%h %s" -- "src/pages/**/souls/**"

# 2. 唯一的 404+索引提交
git log --all --oneline --grep="404" --grep="redirect" --grep="索引" -i -E
git show 0ebd8f5 --stat
git show 0ebd8f5 -- src/pages/404.astro scripts/audit_site_seo.mjs

# 3. robots.txt 明确 Allow
grep -n "souls" public/robots.txt          # → Allow: /souls/

# 4. 改动前无内链指向裸 /souls/
git grep -n -E '"/souls/"|/souls/`' HEAD -- src/ public/

# 5. 线上与本地状态
curl -s -o /dev/null -w "%{http_code}\n" https://soulvirtues.org/souls/   # → 404
curl -s https://soulvirtues.org/souls/ | grep -o "<title>[^<]*</title>"   # → Page Not Found
ls -la dist/souls/index.html dist/es/souls/index.html                     # → 本地已存在
```

## 七、不确定性标注

| 结论 | 置信度 | 说明 |
|---|---|---|
| 线上 404 = 未部署 | **高** | 本地 dist 有文件、线上无、且返回旧版 404 页 |
| `/souls/` 全历史从未存在过 index 文件 | **高** | `--all --full-history -- "*souls/index*"` 零结果；全历史 `index.astro` 仅 5 个语言首页。先前 `--diff-filter=D` 通配符的缺口已用完整 pathspec 闭合 |
| 你记的「故意 404」= `0ebd8f5` | **中** | 这是全仓唯一涉及 404+索引的提交，但内容是「新增 404 页」而非「屏蔽路径」。**若你想起的是别的事（例如 GSC 里做过的网址移除、或 Cloudflare 面板规则、或别的站点），需要另行排查——本地证据无法覆盖这些外部操作** |
| 「不建汇总页」当初是避免内容重叠 | **中** | 由 5411ba8 的内链枢纽设计反推，无显式文档记录该决策理由。属推断 |
