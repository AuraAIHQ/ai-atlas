# ai-atlas — iDoris AI 体验卡内容库

> AI 的门槛不在「难」，在于不知道能拿它干嘛。**每张卡把一个具体的 AI 场景，变成一个能立刻上手玩、玩完能看懂、还能自己复现的入口。**

这是 [iDoris](https://idoris.ai) 「AI 体验卡」产品的内容仓库。**每一张卡 = `cards/` 下的一个子目录。** 卡片墙与详情页由 Cloudflare 发布（`idoris.ai`），playground 通过我们代理的模型 token 运行。

## 一张卡的结构

```
cards/<slug>/
  card.json        # 元数据（标题、场景、难度、年龄、token 量、playground、来源仓库…）
  README.md        # 体验 → 原理 → 你能学到什么 → 怎么复现
  screenshot.png   # 卡面截图（16:10，≤400KB）
```

聚合索引 `cards/index.json` 由 `scripts/build-index.mjs` 从各 `card.json` 生成，供站点消费。

## 六大场景

🎬 做个动画 · 🎨 涂鸦成画 · 🕹 做个小游戏 · 🤖 训练你自己的 AI · 💬 造个聊天助手 · ✨ 帮你完成一个想法

首批 12 张卡（每场景 2 张）已在 `cards/` 里作为骨架，`status: draft`，原理/复现部分待补。

## 卖的是什么

一张卡 ≈ ¥10（≈$1.5），含够做 3–4 个实验的 token（定价 = 原始模型 API 价 ×2），外加一张可收藏的 **Doris / Cherry** 表情形象（可做数字徽章 / NFT）。购买见 https://idoris.ai/buy 。

**核心逻辑：我们卖的不是 token。** 转卖算力谁都能做——我们做的是一套像「辅导班」一样的**引导**：给普通人一级一级**微小的台阶**和**微小的成就感**，陪他一步步 landing 到 AI 上，用 AI 提升自己的福祉。token / 钱包只是水管；**牵引、台阶、陪伴才是产品本身**。每张卡都要服务于"帮人踏上第一级台阶、拿到一个小小的成就感"。

## 贡献一张卡

1. 复制任一 `cards/<slug>/` 作模板，改 `card.json` 与 `README.md`。
2. 放一张 `screenshot.png`（≤400KB）。
3. `node scripts/build-index.mjs` 重建索引。
4. 提 PR。审核通过即上架；优秀的「复现案例」会进案例列表，并可得 token 奖励。

`card.json` 字段见 `cards.schema.json`。

## 相关

- 产品规划：见 iDoris 团队规划页（含案例库、定价、路线）
- 形象：Doris（AI 助手）& Cherry（凯利蓝㹴），见 https://idoris.ai/friends

## License

Apache-2.0 —— 拿去用、fork、改都不用问。见 [LICENSE](./LICENSE)。
