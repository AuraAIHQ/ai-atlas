# AI 学习卡 · 实现清单 BACKLOG

> 逐卡跟踪：内容（原理/流程图）是否到位、playground **到底是自建还是借外部**、以及**怎么把外链换成自建**。
> 原则：能自建就自建，学别人怎么实现 → 部署到我们自己的后端（Modal GPU / 浏览器端 / 我们代理的 LLM）→ 用我们自己的 token 计量。**不长期依赖第三方 demo**（别人挂了我们就挂，如 doodle-dragon 的 HF Space 500）。

## 图例
- 内容：✅ 已写三语原理+流程图 · ⬜ 待写
- playground：🟢 自建（我们的服务器/GPU/浏览器端）· 🔴 外链第三方 · 🟡 我们自建的静态页但无 AI

---

## 当前 13 张卡状态

| 卡 | 场景 | 内容 | playground 现状 | 自建方案 | 类别 |
|---|---|---|---|---|---|
| text-to-image | 涂鸦成画 | ✅ | 🟢 Modal GPU 跑 SD-Turbo，已上线测过 | —（已自建，样板）| A |
| particle-play | 动画 | ✅ | 🟡 自建 canvas 页，无模型（本就不需要）| —（够用）| B |
| doodle-dragon | 涂鸦成画 | ✅ | 🔴 链外部 HF Space `myn0908/S2I-…`（**现 500**）| **Modal 部署 ControlNet-Scribble / SD+涂鸦条件** | A |
| prompt-to-clip | 动画 | ✅ | 🔴 链 `ByteDance/AnimateDiff-Lightning` HF | Modal 部署 AnimateDiff-Lightning（开源权重）| A |
| teach-cat-or-dog | 训练你自己的 | ✅ | 🔴 链 Teachable Machine 官网 | **浏览器端 TF.js + MobileNet 迁移学习**（零 GPU 成本）| B |
| sound-trigger | 训练你自己的 | ✅ | 🔴 链 Teachable Machine 官网 | 浏览器端 TF.js speech-commands | B |
| webcam-controller | 小游戏 | ✅ | 🔴 链 Teachable Machine 官网 | 浏览器端 TF.js MoveNet 姿态 + p5.js | B |
| quick-draw-guess | 涂鸦成画 | ✅ | 🔴 链 Google Quick Draw | 浏览器端 TF.js 涂鸦分类器（QuickDraw 数据）| B |
| sentence-to-game | 小游戏 | ✅ | 🔴 链 rosebud.ai | 我们代理的 LLM 生成可玩 HTML/JS 游戏 | C |
| ten-minute-website | 帮你完成想法 | ✅ | 🔴 链 aistudio.google.com | 我们代理的 LLM 生成网页（草图/描述→HTML）| C |
| kids-art-gallery | 帮你完成想法 | ✅ | 🔴 链 aistudio.google.com | 我们代理的 LLM 生成画廊页 + 上传图 | C |
| chat-with-your-pdf | 聊天助手 | ✅ | 🔴 链 aistudio.google.com | 我们后端 RAG：embed + 向量库 + 我们的 LLM | C |
| roleplay-tutor | 聊天助手 | ✅ | 🔴 链 aistudio.google.com | 我们代理的 LLM 聊天（系统提示做角色/陪练）| C |

**账：13 张里目前真正自建的只有 2 张（text-to-image 有模型 / particle-play 纯前端）；其余 11 张是外链，需改自建。**

---

## 三类自建路径（按投入产出排序）

### B 类 · 浏览器端 ML（最优先，零 GPU 成本）
5 张卡（teach-cat-or-dog / sound-trigger / webcam-controller / quick-draw-guess，+ particle-play 已完成）。
- 全部在**用户浏览器里**用 TensorFlow.js / MediaPipe 跑，**我们不花一分算力钱**，也不占 token。
- 做法：像 `particle-play` 那样在 `iDoris-website/site/play/` 写自建静态页，card.json 的 `playground.embed` 指过去、`selfHosted:true`。
- 学别人：Teachable Machine、ml5.js 都是开源的，照着搭我们自己的版本。
- **这是把「外链」变「自建」最快的一批，应先做。**

### A 类 · Modal GPU 模型（复用 text-to-image 样板）
2 张卡（doodle-dragon / prompt-to-clip）。
- 复用现成链路：`/api/play` → Modal endpoint → 出结果 → 按 `gpu_sec` 计 token。text-to-image 已跑通，加新模型即可。
- **doodle-dragon**：Modal 部署 ControlNet-Scribble（或 SD + 涂鸦 ControlNet）。输入=用户涂鸦(canvas)+prompt → 出图。**顺带修掉现在的 500。**
- **prompt-to-clip**：Modal 部署 AnimateDiff-Lightning（开源）。视频更吃显存，token 系数调高（`PRICING.coeff.video`）。
- 学别人：那些 HF Space 背后就是 diffusers + 开源权重，我们照搬到 Modal 自建。

### C 类 · 我们代理的 LLM（走自有 token）
5 张卡（sentence-to-game / ten-minute-website / kids-art-gallery / chat-with-your-pdf / roleplay-tutor）。
- 后端加 `/api/chat`（或 `/api/gen`）→ 调**我们代理的国内大模型**（34 模型 ×2 价目那套）→ 按返回 token 用量计费（同 `creditsForUsd()`）。
- 前端各写一个 `/play/*` 页：roleplay-tutor=纯聊天最简单；ten-minute-website/kids-art-gallery/sentence-to-game=让 LLM 吐 HTML 直接 iframe 预览；chat-with-your-pdf=最重（要 embed+向量库）。

---

## 建议执行顺序
1. **B 类 5 张**（快、零成本、直接消灭 5 个外链）→ 写 `/play/*` 静态页。
2. **doodle-dragon（A 类）** → Modal 上新模型，修 500，证明「加模型」链路。
3. **roleplay-tutor + ten-minute-website（C 类轻的）** → 打通 `/api/chat` 自有 LLM 计费。
4. prompt-to-clip（视频，较重）、chat-with-your-pdf（RAG，较重）殿后。

> 每做完一张：card.json 的 `playground.selfHosted` 置 true、`embed` 指向自建页，README 顶部标注从 🔴 变 🟢，本表更新。
