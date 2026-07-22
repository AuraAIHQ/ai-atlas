# 涂鸦变神龙 · Doodle to dragon

> 🎨 涂鸦成画 · 入门 · 适合：小学→高中 · 🔗 外部 playground：https://huggingface.co/spaces/myn0908/S2I-Artwork-Sketch-to-Image-Diffusion（第三方托管，可用性以对方为准）

画一条歪歪扭扭的龙，AI 把它补成一张精致插画。理解 sketch→image。

### 🎮 体验

画一条歪歪扭扭的龙，AI 把它补成一张精致插画。你负责“想画什么、什么构图”，AI 负责“画得好看”。

### 🧠 原理

这张卡玩的是「草图变精致插画」（sketch→image）。和纯文生图不同，你这次给了 AI 两样东西：一张你手画的歪龙草图，和一句文字描述（比如「水墨风，云雾缭绕」）。

先说代码跑在哪。这张卡的画画后端不在我们自己的服务器上，而是挂在云端的 GPU 服务上（HuggingFace Space 或 Replicate 这类平台）。你在画布上涂的线、写的字，会被打包发到那台云端显卡，画完再把图传回来。你的浏览器只负责「收集你画了什么」和「显示结果」，真正的重活在远方的显卡上。

模型是两个搭档：Stable Diffusion（扩散模型，负责凭空生成漂亮的图）＋ ControlNet（负责「听你的构图指挥」）。

它们怎么配合？你画的草图，会先被一道「描边」程序提取成一组干净的线条／边缘，这组线条就成了「结构条件」——相当于告诉 AI「龙头在这、尾巴在那、别乱跑」。同时，你写的那句文字被 CLIP 编码器翻译成一串代表「风格和内容」的数字向量——相当于告诉 AI「我要水墨风、要云雾」。

然后扩散模型开始干活：它从一张纯噪声（电视雪花）出发，一步步「去噪」、显出图形。关键在于，每去噪一步，ControlNet 都会把当前画面「钉」回你那组线条上，确保龙的姿势、构图始终贴着你画的走。所以最终：草图管住了构图（东西在哪、什么姿势），文字管住了风格（水墨、油画、赛博朋克）。

这里有个容易误会的点：AI 不是拿橡皮把你的线「描」清楚、上个色。它是在你线条的约束下，参照它见过的几百万张图，「重新想象」了一条龙出来。所以它会自作主张——给你补上鳞片的光泽、背景的云、你根本没画的细节。你画得越清楚、文字写得越具体，它就越听话；你留白越多，它自由发挥的空间就越大。整条链路：你涂草图＋写文字 → 传到云端 GPU → 草图提取成边缘条件、文字编码成风格向量 → 扩散模型从噪声去噪、ControlNet 每一步对齐你的线 → 出图传回浏览器。

### 🗺 架构流程图

```
[你的浏览器: 手画草图 + 文字描述]
        ↓
[云端 GPU 服务 (HF Space / Replicate)]
        ↓
[草图 → 提取边缘线条 = 构图条件]
[文字 → CLIP 编码 = 风格向量]
        ↓
[Stable Diffusion: 纯噪声 → 逐步去噪]
        ↓
[ControlNet: 每一步把画面钉回你的线条]
        ↓
[生成插画 → 传回浏览器显示]
```

### 🎓 学到什么

- 草图作为“条件”引导生成（ControlNet 的直觉）
- prompt 控风格、草图控构图——两个旋钮分开调
- AI 的“想象”从哪来：它在补它见过的模式，也因此会自作主张

### 🔧 怎么复现

- 最快：打开右侧 playground，在画布上涂鸦 + 写 prompt 直接出图
- 看代码：clone replicate/scribble-diffusion（Next.js 调 Replicate 的 ControlNet 模型），填 API token 即可本地跑
- 进阶：Python diffusers + sd-controlnet-scribble，把草图当 control image 出图
- 需要：一个扩散后端（Replicate / HF / 本地 GPU）+ 一个画布前端

**要点：** 草图作为“条件”引导生成（ControlNet） · prompt 控风格、草图控构图 · AI 的“想象”从哪来

