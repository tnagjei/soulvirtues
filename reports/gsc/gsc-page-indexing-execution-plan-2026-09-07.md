<!-- input: 2026-09-07 GSC 网页索引编制报告、网址检查结果、线上响应与当前仓库 -->
<!-- output: 可供独立 AI 审阅并按条件执行的 GSC 索引处理计划 -->
<!-- pos: reports/gsc 的专项执行文档（更新规则：证据、网址队列或执行状态变化时同步本注释与所属目录 README） -->

# Soul Virtues GSC 网页索引编制执行计划

## 1. 结论

**截至 2026 年 9 月 7 日，不应修改网站代码。**

GSC（Google Search Console，谷歌搜索控制台）“所有已知网页”显示 53 个网址未编入索引，但真正属于当前站点地图、且仍待索引的只有 3 个：

1. `https://soulvirtues.org/ru/souls/bravery/`
2. `https://soulvirtues.org/ru/souls/kindness/`
3. `https://soulvirtues.org/ru/compare/bravery-vs-patience/`

当前站点地图共有 74 个网址，71 个已编入索引，3 个未编入索引。当前站点地图索引覆盖率是：

```text
71 ÷ 74 = 95.95%
```

这 3 个网址都满足当前可验证的技术准入条件：线上返回 200、允许抓取、允许编入索引、声明自身为规范网址、存在于成功读取的站点地图中。Google（谷歌）的实际网址测试也均返回“网址可以编入索引”。

**当前动作不是改代码，而是仅对这 3 个网址各提交一次索引请求，然后按明确日期观察。**

## 2. 五项锁定

| 项目 | 已锁定内容 |
|---|---|
| 目标 | 找出真正需要处理的未索引网址，并给出可验证、可回滚、不会误伤现有索引的执行计划 |
| cwd（当前工作目录） | `/Users/tangjei/Documents/建站/工具站/Soul Virtues Extractor` |
| 真实 Git（版本管理）仓库根 | `/Users/tangjei/Documents/建站/工具站/Soul Virtues Extractor` |
| 当前边界 | 只读检查 GSC、线上网页与仓库；只新增本执行文档并更新所属目录 README（说明文件），不修改网站源代码，不点击“请求编入索引”，不点击“验证修复” |
| 验收门槛 | 区分所有已知网址和已提交网址；列出完整异常队列；为每类网址给出动作、触发条件、验证证据、停止条件与回滚办法 |

## 3. Counter（最强反方意见）

🚨 **Counter（反方结论）：把“53 个未编入索引”理解成“网站有 53 个有效网页坏了”，这个前提是错误的。**

可验证的拆分如下：

| GSC 原因 | 所有已知网页 | 当前站点地图内 | 结论 |
|---|---:|---:|---|
| 网页会自动重定向 | 39 | 0 | 38 个缺少末尾斜杠的网址和 1 个 HTTP（未加密协议）网址；当前均为单跳永久重定向 |
| 未找到 404 | 9 | 0 | 历史错误链接或随机探测网址，不是当前应索引网页 |
| 已发现，尚未编入索引 | 2 | 2 | 两个俄语灵魂详情页，需要提交一次索引请求并观察 |
| 已抓取，尚未编入索引 | 2 | 1 | 一个俄语比较页需要观察；另一个是随机网址 |
| 重定向错误 | 1 | 0 | `www` 历史记录；当前线上单跳重定向正常，等待 Google 复查 |
| **合计** | **53** | **3** | **50 个不属于当前站点地图待索引队列** |

🚨 **如果执行者以“把 53 降到 0”为目标，很可能做出三种错误操作：**

1. 把随机网址跳转到首页，制造 soft 404（软 404，即服务器返回正常页面，但内容与请求网址不匹配）。
2. 删除正确的永久重定向，重新制造重复网址。
3. 在没有技术故障证据时重写已完成的俄语内容，引入新回归。

本计划的目标不是清空报告里的红色数字，而是保证每个“计划被索引的网址”满足索引条件，并让不该存在的网址返回准确状态。

## 4. 声明分类

### 4.1 Verifiable（可验证）

