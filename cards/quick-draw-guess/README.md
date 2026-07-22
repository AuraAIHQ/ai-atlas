# AI 猜猜我画的啥 · Can the AI guess your doodle?

> 🎨 涂鸦成画 · 入门 · 适合：小学+ · 🟢 自建 playground（我们自己的后端 / 你的浏览器里跑，不依赖第三方）

随手画，神经网络实时猜你画的是什么。第一次直观看懂“分类”。

### 🎮 体验

随手画，神经网络实时猜你画的是什么。第一次直观看懂“分类”——AI 怎么把一团线条认成“猫”。

### 🧠 原理

这张卡是最经典的「图像分类」：你随手画，AI 实时猜你画的是什么。它背后是一个叫 CNN（卷积神经网络）的模型，Google 用它做了 Quick, Draw! 这个游戏。

先说它「学」过什么。这个模型在几千万张人类涂鸦上训练过（来自全世界玩家画的猫、房子、香蕉……每张都带标签「这是猫」「这是房子」）。注意：它并不是把这几千万张图背下来存在硬盘里。训练的过程，是让它从海量例子里自己总结出「模式」——猫大概有两只尖耳朵、几根胡须、一张圆脸；房子大概是三角顶加方身子。它记住的是这种「长什么样的规律」，不是某一张具体的画。

代码跑在哪？你玩的时候，画布收集你的笔画，把它发给 Google 的服务器，模型在那边算完再把猜测传回你屏幕（这类小模型其实也能塞进浏览器本地跑，但 Quick, Draw! 是在云端算的）。

你的一团线条，怎么变成模型能懂的东西？你画的其实是一串坐标点（笔从哪到哪），程序先把它渲染／整理成一张「图像特征」——可以粗略理解成一张小小的黑白点阵图。CNN 拿到这张图，会像用一层层放大镜扫描：第一层看最基本的短线、拐角；往上一层，把短线拼成「耳朵」「轮廓」这种局部形状；再往上，把这些局部拼成「整体像不像某个东西」的判断。

最后，模型不会斩钉截铁说「这就是猫」，而是给出一串概率：像猫 80%、像狗 10%、像兔子 5%……然后挑最高的那个当答案念出来。所以它是「边画边猜」的——你只画了两只耳朵时它可能猜兔子，等你补上胡须和圆脸，概率天平就倒向猫，越画越准。

也正因为它靠的是「见过的模式」，所以有边界：你画得太抽象、太有个人风格，或者画了个它训练时没见过的东西，它就会猜歪。这也揭示了所有 AI 的一条共同规律——见得越多、数据越多，认得越准。AI 其实不「认识」猫，它只是见过特别特别多的猫涂鸦，学会了判断「像不像」。整条链路：你画线条 → 渲染成图像特征 → 发到服务器的 CNN → 层层提取形状 → 输出各类别概率 → 取最高＝猜测，边画边刷新。

### 🗺 架构流程图

```
[你的手: 在画布上画线条]
        ↓
[浏览器: 笔画坐标 → 渲染成图像特征(点阵图)]
        ↓
[发送到 Google 服务器]
        ↓
[CNN 卷积层: 短线 → 局部形状 → 整体判断]
        ↓
[输出各类别概率: 猫80% 狗10% 兔5% ...]
        ↓
[取最高 = 猜测, 传回屏幕]
        ↓
[边画边猜, 线条越多越准]
```

### 🎓 学到什么

- 模型学到的是“模式”，不是“记忆”
- 它会在哪翻车、为什么（没见过的、太抽象的）——AI 的边界
- 数据量与识别准确率的关系（所有 AI 的共同规律）

### 🔧 怎么复现

- 最快：直接玩 quickdraw.withgoogle.com，感受“边画边猜”
- 看数据：Quick, Draw! 公开了 5000 万+ 涂鸦数据集
- 自己训一个：用这些数据 + 一个简单 CNN，几十行代码
- 不想写代码：用 Teachable Machine 自己画几类当场训练，同一原理

**要点：** 模型从海量涂鸦里学到了什么 · 它会在哪翻车、为什么 · 数据量与识别的关系

