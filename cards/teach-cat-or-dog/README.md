# 5 分钟教它认猫狗 · Teach it cats vs dogs in 5 min

> 🤖 训练你自己的 AI · 入门 · 适合：小学→职校 · 🟢 自建 playground（我们自己的后端 / 你的浏览器里跑，不依赖第三方）

用摄像头给几张例子，训练一个自己的图像分类器，看它实时判断。

### 🎮 体验

用摄像头给几张例子，训练一个自己的图像分类器，看它实时判断。5 分钟，你就“训练”出了一个属于自己的 AI——第一次亲手体会“训练”是怎么回事。

### 🧠 原理

想象你请了一位从没见过猫和狗、但已经看过几百万张各种图片的“资深看图师傅”。它早就学会了通用本领——认边缘、认颜色、认纹理、认形状，只是没人告诉过它“哪张叫猫、哪张叫狗”。Teachable Machine 里那个现成的视觉模型 MobileNet，就是这位师傅。

你打开网页，点“Image Project”，对着摄像头给“猫”这一类拍几十张、给“狗”这一类拍几十张。这里发生三步。第一步：摄像头把每一帧画面交给 MobileNet，它不关心整张图，而是把画面“榨”成一串数字（专业叫“特征向量”）——相当于师傅在心里记下“这张图有多少毛茸茸、多少尖耳朵、多少圆眼睛”。第二步：你其实没有重新训练这位师傅（那要海量数据和昂贵算力），你只是在它后面接了一个很小的分类器，反复告诉它“这串数字是猫、那串数字是狗”，它就一点点调整自己内部成千上万个“旋钮”（参数），直到能把猫的数字和狗的数字分到两边。这就是“训练”——不是把每张照片背下来，而是拧旋钮拧到能分开为止。这种“站在见多识广的大模型肩上，只教它你这几类的区别”的做法，叫“迁移学习”，所以你几十张就够，不用几百万张。

第三步：识别的时候，新画面同样先过 MobileNet 变成数字，再进你的小分类器，输出“猫 87%、狗 13%”这样的概率，取最高的那类显示出来。

打个更接地气的比方：MobileNet 像一个已经上过十几年美术课、什么都见过的人，你要教他分辨你家那两只宠物，只需给他看几十张，他立刻抓得住重点；而一个从零开始的新手，你得给他看几百万张才行——这就是迁移学习省事的地方。同样这套流程，把“猫 / 狗”换成“良品 / 次品”“举手 / 没举手”“戴口罩 / 没戴”，工厂质检、课堂点名都能用，一分钱云服务器都不用租。

最关键的一点：这一整套——拍照、训练、识别——全部在你自己这台电脑的浏览器里跑，靠的是 TensorFlow.js 这个能在网页里做 AI 计算的引擎。你的猫狗照片没有上传到任何服务器，断网也能训练和识别。也正因为它只学过你给的例子，如果你只拍白猫、只拍黑狗，它可能会把“白”当成猫的特征、“黑”当成狗的特征——这就是数据偏见的第一课：喂给它什么，它就学成什么样。

### 🗺 架构流程图

```
[你的摄像头]
    │ 每一帧画面（一堆像素）
    ▼
[MobileNet 现成视觉模型] —— 把画面“榨”成一串数字（特征）
    │ 特征向量
    ▼
┌────────── 训练时 ──────────┐   ┌────────── 识别时 ──────────┐
│ 你标注：这串=猫 / 那串=狗  │   │ 新画面的特征进来          │
│      ▼                     │   │      ▼                     │
│ 小分类器反复拧“旋钮”（参数）│   │ 小分类器打分              │
│ 直到能把猫/狗分两边        │   │      ▼                     │
└────────────────────────────┘   │ 输出：猫 87% / 狗 13%      │
                                  │      ▼ 取最高             │
                                  │ 屏幕显示：猫              │
                                  └────────────────────────────┘

全程运行在【你自己的浏览器】（TensorFlow.js）—— 不联网、不上云
```

### 🎓 学到什么

- “训练”到底在做什么（调参数，不是背图）
- 样本少 / 偏了会怎样——数据偏见的第一课
- 迁移学习：站在一个见多识广的模型肩上，所以几十个例子就够