[▶ 去 playground](https://huggingface.co/spaces/myn0908/S2I-Artwork-Sketch-to-Image-Diffusion) · [源码/参考](https://github.com/replicate/scribble-diffusion)

<details>
<summary><b>English</b></summary>

### 🎮 Experience

Draw a wobbly little dragon, and AI turns it into a polished illustration. You decide what to draw and how to frame it; AI makes it look good.

### 🧠 How it works

This card is about 'sketch into a polished illustration' (sketch→image). Unlike pure text-to-image, this time you give the AI two things: a wobbly dragon you sketched by hand, and a line of text (say, 'ink-wash style, wrapped in mist').

Where does the code run? This card's painting backend is not on our own server — it hangs on a cloud GPU service (platforms like HuggingFace Space or Replicate). The lines you draw on the canvas and the words you type get packed up and sent to that cloud GPU, which paints and sends the image back. Your browser only 'collects what you drew' and 'shows the result'; the heavy lifting happens on the distant GPU.

The model is a pair of partners: Stable Diffusion (the diffusion model that conjures a beautiful image from nothing) + ControlNet (which 'takes orders on your composition').

How do they cooperate? Your sketch is first run through an 'edge-tracing' step that extracts a set of clean lines/edges — and those lines become the 'structural condition,' as if telling the AI 'the dragon's head is here, the tail is there, don't wander.' At the same time, your text is translated by the CLIP encoder into a string of numbers (a vector) representing 'style and content' — as if telling the AI 'I want ink-wash, I want mist.'

Then the diffusion model gets to work: starting from pure noise (TV static), it 'denoises' step by step until shapes appear. The key is that on every denoising step, ControlNet 'pins' the current picture back onto your set of lines, making sure the dragon's pose and composition always follow what you drew. So in the end: the sketch controls the composition (where things are, what pose), and the text controls the style (ink-wash, oil, cyberpunk).

Here's an easy misunderstanding: the AI is not erasing and 'inking over' your lines to tidy them and add color. Under the constraint of your lines, and referencing the millions of images it has seen, it 're-imagines' a dragon from scratch. So it improvises — adding the sheen on the scales, clouds in the background, details you never drew. The clearer you draw and the more specific your text, the more obedient it is; the more blank space you leave, the more room it has to freelance. The whole chain: you sketch + write text → sent to the cloud GPU → sketch extracted into edge conditions, text encoded into a style vector → diffusion model denoises from noise, ControlNet aligns to your lines at each step → image sent back to the browser.

### 🗺 How it flows

```
[Your browser: hand-drawn sketch + text prompt]
        ↓
[Cloud GPU service (HF Space / Replicate)]
        ↓
[Sketch → extract edge lines = composition condition]
[Text  → CLIP encoding    = style vector]
        ↓
[Stable Diffusion: pure noise → step-by-step denoise]
        ↓
[ControlNet: pin the picture back to your lines each step]
        ↓
[Generated illustration → back to browser]
```

### 🎓 What you learn

- A sketch as a 'condition' that guides generation (the ControlNet intuition)
- Prompt controls style, sketch controls composition — two separate knobs
- Where AI's 'imagination' comes from: it fills in patterns it has seen, and so it improvises

### 🔧 How to reproduce

- Fastest: use the playground here — doodle on the canvas, write a prompt, get an image
- Read the code: clone replicate/scribble-diffusion (Next.js calling a ControlNet model on Replicate); add an API token and run it locally
- Go deeper: Python diffusers + sd-controlnet-scribble, feed your sketch as the control image
- You need: a diffusion backend (Replicate / HF / local GPU) + a canvas front-end

</details>

<details>
<summary><b>ภาษาไทย</b></summary>

### 🎮 ประสบการณ์

วาดมังกรเบี้ยว ๆ แล้ว AI จะเปลี่ยนมันเป็นภาพประกอบที่สวยงาม คุณกำหนดว่าจะวาดอะไรและจัดวางอย่างไร ส่วน AI ทำให้มันออกมาสวย

### 🧠 หลักการ

การ์ดนี้เกี่ยวกับ 'ภาพร่างกลายเป็นภาพประกอบสวยงาม' (sketch→image) ต่างจาก text-to-image ล้วน ๆ ครั้งนี้คุณให้ AI สองอย่าง: มังกรเบี้ยว ๆ ที่คุณวาดด้วยมือ และข้อความหนึ่งบรรทัด (เช่น 'สไตล์หมึกจีน ห่มด้วยหมอก')

โค้ดรันที่ไหน? แบ็กเอนด์วาดภาพของการ์ดนี้ไม่ได้อยู่บนเซิร์ฟเวอร์ของเราเอง แต่แขวนอยู่บนบริการ GPU บนคลาวด์ (แพลตฟอร์มอย่าง HuggingFace Space หรือ Replicate) เส้นที่คุณวาดบนแคนวาสและคำที่คุณพิมพ์จะถูกแพ็คส่งไปยังการ์ดจอบนคลาวด์นั้น วาดเสร็จแล้วส่งภาพกลับมา เบราว์เซอร์ของคุณแค่ 'เก็บสิ่งที่คุณวาด' และ 'แสดงผลลัพธ์' งานหนักจริงเกิดบนการ์ดจอที่อยู่ไกลออกไป

โมเดลคือคู่หูสองตัว: Stable Diffusion (โมเดล diffusion ที่เสกภาพสวยจากความว่างเปล่า) + ControlNet (ที่ 'รับคำสั่งเรื่ององค์ประกอบ')

พวกมันร่วมมือกันอย่างไร? ภาพร่างของคุณจะผ่านขั้นตอน 'ลากเส้นขอบ' ที่ดึงออกมาเป็นชุดเส้น/ขอบที่สะอาด และเส้นเหล่านี้กลายเป็น 'เงื่อนไขโครงสร้าง' เหมือนบอก AI ว่า 'หัวมังกรอยู่ตรงนี้ หางอยู่ตรงนั้น อย่าเถลไถล' ในเวลาเดียวกัน ข้อความของคุณถูก CLIP encoder แปลเป็นชุดตัวเลข (เวกเตอร์) ที่แทน 'สไตล์และเนื้อหา' เหมือนบอก AI ว่า 'ฉันอยากได้หมึกจีน อยากได้หมอก'

จากนั้นโมเดล diffusion เริ่มทำงาน: เริ่มจากสัญญาณรบกวนล้วน (หิมะทีวี) แล้ว 'ลดรบกวน' ทีละขั้นจนรูปทรงปรากฏ จุดสำคัญคือทุกขั้นของการลดรบกวน ControlNet จะ 'ตรึง' ภาพปัจจุบันกลับไปที่ชุดเส้นของคุณ ให้ท่าทางและองค์ประกอบของมังกรตามที่คุณวาดเสมอ สุดท้าย: ภาพร่างคุมองค์ประกอบ (อะไรอยู่ตรงไหน ท่าไหน) และข้อความคุมสไตล์ (หมึกจีน สีน้ำมัน ไซเบอร์พังก์)

จุดที่เข้าใจผิดง่าย: AI ไม่ได้ลบแล้ว 'ลงหมึกทับ' เส้นของคุณให้เรียบร้อยแล้วเติมสี ภายใต้ข้อจำกัดของเส้นคุณและอ้างอิงภาพหลายล้านภาพที่เคยเห็น มัน 'จินตนาการ' มังกรขึ้นใหม่ทั้งตัว มันจึงด้นสด — เติมประกายบนเกล็ด เมฆด้านหลัง รายละเอียดที่คุณไม่เคยวาด ยิ่งวาดชัดและข้อความเจาะจง มันยิ่งเชื่อฟัง ยิ่งเว้นที่ว่างมาก มันยิ่งมีพื้นที่ด้นสด ทั้งสาย: คุณวาดภาพร่าง + เขียนข้อความ → ส่งไปยัง GPU บนคลาวด์ → ภาพร่างถูกดึงเป็นเงื่อนไขเส้นขอบ ข้อความถูกเข้ารหัสเป็นเวกเตอร์สไตล์ → โมเดล diffusion ลดรบกวนจากสัญญาณรบกวน ControlNet จัดแนวให้ตรงเส้นคุณทุกขั้น → ภาพส่งกลับเบราว์เซอร์

### 🗺 แผนผังการทำงาน

```
[เบราว์เซอร์: ภาพร่างวาดมือ + คำสั่งข้อความ]
        ↓
[บริการ GPU บนคลาวด์ (HF Space / Replicate)]
        ↓
[ภาพร่าง → ดึงเส้นขอบ = เงื่อนไของค์ประกอบ]
[ข้อความ → เข้ารหัส CLIP = เวกเตอร์สไตล์]
        ↓
[Stable Diffusion: สัญญาณรบกวนล้วน → ลดรบกวนทีละขั้น]
        ↓
[ControlNet: ตรึงภาพกลับไปที่เส้นของคุณทุกขั้น]
        ↓
[ภาพประกอบที่สร้าง → กลับไปเบราว์เซอร์]
```

### 🎓 สิ่งที่ได้เรียนรู้

- ภาพร่างเป็น 'เงื่อนไข' ที่นำทางการสร้างภาพ (สัญชาตญาณของ ControlNet)
- คำสั่งคุมสไตล์ ภาพร่างคุมองค์ประกอบ — สองปุ่มปรับแยกกัน
- จินตนาการของ AI มาจากไหน: มันเติมรูปแบบที่เคยเห็น จึงด้นสดเองได้

### 🔧 วิธีทำซ้ำ

- เร็วที่สุด: ใช้ playground ทางขวา วาดบนแคนวาส เขียนคำสั่ง แล้วได้ภาพ
- ดูโค้ด: clone replicate/scribble-diffusion (Next.js เรียกโมเดล ControlNet บน Replicate) ใส่ API token แล้วรันในเครื่องได้
- ลงลึก: Python diffusers + sd-controlnet-scribble ป้อนภาพร่างเป็น control image
- ต้องมี: แบ็กเอนด์ diffusion (Replicate / HF / GPU ในเครื่อง) + ส่วนหน้าที่เป็นแคนวาส

</details>

---
*本文档由 `card.json` 生成 · slug: `doodle-dragon` · 三语内容以 card.json 为准*