[▶ 去 playground](/play/quick-draw-guess) · [源码/参考](https://github.com/googlecreativelab/quickdraw-dataset)

<details>
<summary><b>English</b></summary>

### 🎮 Experience

Doodle freely and a neural network guesses what you're drawing in real time. The most intuitive way to 'get' classification — how AI reads a tangle of lines as 'cat.'

### 🧠 How it works

This card is the most classic 'image classification': you doodle, and the AI guesses in real time what you're drawing. Behind it is a model called a CNN (convolutional neural network) — the one Google used to build the game Quick, Draw!.

First, what has it 'learned'? This model was trained on tens of millions of human doodles (cats, houses, bananas drawn by players all over the world, each labeled 'this is a cat,' 'this is a house'). Note: it does not memorize those tens of millions of pictures onto a hard drive. Training is the process of letting it distill 'patterns' from a huge number of examples on its own — a cat tends to have two pointy ears, a few whiskers, a round face; a house tends to be a triangle roof on a square body. What it remembers is that 'rule of what things look like,' not any one specific drawing.

Where does the code run? When you play, the canvas collects your strokes and sends them to Google's servers; the model computes there and sends the guess back to your screen (a small model like this could actually run inside the browser too, but Quick, Draw! computes it in the cloud).

How does your tangle of lines become something the model can understand? What you draw is really a string of coordinate points (where the pen went from and to); the program first renders/tidies it into an 'image feature' — roughly, a tiny black-and-white dot grid. The CNN takes this image and scans it like layers of magnifying glasses: the first layer looks at the most basic short lines and corners; a layer up, it assembles short lines into local shapes like 'ears' or 'outline'; higher up, it assembles those parts into a judgment of 'how much this looks like something.'

Finally, the model doesn't declare flatly 'this is a cat'; it gives a string of probabilities: 80% cat, 10% dog, 5% rabbit… then picks the highest as the answer. So it 'guesses as you draw' — when you've only drawn two ears it might guess rabbit, and once you add whiskers and a round face the scales tip toward cat, getting surer the more you draw.

And precisely because it relies on 'patterns it has seen,' it has limits: draw too abstractly, too personally, or draw something it never saw in training, and it guesses wrong. This reveals a rule shared by all AI — the more it has seen, the more data, the more accurately it recognizes. The AI doesn't actually 'know' a cat; it has just seen an enormous number of cat doodles and learned to judge 'how alike.' The whole chain: you draw lines → rendered into an image feature → sent to the CNN on the server → shapes extracted layer by layer → outputs per-class probabilities → takes the highest = the guess, refreshed as you draw.

### 🗺 How it flows

```
[Your hand: draw lines on the canvas]
        ↓
[Browser: stroke coordinates → render into image feature (dot grid)]
        ↓
[Sent to Google's server]
        ↓
[CNN conv layers: short lines → local shapes → overall judgment]
        ↓
[Outputs per-class probabilities: cat 80% dog 10% rabbit 5% ...]
        ↓
[Take the highest = the guess, sent back to screen]
        ↓
[Guess as you draw, surer with more lines]
```

### 🎓 What you learn

- A model learns 'patterns,' not 'memories'
- Where and why it fails (unseen, too abstract) — the limits of AI
- How data volume relates to accuracy (a rule shared by all AI)

### 🔧 How to reproduce

- Fastest: just play quickdraw.withgoogle.com and feel 'guess as you draw'
- See the data: Quick, Draw! released 50M+ doodles as an open dataset
- Train your own: those doodles + a simple CNN, a few dozen lines
- No code: use Teachable Machine to draw a few classes and train on the spot — same idea

</details>

<details>
<summary><b>ภาษาไทย</b></summary>

### 🎮 ประสบการณ์

ขีดเขียนอิสระ แล้วโครงข่ายประสาทเดาว่าคุณวาดอะไรแบบเรียลไทม์ วิธีเข้าใจ 'การจำแนก' ที่ชัดที่สุด — AI อ่านเส้นยุ่ง ๆ เป็น 'แมว' ได้อย่างไร

### 🧠 หลักการ

การ์ดนี้คือ 'การจำแนกภาพ' คลาสสิกที่สุด: คุณขีดเขียน แล้ว AI เดาแบบเรียลไทม์ว่าคุณวาดอะไร เบื้องหลังคือโมเดลชื่อ CNN (โครงข่ายประสาทแบบคอนโวลูชัน) ตัวที่ Google ใช้สร้างเกม Quick, Draw!

อย่างแรก มัน 'เรียน' อะไรมา? โมเดลนี้ถูกฝึกบนภาพขีดเขียนของมนุษย์หลายสิบล้านภาพ (แมว บ้าน กล้วย ที่ผู้เล่นทั่วโลกวาด แต่ละภาพมีป้าย 'นี่คือแมว' 'นี่คือบ้าน') สังเกต: มันไม่ได้ท่องจำภาพหลายสิบล้านนั้นลงฮาร์ดดิสก์ การฝึกคือการปล่อยให้มันกลั่น 'รูปแบบ' จากตัวอย่างจำนวนมหาศาลด้วยตัวเอง — แมวมักมีหูแหลมสองข้าง หนวดไม่กี่เส้น หน้ากลม บ้านมักเป็นหลังคาสามเหลี่ยมบนตัวสี่เหลี่ยม สิ่งที่มันจำคือ 'กฎว่าสิ่งต่าง ๆ หน้าตาเป็นอย่างไร' ไม่ใช่ภาพใดภาพหนึ่งโดยเฉพาะ

โค้ดรันที่ไหน? ตอนคุณเล่น แคนวาสเก็บเส้นของคุณแล้วส่งไปยังเซิร์ฟเวอร์ของ Google โมเดลคำนวณที่นั่นแล้วส่งคำเดากลับมาที่จอคุณ (โมเดลเล็กแบบนี้จริง ๆ รันในเบราว์เซอร์ก็ได้ แต่ Quick, Draw! คำนวณบนคลาวด์)

เส้นยุ่ง ๆ ของคุณกลายเป็นสิ่งที่โมเดลเข้าใจได้อย่างไร? สิ่งที่คุณวาดจริง ๆ คือชุดพิกัดจุด (ปากกาลากจากไหนไปไหน) โปรแกรมเรนเดอร์/จัดมันเป็น 'ฟีเจอร์ภาพ' ก่อน — พูดคร่าว ๆ คือตารางจุดขาวดำเล็ก ๆ CNN รับภาพนี้แล้วสแกนเหมือนแว่นขยายทีละชั้น: ชั้นแรกดูเส้นสั้นและมุมพื้นฐานที่สุด ชั้นถัดขึ้นไปประกอบเส้นสั้นเป็นรูปทรงย่อยอย่าง 'หู' หรือ 'เส้นขอบ' สูงขึ้นไปประกอบส่วนย่อยเหล่านั้นเป็นการตัดสินว่า 'คล้ายอะไรแค่ไหน'

สุดท้าย โมเดลไม่ได้ฟันธงว่า 'นี่คือแมว' แต่ให้ชุดความน่าจะเป็น: แมว 80% หมา 10% กระต่าย 5%... แล้วเลือกตัวสูงสุดเป็นคำตอบ มันจึง 'เดาไปวาดไป' — ตอนคุณวาดแค่สองหูมันอาจเดากระต่าย พอเติมหนวดกับหน้ากลม ตราชั่งก็เอียงไปทางแมว แม่นขึ้นเมื่อวาดมากขึ้น

และเพราะมันพึ่ง 'รูปแบบที่เคยเห็น' มันจึงมีขอบเขต: วาดนามธรรมเกินไป มีสไตล์ส่วนตัวเกินไป หรือวาดสิ่งที่มันไม่เคยเห็นตอนฝึก มันก็เดาผิด นี่เผยกฎร่วมของ AI ทั้งหมด — ยิ่งเห็นมาก ยิ่งมีข้อมูลมาก ยิ่งรู้จำแม่น AI ไม่ได้ 'รู้จัก' แมวจริง ๆ มันแค่เห็นภาพแมวมามหาศาลจนเรียนรู้การตัดสิน 'ความคล้าย' ทั้งสาย: คุณวาดเส้น → เรนเดอร์เป็นฟีเจอร์ภาพ → ส่งไปยัง CNN บนเซิร์ฟเวอร์ → ดึงรูปทรงทีละชั้น → ออกความน่าจะเป็นแต่ละคลาส → เอาตัวสูงสุด = คำเดา รีเฟรชไปเรื่อยขณะวาด

### 🗺 แผนผังการทำงาน

```
[มือของคุณ: วาดเส้นบนแคนวาส]
        ↓
[เบราว์เซอร์: พิกัดเส้น → เรนเดอร์เป็นฟีเจอร์ภาพ (ตารางจุด)]
        ↓
[ส่งไปยังเซิร์ฟเวอร์ของ Google]
        ↓
[ชั้นคอนโวลูชัน CNN: เส้นสั้น → รูปทรงย่อย → การตัดสินรวม]
        ↓
[ออกความน่าจะเป็นแต่ละคลาส: แมว 80% หมา 10% กระต่าย 5% ...]
        ↓
[เอาตัวสูงสุด = คำเดา ส่งกลับไปที่จอ]
        ↓
[เดาไปวาดไป ยิ่งเส้นมากยิ่งแม่น]
```

### 🎓 สิ่งที่ได้เรียนรู้

- โมเดลเรียน 'รูปแบบ' ไม่ใช่ 'ความจำ'
- มันพลาดตรงไหนและทำไม (ไม่เคยเห็น นามธรรมไป) — ขอบเขตของ AI
- ปริมาณข้อมูลสัมพันธ์กับความแม่น (กฎร่วมของ AI ทั้งหมด)

### 🔧 วิธีทำซ้ำ

- เร็วที่สุด: เล่น quickdraw.withgoogle.com สัมผัส 'เดาไปวาดไป'
- ดูข้อมูล: Quick, Draw! เปิดชุดข้อมูลภาพขีดเขียน 50 ล้าน+
- ฝึกเอง: ข้อมูลนั้น + CNN ง่าย ๆ ไม่กี่สิบบรรทัด
- ไม่โค้ด: ใช้ Teachable Machine วาดไม่กี่คลาสแล้วฝึกทันที หลักการเดียวกัน

</details>

---
*本文档由 `card.json` 生成 · slug: `quick-draw-guess` · 三语内容以 card.json 为准*
