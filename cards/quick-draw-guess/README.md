# AI 猜猜我画的啥  ·  Can the AI guess your doodle?

> 🎨 涂鸦成画 · 难度：入门 · 适合：小学+ · 约 3 个实验

![screenshot](./screenshot.png)

## 体验（先玩）
随手画，神经网络实时猜你画的是什么。第一次直观看懂“分类”——AI 怎么把一团线条认成“猫”。

▶ Playground：https://quickdraw.withgoogle.com
（公开数据集：Quick, Draw! Dataset https://github.com/googlecreativelab/quickdraw-dataset ）

## 原理（它怎么工作）
这是最经典的 **图像分类（classification）**，也是最好懂的一种 AI：

- 训练时，模型看过**几百万张人类的涂鸦**，每张都带标签（“这是猫 / 这是房子”）。它学的不是“背下每张图”，而是**从大量例子里总结出模式**：猫大概有尖耳朵、胡须、圆脸。
- 你画的时候，模型把你的线条和它总结的模式比对，输出一个**概率**：“80% 像猫、10% 像狗…”，选最高的那个当答案。
- 所以它**边画边猜**、越画越准——信息越多，判断越有把握。也因此，你画得太抽象、或画了它没见过的东西，它就会“猜歪”。

一句话：AI 不认识“猫”，它只是**见过特别多猫的涂鸦**，学会了“像不像”。

## 你能学到什么
- 模型从海量例子里学到的是“模式”，不是“记忆”
- 它会在哪翻车、为什么（没见过的、太抽象的）——AI 的边界
- 数据量与识别准确率的关系（这也是所有 AI 的共同规律）

## 怎么复现（自己做）
1. **最快**：直接玩 https://quickdraw.withgoogle.com ，感受“边画边猜”。
2. **看数据**：Quick, Draw! 公开了 5000 万+ 张涂鸦数据集（`github.com/googlecreativelab/quickdraw-dataset`），下载几个类别看看。
3. **自己训一个**：用这些数据 + 一个简单的 CNN（TensorFlow/Keras 或 PyTorch 教程一抓一大把），训练一个“涂鸦分类器”，几十行代码。
4. **不想写代码**：用 Teachable Machine（`teachablemachine.withgoogle.com`）自己画几类、当场训练一个分类器，同一个原理。
5. **需要**：一个浏览器就能玩；想自己训练则要 Python + 一点点机器学习库。

## 陪伴形象
本卡配套形象：`cherry-tilt`（Cherry 歪头好奇，可做数字徽章 / NFT）。

---
_这张卡是 ai-atlas 的一个条目。想改进或新增卡片？欢迎提 PR，见根目录 README。_
