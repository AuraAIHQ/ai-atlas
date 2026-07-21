# 一句话生成小游戏  ·  A sentence becomes a game

> 🕹 做个小游戏 · 难度：入门 · 适合：初中→大专 · 约 3 个实验

![screenshot](./screenshot.png)

## 体验（先玩）
描述一个游戏，AI 生成一个能玩的网页游戏 + 素材。你来当设计师，说规则；AI 来当程序员，写代码。

▶ Playground：https://rosebud.ai
（游戏引擎基础参考：Phaser https://github.com/phaserjs/phaser ）

## 原理（它怎么工作）
一个游戏 = **规则 + 素材 + 关卡**，这三样 AI 都能帮你生成：

- 你说“一个横版跳跳乐，角色收集星星，碰到旗子过关”，大模型把它**翻译成游戏代码**（通常基于 Phaser、JS 这类它熟悉的引擎），因为它见过大量游戏源码，知道“平台”“碰撞”“得分”怎么写。
- 素材（角色、星星、平台）可以由生图模型生成，或用内置素材库。
- 生成后是一个**能立刻玩**的网页；不好玩就继续说“跳高一点 / 加个敌人 / 变难”，它改代码。

一句话：你负责“好不好玩”的判断，AI 负责把判断落成能跑的代码。

## 你能学到什么
- 把一个想法拆成“规则 / 素材 / 关卡”三件事（游戏设计的最小框架）
- 用自然语言迭代玩法：设计是一轮轮试出来的
- 生成之后怎么接手改：导出代码 → 用 Phaser 继续做

## 怎么复现（自己做）
1. **最快（无代码）**：打开 https://rosebud.ai ，用一句话描述你的游戏，和它对话着调；可导出 Phaser/JS 工程。
2. **打好引擎基础**：跟官方教程做一遍经典“接星星”平台游戏 —— https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game （Phaser 3，纯 JS，浏览器即可）。
3. **AI + 引擎结合**：让 LLM 帮你在 Phaser 工程里加新机制（新敌人、新关卡、计分板），每次只加一个。
4. **进阶**：给游戏加一个 LLM 驱动的 NPC（会“思考”的角色），参考 `github.com/Xin-Ray/Phaser_GAgent-LLM_AI_Agent_Explore`。
5. **需要**：一个能生成游戏的 AI（Rosebud）或一个 JS 游戏引擎（Phaser）+ 浏览器。

## 陪伴形象
本卡配套形象：`doris-smile`（Doris 的一个表情，可做数字徽章 / NFT）。

---
_这张卡是 ai-atlas 的一个条目。想改进或新增卡片？欢迎提 PR，见根目录 README。_