### 🔧 怎么复现

- 最快：Teachable Machine 选“Image Project”，每类用摄像头拍几十张，点训练
- 导出模型（TF.js），用 ml5.js 嵌进自己的网页实时识别
- 换个题目：良品/次品、手势、垃圾分类——同一个流程
- 需要：一个浏览器 + 摄像头；训练和运行都在本地，无需服务器

**要点：** “训练”到底在做什么 · 样本少 / 偏了会怎样（偏见） · 导出模型接进网页

[▶ 去 playground](/play/teach-cat-or-dog) · [源码/参考](https://github.com/googlecreativelab/teachablemachine-community)

<details>
<summary><b>English</b></summary>

### 🎮 Experience

Show a webcam a few examples and train your own image classifier, then watch it judge live. In 5 minutes you've 'trained' an AI of your own — the first hands-on feel of what training means.

### 🧠 How it works

Imagine you hired a seasoned 'image reader' who has never seen a cat or a dog, yet has already looked at millions of pictures of every kind. It already knows the general skills — spotting edges, colors, textures, shapes — nobody has just told it 'which one is a cat and which is a dog.' That ready-made vision model inside Teachable Machine, MobileNet, is exactly this expert.

You open the page, click 'Image Project,' and with your webcam take a few dozen shots for the 'cat' class and a few dozen for the 'dog' class. Three things happen. First, the webcam hands each frame to MobileNet, which doesn't care about the whole picture — it squeezes the frame into a string of numbers (a 'feature vector'), like the expert jotting down 'how much fluffiness, how many pointy ears, how many round eyes.' Second, you don't actually retrain that expert (that needs massive data and expensive computing); you just attach a tiny classifier behind it and repeatedly tell it 'this string of numbers is a cat, that one is a dog.' It slowly tunes its thousands of internal 'knobs' (parameters) until it can sort the cat-numbers from the dog-numbers. That is 'training' — not memorizing each photo, but turning knobs until the two sides separate. Standing on the shoulders of a well-traveled big model and only teaching it the difference between your classes is called transfer learning, which is why a few dozen shots are enough, not millions.

Third, when recognizing, a new frame goes through MobileNet into numbers, then into your small classifier, which outputs probabilities like 'cat 87%, dog 13%' and shows the highest one.

A more down-to-earth analogy: MobileNet is like someone who has taken a dozen years of art classes and seen everything; to teach them to tell your two pets apart, you only show a few dozen photos and they instantly grasp what matters — while a from-scratch beginner would need millions. That's the beauty of transfer learning. The same workflow, swapping 'cat / dog' for 'good / defective,' 'hand raised / not,' 'mask / no mask,' works for factory QC or classroom roll-call — without renting a single cent of cloud server.

The key point: this whole thing — capturing, training, recognizing — runs entirely inside the browser on your own computer, powered by TensorFlow.js, an engine that does AI math right in a web page. Your cat and dog photos are never uploaded to any server; you can train and recognize even offline. And because it only learned from the examples you gave, if you only shot white cats and black dogs it might treat 'white' as cat and 'black' as dog — the first lesson in data bias: it becomes whatever you feed it.

### 🗺 How it flows

```
[Your webcam]
    │ every frame (a pile of pixels)
    ▼
[MobileNet ready-made vision model] — squeezes the frame into numbers (features)
    │ feature vector
    ▼
┌────────── While training ──────────┐   ┌───────── While recognizing ─────────┐
│ You label: this=cat / that=dog     │   │ New frame's features come in        │
│      ▼                             │   │      ▼                              │
│ Tiny classifier turns 'knobs'      │   │ Tiny classifier scores              │
│ until cat/dog split apart          │   │      ▼                              │
└────────────────────────────────────┘   │ Output: cat 87% / dog 13%           │
                                          │      ▼ take the highest             │
                                          │ Screen shows: cat                   │
                                          └─────────────────────────────────────┘

Everything runs in [your own browser] (TensorFlow.js) — no internet, no cloud
```

### 🎓 What you learn

- What 'training' really does (tuning parameters, not memorizing)
- What happens with few or skewed samples — a first lesson in data bias
- Transfer learning: standing on a well-traveled model, so a few dozen examples suffice

### 🔧 How to reproduce

- Fastest: Teachable Machine → 'Image Project', capture a few dozen shots per class, click Train
- Export the model (TF.js) and embed it in your own page with ml5.js for live recognition
- Change the task: good/defect, gestures, recycling sorting — same workflow
- You need: a browser + a webcam; training and running are both local, no server

</details>

<details>
<summary><b>ภาษาไทย</b></summary>

### 🎮 ประสบการณ์

ให้เว็บแคมดูตัวอย่างไม่กี่ภาพ แล้วฝึกตัวจำแนกภาพของคุณเอง ดูมันตัดสินแบบเรียลไทม์ ใน 5 นาทีคุณก็ 'ฝึก' AI ของตัวเองได้ — สัมผัสความหมายของการฝึกด้วยมือตัวเองครั้งแรก

### 🧠 หลักการ

ลองนึกภาพว่าคุณจ้าง 'ผู้เชี่ยวชาญดูภาพ' ที่ไม่เคยเห็นแมวหรือหมามาก่อน แต่เคยดูภาพนับล้านทุกชนิดมาแล้ว เขามีทักษะพื้นฐานอยู่แล้ว — มองเห็นขอบ สี พื้นผิว รูปทรง เพียงแต่ไม่มีใครบอกว่า 'ภาพไหนคือแมว ภาพไหนคือหมา' โมเดลภาพสำเร็จรูปใน Teachable Machine ที่ชื่อ MobileNet ก็คือผู้เชี่ยวชาญคนนี้

คุณเปิดหน้าเว็บ กด 'Image Project' แล้วใช้เว็บแคมถ่ายคลาส 'แมว' หลายสิบภาพ และคลาส 'หมา' หลายสิบภาพ มีสามขั้นตอนเกิดขึ้น ขั้นแรก เว็บแคมส่งแต่ละเฟรมให้ MobileNet มันไม่สนใจทั้งภาพ แต่ 'บีบ' เฟรมให้เหลือชุดตัวเลข ('เวกเตอร์ฟีเจอร์') เหมือนผู้เชี่ยวชาญจดว่า 'ภาพนี้มีความฟูแค่ไหน หูแหลมกี่ข้าง ตากลมกี่ดวง' ขั้นสอง คุณไม่ได้ฝึกผู้เชี่ยวชาญใหม่ (นั่นต้องใช้ข้อมูลมหาศาลและพลังประมวลผลราคาแพง) คุณเพียงต่อตัวจำแนกเล็ก ๆ ไว้ข้างหลัง แล้วบอกมันซ้ำ ๆ ว่า 'ชุดตัวเลขนี้คือแมว ชุดนั้นคือหมา' มันค่อย ๆ ปรับ 'ปุ่ม' ภายในนับพัน (พารามิเตอร์) จนแยกตัวเลขแมวออกจากตัวเลขหมาได้ นั่นคือ 'การฝึก' — ไม่ใช่ท่องจำแต่ละภาพ แต่หมุนปุ่มจนสองฝั่งแยกจากกัน การยืนบนไหล่ของโมเดลใหญ่ที่เห็นมามากและสอนแค่ความต่างของคลาสคุณ เรียกว่า transfer learning จึงใช้ไม่กี่สิบภาพก็พอ ไม่ต้องเป็นล้าน

ขั้นสาม เวลารู้จำ เฟรมใหม่ผ่าน MobileNet กลายเป็นตัวเลข แล้วเข้าตัวจำแนกเล็ก ซึ่งให้ความน่าจะเป็นเช่น 'แมว 87% หมา 13%' แล้วแสดงคลาสที่สูงสุด

เปรียบเทียบให้เห็นภาพขึ้น: MobileNet เหมือนคนที่เรียนวาดภาพมาสิบกว่าปีและเห็นอะไรมาหมดแล้ว จะสอนให้แยกสัตว์เลี้ยงสองตัวของคุณ เพียงให้ดูไม่กี่สิบภาพก็จับประเด็นได้ทันที ขณะที่มือใหม่ที่เริ่มจากศูนย์ต้องดูเป็นล้านภาพ — นี่คือความคุ้มของ transfer learning เวิร์กโฟลว์เดียวกันนี้ เปลี่ยน 'แมว / หมา' เป็น 'ดี / เสีย' 'ยกมือ / ไม่ยก' 'ใส่แมสก์ / ไม่ใส่' ก็ใช้ตรวจงานในโรงงานหรือเช็กชื่อในห้องเรียนได้ โดยไม่ต้องเช่าเซิร์ฟเวอร์คลาวด์แม้แต่บาทเดียว

จุดสำคัญ: ทั้งหมดนี้ — ถ่าย ฝึก รู้จำ — ทำงานภายในเบราว์เซอร์บนเครื่องของคุณเองล้วน ๆ ขับเคลื่อนด้วย TensorFlow.js เอนจินที่คำนวณ AI ในหน้าเว็บได้เลย ภาพแมวหมาของคุณไม่เคยถูกอัปโหลดไปเซิร์ฟเวอร์ไหน ตัดเน็ตก็ยังฝึกและรู้จำได้ และเพราะมันเรียนจากตัวอย่างที่คุณให้เท่านั้น ถ้าคุณถ่ายแต่แมวขาวกับหมาดำ มันอาจถือว่า 'ขาว' คือแมว 'ดำ' คือหมา — บทเรียนแรกเรื่องอคติข้อมูล: ป้อนอะไรมันก็กลายเป็นอย่างนั้น

### 🗺 แผนผังการทำงาน

```
[เว็บแคมของคุณ]
    │ ทุกเฟรม (พิกเซลกองหนึ่ง)
    ▼
[MobileNet โมเดลภาพสำเร็จรูป] — บีบเฟรมให้เป็นตัวเลข (ฟีเจอร์)
    │ เวกเตอร์ฟีเจอร์
    ▼
┌────────── ตอนฝึก ──────────┐   ┌────────── ตอนรู้จำ ──────────┐
│ คุณติดป้าย: นี่=แมว / นั่น=หมา │   │ ฟีเจอร์ของเฟรมใหม่เข้ามา      │
│      ▼                       │   │      ▼                       │
│ ตัวจำแนกเล็กหมุน 'ปุ่ม'       │   │ ตัวจำแนกเล็กให้คะแนน          │
│ จนแมว/หมาแยกจากกัน          │   │      ▼                       │
└──────────────────────────────┘   │ ผลลัพธ์: แมว 87% / หมา 13%   │
                                    │      ▼ เลือกสูงสุด           │
                                    │ จอแสดง: แมว                 │
                                    └──────────────────────────────┘

ทุกอย่างรันใน [เบราว์เซอร์ของคุณเอง] (TensorFlow.js) — ไม่ต่อเน็ต ไม่ขึ้นคลาวด์
```

### 🎓 สิ่งที่ได้เรียนรู้

- 'การฝึก' ทำอะไรจริง ๆ (ปรับพารามิเตอร์ ไม่ใช่ท่องจำ)
- ตัวอย่างน้อยหรือเอนเอียงจะเป็นอย่างไร — บทเรียนแรกเรื่องอคติข้อมูล
- transfer learning: ยืนบนไหล่โมเดลที่เห็นมามาก จึงใช้ตัวอย่างไม่กี่สิบก็พอ

### 🔧 วิธีทำซ้ำ

- เร็วที่สุด: Teachable Machine เลือก 'Image Project' ถ่ายหลายสิบภาพต่อคลาส กดฝึก
- ส่งออกโมเดล (TF.js) แล้วฝังในหน้าเว็บด้วย ml5.js เพื่อรู้จำสด
- เปลี่ยนโจทย์: ดี/เสีย ท่าทาง แยกขยะ — เวิร์กโฟลว์เดียวกัน
- ต้องมี: เบราว์เซอร์ + เว็บแคม ฝึกและรันในเครื่อง ไม่ต้องมีเซิร์ฟเวอร์

</details>

---
*本文档由 `card.json` 生成 · slug: `teach-cat-or-dog` · 三语内容以 card.json 为准*