1. GSC 报告上次更新日期是 2026 年 9 月 4 日。
2. “所有已知网页”是 71 个已索引、53 个未索引。
3. “所有已提交网页”是 71 个已索引、3 个未索引。
4. 站点地图于 2026 年 8 月 28 日提交，2026 年 9 月 5 日最后读取，状态成功，发现 74 个网页。
5. 站点地图线上共有 74 个 `<loc>`（网址位置）条目，并包含 3 个目标网址。
6. `robots.txt`（爬虫规则文件）允许抓取公开网页。
7. 3 个目标网址当前均返回 HTTP 200（网页正常响应）。
8. 3 个目标网址的 GSC 实际网址测试均显示：

   * 网址可以编入索引
   * 抓取成功
   * 允许抓取
   * 允许编入索引
   * 用户声明的规范网址指向自身

9. 39 个自动重定向网址中，38 个当前返回 308 永久重定向并补上末尾斜杠，1 个 HTTP 网址返回 301 永久重定向到 HTTPS（加密协议）首页。
10. 当前 `www` 首页返回一次 301 永久重定向后到达 200 页面，没有循环。
11. 截至 2026 年 9 月 4 日的 final（已定稿）搜索表现数据里，3 个目标网址没有可见行；同期有 8 个其他俄语网址出现展示。

### 4.2 Judgment（主观判断）

1. 当前最小且风险最低的动作是仅提交 3 次索引请求，不改网站代码。
2. 2026 年 9 月 17 日第一次复查，2026 年 9 月 28 日第二次复查，能避免因报告延迟而过早改站。
3. 只有在第二次复查仍未索引、且技术准入继续通过时，才值得检查内容区分度和内部链接强度。

### 4.3 Confidence ≠ Correctness（自信不等于正确）

1. “实际网址可以编入索引”不等于 Google 一定会收录。
2. “搜索表现没有数据行”不等于网址一定未索引。
3. “构建成功”不等于生产站已经部署，也不等于 Google 已重新抓取。
4. “验证修复已开始”不等于问题已经修复。
5. “GSC 分类显示失败”不等于当前线上仍然失败，必须对照最近抓取时间和当前线上响应。

## 5. 第一性原理检查

一个计划被索引的网址，至少要依次通过以下七道门：

| 门槛 | 3 个目标网址的当前证据 | 状态 |
|---|---|---|
| 1. 网址确实应该存在 | 三个都是俄语内容页，并在当前站点地图内 | 通过 |
| 2. Google 能发现 | 站点地图包含它们；GSC 还记录了同主题多语言引荐页 | 通过 |
| 3. Google 能抓取 | 实际网址测试抓取成功，线上返回 200 | 通过 |
| 4. 没有禁止索引 | 允许编入索引，没有 `noindex`（禁止索引指令） | 通过 |
| 5. 规范网址没有冲突 | 用户声明的规范网址均为自身 | 通过 |
| 6. 内容具备独立价值 | 仓库内是独立俄语标题、描述、正文与比较内容，不是空壳页 | 初步通过 |
| 7. Google 完成抓取与选择 | 两个详情页尚无抓取日期；比较页已抓取但尚未选择索引 | 未完成 |

**[Inference]（推断）：** 当前剩余问题更符合“新俄语页面仍在抓取与选择阶段”，而不是 robots（爬虫规则）、规范网址或服务器响应故障。理由如下：

1. 俄语路由于 2026 年 8 月 26 日加入。
2. 站点地图于 2026 年 8 月 28 日提交。
3. GSC 报告只更新到 2026 年 9 月 4 日。
4. 14 个俄语站点地图网址中，已有 11 个被索引，只有 3 个仍待索引。
5. 3 个待索引网址的实际测试都通过。

**[Unverified]（未验证）：** Google 为什么暂时没有选择这 3 个网址，Google 没有提供更具体原因。任何“内容质量一定不足”或“抓取预算一定不足”的断言都属于无证据猜测。

## 6. 完整执行计划

### 阶段 0：保存执行前基线

**执行时间：2026 年 9 月 7 日**

**执行者要做：**

1. 在 GSC 的“网页索引编制”页面分别保存：

   * 所有已知网页：71 个已索引，53 个未索引
   * 所有已提交网页：71 个已索引，3 个未索引
   * 站点地图：74 个已发现网页，状态成功

2. 对附录 A 的 3 个目标网址逐一打开“网址检查”，记录：

   * 当前索引状态
   * 上次抓取时间
   * 引荐站点地图
   * 引荐来源网页
   * 用户声明的规范网址
   * Google 选择的规范网址

