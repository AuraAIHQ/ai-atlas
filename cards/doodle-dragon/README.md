# 涂鸦变神龙  ·  Doodle to dragon

> 🎨 涂鸦成画 · 难度：入门 · 适合：小学→高中 · 约 4 个实验

![screenshot](./screenshot.png)

## 体验（先玩）
画一条歪歪扭扭的龙，AI 把它补成一张精致插画。你负责“想画什么、什么构图”，AI 负责“画得好看”。

▶ Playground：https://huggingface.co/spaces/myn0908/S2I-Artwork-Sketch-to-Image-Diffusion
（备选：Scribble Diffusion 源码 https://github.com/replicate/scribble-diffusion ）

## 原理（它怎么工作）
这是 **sketch → image（草图生成图像）**，核心是**扩散模型 + ControlNet**：

- **扩散模型**从一张纯噪声开始，一步步“去噪”，最终显出一张图。它见过海量图片，知道“龙大概长什么样”。
- 但只给文字，它不知道你要的**构图**。**ControlNet** 把你的草图当成一个额外的“结构条件”——你的线条会被提取成边缘/轮廓，在每一步去噪时**把画面钉在你的构图上**。
- 所以最后：**草图定构图，文字定风格与细节**。同一张草图，换一句 prompt（“水墨风的龙 / 赛博朋克的龙”），就出完全不同的画。

一句话：AI 不是“描”你的线，而是在你的线**约束下重新想象**一遍。

## 你能学到什么
- 草图作为“条件”引导生成（ControlNet 的直觉）
- prompt 控风格、草图控构图——两个旋钮分开调
- AI 的“想象”从哪来：它在补它见过的模式，也因此会在你没画清楚的地方“自作主张”

## 怎么复现（自己做）
1. **最快**：打开上面的 Hugging Face Space，在画布上涂鸦 + 写 prompt 直接出图；点右上「Duplicate this Space」可复制到自己账号免费跑。
2. **看代码**：`git clone https://github.com/replicate/scribble-diffusion` —— 这是一个 Next.js + Tailwind 前端，调用 Replicate 上的 ControlNet-scribble 模型。
   - 注册 Replicate 拿 API token，填进 `.env`。
   - `npm install && npm run dev`，本地就能画→生成。
3. **进阶（本地/自控）**：用 Python `diffusers` + `controlnet`（`lllyasviel/sd-controlnet-scribble`），把你的草图作为 control image，`StableDiffusionControlNetPipeline` 出图。
4. **需要**：一个能跑扩散模型的后端（Replicate / HF / 本地 GPU）+ 一个画布前端（HTML canvas 即可）。

## 陪伴形象
本卡配套形象：`cherry-smile`（Cherry 的一个表情，可做数字徽章 / NFT）。

---
_这张卡是 ai-atlas 的一个条目。想改进或新增卡片？欢迎提 PR，见根目录 README。_