3. 对每个目标网址执行“测试实际网址”。只有结果仍为“网址可以编入索引”，才进入阶段 1。

**验收：**

1. 三个实际网址测试全部通过。
2. 当前站点地图仍为 74 个网址。
3. 没有新增“被 robots 阻止”“排除网页标记为 noindex”“重复网页”或“服务器错误”。

**停止条件：**

只要任一目标网址实际测试失败，立即停止索引提交，按阶段 4 的技术故障分支处理。

### 阶段 1：仅提交 3 次索引请求

**执行时间：阶段 0 通过后立即执行**

**老板要做：**

1. 明确授权执行者在 GSC 中点击“请求编入索引”。这会向 Google 提交外部状态变更，因此本次只读审计没有代替你点击。

**执行者要做：**

1. 对以下网址各点击一次“请求编入索引”：

   * `https://soulvirtues.org/ru/souls/bravery/`
   * `https://soulvirtues.org/ru/souls/kindness/`
   * `https://soulvirtues.org/ru/compare/bravery-vs-patience/`

2. 记录每个网址的提交日期和 GSC 返回状态。
3. 不重复提交，不提交附录 B、C、D 中的网址。
4. 不点击“网页会自动重定向”分类的“验证修复”。

**验收：**

每个目标网址都有一次成功受理记录。这里只证明 Google 接受了请求，不证明已索引。

**回滚：**

索引请求无法撤回，也不需要撤回。它只是排队信号，不会修改网站。

### 阶段 2：第一次观察

**执行日期：2026 年 9 月 17 日**

**执行者要做：**

1. 再次查看“所有已提交网页”，记录已索引和未索引数量。
2. 对 3 个目标网址逐一执行网址检查。
3. 只使用 final（已定稿）搜索表现数据做趋势参考。
4. 分别给每个网址标记以下状态：

| 状态 | 判定条件 | 动作 |
|---|---|---|
| PASS（通过） | GSC 显示网址已编入索引 | 结束该网址处理 |
| HOLD（继续观察） | 尚未索引，但实际测试仍通过 | 不改代码，继续观察到 2026 年 9 月 28 日 |
| FAIL TECH（技术失败） | 不是 200、抓取被阻止、出现 noindex、规范网址错误或抓取失败 | 进入阶段 4 |
| DISPUTED（有争议） | 报告状态与实际测试互相矛盾 | 保存两边证据，不凭单一页面下结论 |

**禁止：**

1. 不因为 10 天内尚未索引就批量重写内容。
2. 不把没有展示数据当成未索引证明。
3. 不为了数字好看给随机网址加跳转。

### 阶段 3：第二次观察与质量调查门槛

**执行日期：2026 年 9 月 28 日**

只有处于 HOLD（继续观察）的目标网址才进入本阶段。

**执行者要做：**

1. 再次运行实际网址测试。
2. 检查目标网址是否仍在站点地图，规范网址是否仍为自身。
3. 统计每个目标页从当前站内可点击链接获得的内部链接数量，并列出来源页。
4. 选择已经被索引的同类型俄语页面作为对照：

   * 详情页对照：`/ru/souls/determination/`、`/ru/souls/integrity/`
   * 比较页对照：`/ru/compare/bravery-vs-determination/`、`/ru/compare/integrity-vs-justice/`

5. 对比以下项目，不先改代码：

   * 页面正文长度
   * 独立俄语段落数量
   * 标题和描述是否与其他语言机械重复
   * 页面主内容是否在首次响应 HTML（网页源代码）中
   * 站内可点击链接的数量与位置
   * 是否存在相同规范网址、错误语言标记或重复内容

6. 生成一份逐页差异表。只有差异表显示明确短板，才进入阶段 5。

**质量调查通过条件：**

1. 目标页与已索引对照页在模板、可抓取性和基础内容量上没有明显缺失。
2. 若仍未索引，结果标记为“Google 暂未选择索引”，而不是虚构技术故障。

### 阶段 4：条件触发的技术修复

只有阶段 0 或阶段 2 出现 FAIL TECH（技术失败）时才能修改代码。

| 失败证据 | 修复位置 | 最小动作 |
|---|---|---|
| 页面不是 200 | 对应 Astro（静态网站框架）路由或部署规则 | 修复唯一失效路由，不新增无关页面 |
| robots 阻止 | `public/robots.txt` | 仅删除误拦截目标路径的规则 |
| 出现 noindex | 产生页面头部标记的共享布局 | 在共享根因处修复，不逐页打补丁 |
| 规范网址错误 | `src/layouts/Layout.astro` 或调用参数 | 修复规范网址生成根因 |
| hreflang（多语言对应标记）错误 | `src/layouts/Layout.astro` 与语言配置 | 修复错误映射，并验证五种语言互相对应 |
| 站点地图漏页 | `public/sitemap.xml` 或站点地图生成流程 | 只补回计划索引的网址 |
| 生产站与源码不一致 | 部署平台 | 先修部署，不重复改正确源码 |

**每次技术修复必须满足：**

1. 只改造成失败的共享根因。
2. 使用一个独立 Git 提交。
3. 运行阶段 7 的全部相关验证。
4. 部署后读取生产网址证明新版本生效。
5. 生产验证通过后，才在 GSC 提交验证或索引请求。

### 阶段 5：条件触发的内容或内部链接改进

只有同时满足以下条件才能进入：

1. 到 2026 年 9 月 28 日仍未索引。
2. 实际网址测试继续显示可以编入索引。
3. 阶段 3 的差异表发现具体短板。
4. 改动不会改变现有网址和规范网址。

**允许的最小改动：**

1. 如果内部链接明显少于已索引对照页：

   * 从 `/ru/` 首页或已索引的相关俄语页面增加 1 至 2 个语义相关、用户可见的正文链接。
   * 不在页脚批量堆链接。

2. 如果俄语内容明显比同类已索引页面薄：

   * 只补充该页面独有的俄语解释、例子或比较情境。
   * 优先修改现有数据文件，不创建新模板：
     * `src/data/soulDetailsI18n.ts`
     * `src/data/soulDetailsLocalizedContent.ts`
     * `src/data/soulComparisons.ts`

3. 如果页面主体内容未出现在首次 HTML 中：

   * 修复现有渲染流程，让主要文本服务端输出。
   * 不新增客户端兜底页面。

**禁止的改动：**

1. 不改这 3 个现有网址。
2. 不把俄语页规范到英语页。
3. 不删除俄语 hreflang。
4. 不批量制造相似段落来凑字数。
5. 不新增依赖。
6. 不新增“索引专用”页面。

## 7. 验证命令与预期结果

以下命令由实际执行修复的人运行。本次计划阶段没有运行构建，因为没有修改网站源代码。

### 7.1 Git 边界

```bash
git status --short
git diff -- src public astro.config.mjs package.json
```

预期结果：

1. 执行计划前，网站源代码没有本任务改动。
2. 若进入修复阶段，只出现批准过的路径。

### 7.2 构建和现有 SEO（搜索引擎优化）检查

```bash
npm run build
npm run audit:seo
node scripts/check_comparison_sample.mjs
```

预期结果：

1. 三条命令退出码均为 0。
2. 构建仍生成 74 个站点地图网址。
3. 没有新增内部 404、规范网址或多语言标记错误。

### 7.3 三个目标网址

```bash
curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' https://soulvirtues.org/ru/souls/bravery/
curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' https://soulvirtues.org/ru/souls/kindness/
curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' https://soulvirtues.org/ru/compare/bravery-vs-patience/
```

预期结果：每行均为 200，最终网址不变。

### 7.4 站点地图

```bash
curl -sS https://soulvirtues.org/sitemap.xml | rg -o '<loc>[^<]+' | wc -l
curl -sS https://soulvirtues.org/sitemap.xml | rg 'ru/(souls/(bravery|kindness)|compare/bravery-vs-patience)/'
```

预期结果：

1. 第一条返回 74。
2. 第二条返回全部 3 个目标网址。

### 7.5 历史错误内部链接

```bash
rg -n -S 'souls/(justicia|justiça)|/(ja|es|pt|ru)/privacy' src public
```

若修改过网站，再构建并检查生成文件：

```bash
rg -n -S 'souls/(justicia|justiça)|/(ja|es|pt|ru)/privacy' dist
```

预期结果：没有可点击的历史错误链接。若命中只是解释文本或测试样例，必须人工确认，不能机械替换。

### 7.6 主域重定向

```bash
curl -sS -I -L --max-redirs 10 https://www.soulvirtues.org/
curl -sS -I -L --max-redirs 10 http://soulvirtues.org/
```

预期结果：

1. `www` 网址只经过一次 301 后到达 `https://soulvirtues.org/` 的 200。
2. HTTP 网址只经过一次 301 后到达 HTTPS 首页的 200。
3. 没有循环，没有多跳链。

### 7.7 GSC 搜索表现数据

```bash
/Users/tangjei/.local/bin/gsc query \
  --start 2026-08-26 \
  --end 2026-09-04 \
  --dimensions page \
  --data-state final \
  --row-limit 25000
```

规则：

1. 必须使用仓库 `.gsc.json` 中的 `sc-domain:soulvirtues.org`。
2. 不允许用 `--site` 覆盖站点。
3. visible query rows（可见查询行）或页面行缺失，只能写“没有可见数据行”，不能写“没有被索引”。
4. 后续复查要把结束日期替换成当时已定稿的实际结束日期，并把该日期写进报告。

## 8. 验收矩阵

### 8.1 技术验收

| 项目 | 通过标准 |
|---|---|
| 线上响应 | 3 个目标网址均为 200 |
| 抓取 | GSC 实际测试均为抓取成功 |
| 索引许可 | 无 noindex，允许编入索引 |
| 规范网址 | 3 个网址都声明自身 |
| 发现 | 3 个网址都在成功读取的 74 项站点地图内 |
| 多语言 | 俄语与其他语言的对应标记正确 |
| 回归 | 构建和现有 SEO 检查通过 |
| 生产证明 | 部署后生产网页读取到修改内容；只构建或只推送不算 |

### 8.2 GSC 结果验收

| 结果 | 结论 |
|---|---|
| 3 个网址全部已索引 | 目标完成，期望值为 74 个已提交网址中 74 个已索引 |
| 部分已索引 | 完成已索引网址，剩余网址继续按各自状态处理 |
| 均未索引，但实际测试通过 | 技术准入仍合格；进入质量调查，不能宣称修复失败 |
| 出现明确技术失败 | 只修该技术根因，然后生产回读，再请求复查 |

🚨 **Google 是否最终索引属于外部选择，不是代码可以保证的结果。执行者只能保证技术准入、提交动作和证据回读。**

## 9. 回滚

1. 阶段 0 至阶段 3 不修改网站，没有代码回滚。
2. GSC 索引请求不能撤销，也不会改网站。
3. 如果阶段 4 或阶段 5 发生代码改动：

   * 每个根因使用单独提交。
   * 只回退该提交，不回退其他用户改动。
   * 回退后重新构建、部署并读取生产网页。
   * 不使用 `git reset --hard`（强制丢弃工作区改动）。

4. 不为清除 GSC 历史记录而回退正确的末尾斜杠、HTTPS 或主域规范化。

## 10. 谁做什么

### 10.1 本次 Codex（本地编码代理）已做

1. 核对当前工作目录、真实仓库根和干净基线。
2. 核对 `.gsc.json` 绑定的站点资源。
3. 读取 GSC 当前索引分类、站点地图和网址检查结果。
4. 对 3 个目标网址执行实际网址测试。
5. 核对线上 200、站点地图、robots、规范网址、多语言标记和重定向。
6. 核对当前源码与历史错误链接修复记录。
7. 保存本执行计划。

### 10.2 老板下一步要做

1. 把本文件交给其他 AI 做只读审阅。
2. 要求审阅者逐条回答第 11 节的问题，不接受只有“计划很全面”的评价。
3. 审阅通过后，再明确授权执行阶段 1 的三次 GSC 索引请求。
4. 不需要现在修改代码。

### 10.3 后续执行者要做

1. 严格按日期和门槛执行。
2. 每次只记录实际状态，不把请求受理写成已索引。
3. 未触发阶段 4 或阶段 5 时，不修改源码。
4. 若修改并部署，必须分别报告源码、构建、提交、推送、部署、生产回读和 GSC 回读状态。

## 11. 给其他 AI 的对抗式审阅清单

请审阅者逐项给出“通过、驳回、缺证据”之一，并引用本文件具体章节：

1. `71 ÷ 74 = 95.95%` 是否是当前已提交网址的正确口径？
2. 53 个未索引网址的分类之和是否准确，是否遗漏任何当前站点地图网址？
3. 是否有任何证据支持现在修改 robots、规范网址、站点地图或俄语正文？
4. 是否把 GSC 搜索表现的“没有可见数据行”错误当成索引状态？
5. 对 39 个永久重定向不再提交“验证修复”是否合理？
6. 9 个 404 中是否存在必须保留或必须重定向的网址？若主张重定向，证据是外链、点击还是用户路径？
7. 对随机网址保持真实 404，是否比全部跳首页更准确？
8. 2026 年 9 月 17 日和 2026 年 9 月 28 日两个观察点是否过早或过晚？请给可验证理由。
9. 阶段 4 与阶段 5 的触发条件是否足够严格，能否阻止无证据改站？
10. 技术验收与 Google 最终选择索引是否被明确分开？
11. 回滚是否会误伤老板已有但未提交的改动？
12. 是否有任何步骤把构建成功、Git 推送或请求受理冒充生产生效或索引成功？

审阅者若提出修改，必须同时给出：

1. 被修改的原步骤。
2. 新证据。
3. 新动作。
4. 新验收标准。
5. 新风险与回滚方式。

## 12. 禁止事项

1. 禁止把 53 个全部当作要修复的有效网页。
2. 禁止把随机网址 301 到首页。
3. 禁止删除正确的末尾斜杠重定向。
4. 禁止把俄语网址规范到英语网址。
5. 禁止反复点击“请求编入索引”。
6. 禁止反复验证“网页会自动重定向”分类。
7. 禁止在没有差异证据时批量重写俄语正文。
8. 禁止把 GSC 搜索表现行当成完整索引清单。
9. 禁止把本地构建、提交或推送当成生产部署证明。
10. 禁止承诺 Google 一定索引。

## 附录 A：当前真正待索引的完整队列

| 网址 | GSC 分类 | 上次抓取 | 2026 年 9 月 7 日实际测试 |
|---|---|---|---|
| `https://soulvirtues.org/ru/souls/bravery/` | 已发现，尚未编入索引 | 不适用，尚无抓取记录 | 可以编入索引 |
| `https://soulvirtues.org/ru/souls/kindness/` | 已发现，尚未编入索引 | 不适用，尚无抓取记录 | 可以编入索引 |
| `https://soulvirtues.org/ru/compare/bravery-vs-patience/` | 已抓取，尚未编入索引 | 2026 年 9 月 4 日 03:07:21 | 可以编入索引 |

## 附录 B：9 个 404 完整队列

| 网址 | GSC 上次抓取 | 当前动作 |
|---|---|---|
| `https://soulvirtues.org/m77q0qop3532np32m6204n055pp7pp36.bzs` | 2026 年 9 月 3 日 | 随机网址，保持真实 404 |
| `https://soulvirtues.org/souls/justiça` | 2026 年 9 月 3 日 | 历史葡语错误链接；当前链接已修，先保持 404 |
| `https://soulvirtues.org/souls/justicia` | 2026 年 9 月 3 日 | 历史西语错误链接；当前链接已修，先保持 404 |
| `https://soulvirtues.org/uimzf-otqow` | 2026 年 9 月 2 日 | 随机网址，保持真实 404 |
| `https://soulvirtues.org/uimzf-etai` | 2026 年 9 月 1 日 | 随机网址，保持真实 404 |
| `https://soulvirtues.org/ja/privacy` | 2026 年 9 月 1 日 | 历史语言切换链接；当前统一隐私页为 `/privacy/`，先保持 404 |
| `https://soulvirtues.org/pt/privacy` | 2026 年 8 月 31 日 | 历史语言切换链接；当前统一隐私页为 `/privacy/`，先保持 404 |
| `https://soulvirtues.org/es/privacy` | 2026 年 8 月 31 日 | 历史语言切换链接；当前统一隐私页为 `/privacy/`，先保持 404 |
| `https://soulvirtues.org/lazq` | 2026 年 8 月 30 日 | 随机网址，保持真实 404 |

只有当外链、点击或真实用户路径证明历史错误网址仍有价值时，才讨论语义一致的一跳 301：

1. `/souls/justicia` 指向 `/es/souls/justice/`
2. `/souls/justiça` 指向 `/pt/souls/justice/`
3. 三个语言隐私旧网址指向 `/privacy/`

没有证据时不增加这些规则。

## 附录 C：39 个自动重定向完整队列

以下网址均不在当前站点地图中。2026 年 9 月 7 日逐一复查结果为：前 38 个缺少末尾斜杠的网址返回单跳 308 永久重定向，最后一个 HTTP 网址返回单跳 301 永久重定向。

1. `https://soulvirtues.org/es/souls/bravery`
2. `https://soulvirtues.org/souls/integrity`
3. `https://soulvirtues.org/es/souls/determination`
4. `https://soulvirtues.org/souls/bravery`
5. `https://soulvirtues.org/es/souls/patience`
6. `https://soulvirtues.org/es/souls/integrity`
7. `https://soulvirtues.org/pt/souls/perseverance`
8. `https://soulvirtues.org/es/souls/perseverance`
9. `https://soulvirtues.org/pt/compare/bravery-vs-determination`
10. `https://soulvirtues.org/es/souls/kindness`
11. `https://soulvirtues.org/souls/kindness`
12. `https://soulvirtues.org/privacy`
13. `https://soulvirtues.org/ja/souls/patience`
14. `https://soulvirtues.org/ja/souls/kindness`
15. `https://soulvirtues.org/pt/souls/justice`
16. `https://soulvirtues.org/ja/souls/integrity`
17. `https://soulvirtues.org/compare/bravery-vs-determination`
18. `https://soulvirtues.org/compare/bravery-vs-patience`
19. `https://soulvirtues.org/es/compare/bravery-vs-patience`
20. `https://soulvirtues.org/contact`
21. `https://soulvirtues.org/es/compare/determination-vs-perseverance`
22. `https://soulvirtues.org/ja/compare/kindness-vs-patience`
23. `https://soulvirtues.org/pt/souls/kindness`
24. `https://soulvirtues.org/ja/souls/perseverance`
25. `https://soulvirtues.org/terms`
26. `https://soulvirtues.org/ja/compare/bravery-vs-patience`
27. `https://soulvirtues.org/compare/determination-vs-perseverance`
28. `https://soulvirtues.org/about`
29. `https://soulvirtues.org/es/compare/integrity-vs-justice`
30. `https://soulvirtues.org/compare/integrity-vs-justice`
31. `https://soulvirtues.org/ja/compare/justice-vs-kindness`
32. `https://soulvirtues.org/compare/justice-vs-kindness`
33. `https://soulvirtues.org/compare/kindness-vs-patience`
34. `https://soulvirtues.org/pt/compare/determination-vs-perseverance`
35. `https://soulvirtues.org/pt/compare/bravery-vs-patience`
36. `https://soulvirtues.org/ja/compare/determination-vs-perseverance`
37. `https://soulvirtues.org/pt/compare/justice-vs-kindness`
38. `https://soulvirtues.org/pt/compare/integrity-vs-justice`
39. `http://soulvirtues.org/`

GSC 显示这一类“验证失败”，是因为这些来源网址仍按设计进行重定向。正确动作是保留单跳永久重定向，不再把这类状态当作待修复错误。

## 附录 D：其余两个非站点地图网址

| 网址 | GSC 分类 | 当前证据 | 动作 |
|---|---|---|---|
| `https://soulvirtues.org/egneodunq` | 已抓取，尚未编入索引 | 随机网址，不在站点地图 | 应返回真实 404，不请求索引 |
| `https://www.soulvirtues.org/` | 重定向错误 | GSC 上次抓取是 2026 年 8 月 18 日；当前线上单跳 301 到主域后返回 200；验证详情为待处理 1、失败 0 | 不改源码，等待 Google 复查；若 2026 年 9 月 17 日仍报错，再检查 Cloudflare（云平台）重定向、DNS（域名解析）和 SSL（加密证书） |

## 最终裁决

即使经过讨论，我认为你在以下方面依然错误：把 GSC 的 53 个“未编入索引”网址整体视为 53 个需要修复的有效网页。当前可验证的有效待索引队列只有 3 个，其余 50 个是正确重定向、历史 404、随机网址或等待 Google 复查的主域记录。
