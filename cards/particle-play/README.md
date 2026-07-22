# 让图形动起来 · Make shapes come alive

> 🎬 做个动画 · 入门 · 适合：初中→大学 · 🟢 自建 playground（跑在我们自己的服务器/GPU 上）

用几行创意代码，让粒子、线条随机地动起来——第一次感受“代码即画笔”。

### 🎮 体验

用几行创意代码，让粒子、线条随机地动起来——第一次感受“代码即画笔”。这张卡的 playground 就在本页，是我们自己写的：拖动就能画，还能切到万花筒模式。

### 🧠 原理

先说个反直觉的事实：这张卡从头到尾没有用任何 AI 模型，也不联网、不占用任何服务器或显卡。你看到的所有粒子、线条、图案，全都是在你自己这台手机或电脑的浏览器里、当场算出来、当场画出来的。断网也照样能玩。

它靠的是一门叫「创意编程」的手艺。你可以把浏览器里的画布想象成一块黑板，程序做的第一件事，就是每隔极短的时间就把整块黑板擦掉、重画一遍。一秒钟重画大约 60 次，人眼跟不上这么快的擦-画，就把它看成了「连续的动画」——这就是动画的真相，没有魔法，只是快到你看不出破绽的连环画。

第二个关键是「随机数 + 循环」。程序不是一个一个地告诉每个点该待在哪，而是写一条规则：比如「生成 500 个点，每个点的位置、方向、速度都随机抖一下，然后各自往前走一小步」。循环让这条规则同时作用在成百上千个点身上，随机数让它们各不相同。你并没有亲手画出这幅画，你只是定了几条简单规则，画面是这些规则自己「长」出来的——很多简单的东西凑在一起，冒出了单看一个点时完全想象不到的复杂图案，这个现象就叫「涌现」。

你拖动鼠标时发生了什么？你的手指坐标被程序读到，等于往画布里「注入」了一批新粒子，它们从你手指的位置诞生，再按既定规则四散开去。所以从点击到出结果的整条路是这样的：你的动作 → 浏览器读到坐标 → 下一帧循环里按规则更新每个粒子的位置 → 把它们画到画布 → 擦掉重来。这一整圈每秒跑 60 遍，全在本机完成，一个字节都不用发去服务器。

为什么它不需要服务器？因为这里没有「需要一台大机器去思考」的环节。AI 生成要在远端调用庞大的模型、烧显卡；而这张卡只是在做算术和画画，你口袋里的设备就绰绰有余。这也是理解「生成」最朴素的起点：先有「定规则、让规则自己长出结果」的直觉，日后再看 AI 生图、生视频，你就知道那不过是把「规则」换成了一个学过海量数据的模型。

### 🗺 架构流程图

```
[你拖动鼠标 / 手指]
      ↓
[浏览器读到你的坐标]
      ↓
[在该位置注入一批新粒子]
      ↓
[循环：给每个粒子加一点随机（方向/速度）]
      ↓
[按规则更新每个粒子的位置]
      ↓
[画到 Canvas 画布]
      ↓
[擦掉 → 下一帧重画 · 每秒约60次]
      ↺ 回到「更新位置」不停循环
─ 全程在你的设备完成 · 不联网 · 无服务器/显卡 ─
```

### 🎓 学到什么

- 随机数 + 循环 = 生成式动画（涌现的直觉）
- 每帧重画的心智模型（动画到底是什么）
- 改一个参数画面就变——参数化思维，是玩 AI 生成的地基

### 🔧 怎么复现

- 先玩本页的 playground（我们自建，纯前端 canvas，零依赖）
- 想自己写：打开 p5.js Web Editor，改 draw() 里的数字，实时看变化
- 做个粒子系统：用数组存很多“粒子对象”，每帧更新位置+画出来
- 进阶：p5.js + ml5.js 就能把动画接上 AI（姿态/声音控制），见 webcam-controller 卡

**要点：** 随机数 + 循环 = 生成式动画 · draw() 每帧重画的心智模型 · 改一个参数，画面就变

[▶ 去 playground](https://editor.p5js.org) · [源码/参考](https://github.com/processing/p5.js)

<details>
<summary><b>English</b></summary>

### 🎮 Experience

A few lines of creative code make particles and lines move at random — feel “code as paintbrush” for the first time. The playground on this page is our own: drag to draw, and switch to kaleidoscope mode.

### 🧠 How it works

Here's a counterintuitive fact: this card uses no AI model at all — no internet, no server, no graphics card. Every particle, line, and pattern you see is computed and drawn right here, on your own phone or computer, inside your browser, on the spot. It works even with the Wi-Fi off.

It runs on a craft called creative coding. Picture the canvas in your browser as a blackboard. The first thing the program does is wipe the whole board and repaint it every tiny fraction of a second — about 60 times per second. Your eye can't keep up with that erase-and-redraw, so it reads it as a smooth 'animation.' That's the whole trick behind animation: no magic, just a flipbook fast enough that you can't spot the seams.

The second key is 'random + loop.' The program doesn't tell each dot where to sit one by one. It writes one rule — say, 'make 500 dots, jitter each one's position, direction and speed a little, then step each forward.' The loop applies that rule to hundreds of dots at once; the randomness makes each one different. You didn't draw the picture by hand — you set a few simple rules and the picture 'grows' out of them. Many simple things together throw off a complexity no single dot could hint at. That phenomenon is called emergence.

What happens when you drag your finger? The program reads your finger's coordinates — that's you 'injecting' a fresh batch of particles, born at your fingertip and scattering off by the same rules. So the full path from action to result is: your motion → the browser reads the coordinates → the next frame's loop updates every particle's position by the rules → they're drawn to the canvas → wipe and start over. That whole loop runs 60 times a second, entirely on your device, without sending a single byte to a server.

Why does it need no server? Because there's no step here that requires a big machine to 'think.' AI generation calls a huge model far away and burns graphics cards; this card is just doing arithmetic and painting, and the device in your pocket is more than enough. It's also the plainest starting point for understanding 'generation': first get the intuition of 'set rules, let the rules grow the result,' and later, when you meet AI that makes images or video, you'll know it's just swapping the 'rules' for a model that has studied mountains of data.

### 🗺 How it flows

```
[you drag the mouse / finger]
      ↓
[browser reads your coordinates]
      ↓
[inject a batch of new particles there]
      ↓
[loop: give each particle a little randomness (dir/speed)]
      ↓
[update every particle's position by the rules]
      ↓
[draw onto the Canvas]
      ↓
[wipe → repaint the next frame · ~60x per second]
      ↺ back to "update position", looping forever
─ all on your own device · no internet · no server/GPU ─
```

### 🎓 What you learn

- Random + loop = generative animation (the intuition of emergence)
- The 'repaint every frame' model (what animation really is)
- Change one parameter, the picture changes — parametric thinking underlies AI generation

### 🔧 How to reproduce

- Play the playground on this page (ours, pure client-side canvas, zero dependencies)
- Write your own: open the p5.js Web Editor, tweak numbers in draw(), watch it change live
- Build a particle system: store many 'particle objects' in an array, update + draw each frame
- Go further: p5.js + ml5.js connects animation to AI (pose/sound control) — see the webcam-controller card

</details>

<details>
<summary><b>ภาษาไทย</b></summary>

### 🎮 ประสบการณ์

โค้ดสร้างสรรค์ไม่กี่บรรทัดทำให้อนุภาคและเส้นเคลื่อนไหวแบบสุ่ม — สัมผัส “โค้ดคือพู่กัน” เป็นครั้งแรก playground บนหน้านี้เราเขียนเอง: ลากเพื่อวาด และสลับไปโหมดคาไลโดสโคปได้

### 🧠 หลักการ

ข้อเท็จจริงที่ขัดสามัญสำนึก: การ์ดนี้ไม่ได้ใช้โมเดล AI เลย ไม่ต่ออินเทอร์เน็ต ไม่ใช้เซิร์ฟเวอร์ ไม่ใช้การ์ดจอ อนุภาค เส้น และลวดลายทุกอย่างที่คุณเห็น ถูกคำนวณและวาดขึ้นตรงนี้เลย บนมือถือหรือคอมพิวเตอร์ของคุณเอง ในเบราว์เซอร์ ณ ขณะนั้น ปิด Wi-Fi ก็ยังเล่นได้

มันทำงานด้วยศิลปะที่เรียกว่า creative coding ลองนึกภาพแคนวาสในเบราว์เซอร์เป็นกระดานดำ สิ่งแรกที่โปรแกรมทำคือลบทั้งกระดานแล้ววาดใหม่ทุกเสี้ยววินาที ประมาณ 60 ครั้งต่อวินาที ตาคุณตามการลบ-วาดที่เร็วขนาดนั้นไม่ทัน จึงเห็นเป็น 'แอนิเมชัน' ที่ลื่นไหล นี่คือความลับทั้งหมดของแอนิเมชัน ไม่มีเวทมนตร์ เป็นแค่ภาพพลิกที่เร็วจนคุณจับรอยต่อไม่ได้

กุญแจดอกที่สองคือ 'สุ่ม + วนลูป' โปรแกรมไม่ได้บอกทีละจุดว่าให้อยู่ตรงไหน แต่เขียนกฎข้อเดียว เช่น 'สร้าง 500 จุด ให้ตำแหน่ง ทิศทาง และความเร็วของแต่ละจุดสั่นสุ่มนิดหน่อย แล้วก้าวไปข้างหน้า' ลูปทำให้กฎนี้ทำงานกับจุดหลายร้อยพร้อมกัน ความสุ่มทำให้แต่ละจุดต่างกัน คุณไม่ได้วาดภาพด้วยมือ คุณแค่ตั้งกฎง่าย ๆ ไม่กี่ข้อ แล้วภาพก็ 'งอก' ออกมาจากกฎเหล่านั้น ของง่าย ๆ หลายอย่างมารวมกันก่อให้เกิดความซับซ้อนที่มองจุดเดียวไม่มีทางเดา ปรากฏการณ์นี้เรียกว่า emergence (การเกิดขึ้นเอง)

เกิดอะไรขึ้นเมื่อคุณลากนิ้ว? โปรแกรมอ่านพิกัดนิ้วของคุณ เท่ากับคุณ 'ฉีด' อนุภาคชุดใหม่เข้าไป พวกมันเกิดที่ปลายนิ้วคุณแล้วกระจายออกตามกฎเดิม เส้นทางเต็มจากการกระทำถึงผลลัพธ์จึงเป็น: การขยับของคุณ → เบราว์เซอร์อ่านพิกัด → ลูปเฟรมถัดไปอัปเดตตำแหน่งทุกอนุภาคตามกฎ → วาดลงแคนวาส → ลบแล้วเริ่มใหม่ ลูปทั้งหมดนี้วิ่ง 60 ครั้งต่อวินาที บนเครื่องคุณล้วน ๆ ไม่ส่งข้อมูลแม้แต่ไบต์เดียวไปเซิร์ฟเวอร์

ทำไมถึงไม่ต้องใช้เซิร์ฟเวอร์? เพราะไม่มีขั้นตอนไหนที่ต้องให้เครื่องใหญ่ 'คิด' การสร้างด้วย AI ต้องเรียกโมเดลมหึมาจากที่ไกล ๆ และเผาการ์ดจอ แต่การ์ดนี้แค่ทำเลขและวาดภาพ อุปกรณ์ในกระเป๋าคุณก็เหลือเฟือ นี่ยังเป็นจุดเริ่มต้นที่เรียบง่ายที่สุดในการเข้าใจคำว่า 'generation': ก่อนอื่นสร้างสัญชาตญาณ 'ตั้งกฎ แล้วปล่อยให้กฎงอกผลลัพธ์เอง' ภายหลังเมื่อเจอ AI ที่สร้างภาพหรือวิดีโอ คุณจะรู้ว่ามันแค่เปลี่ยน 'กฎ' เป็นโมเดลที่ศึกษาข้อมูลกองมหาศาลมาแล้ว

### 🗺 แผนผังการทำงาน

```
[คุณลากเมาส์ / นิ้ว]
      ↓
[เบราว์เซอร์อ่านพิกัดของคุณ]
      ↓
[ฉีดอนุภาคชุดใหม่ตรงตำแหน่งนั้น]
      ↓
[ลูป: ให้แต่ละอนุภาคสุ่มนิดหน่อย (ทิศ/ความเร็ว)]
      ↓
[อัปเดตตำแหน่งทุกอนุภาคตามกฎ]
      ↓
[วาดลงบน Canvas]
      ↓
[ลบ → วาดเฟรมใหม่ · ~60 ครั้ง/วินาที]
      ↺ กลับไป "อัปเดตตำแหน่ง" วนไม่หยุด
─ ทั้งหมดบนเครื่องคุณเอง · ไม่ต่อเน็ต · ไม่ใช้เซิร์ฟเวอร์/GPU ─
```

### 🎓 สิ่งที่ได้เรียนรู้

- สุ่ม + ลูป = แอนิเมชันเชิงกำเนิด (สัญชาตญาณของการเกิดขึ้นเอง)
- โมเดล 'วาดใหม่ทุกเฟรม' (แอนิเมชันคืออะไรจริง ๆ)
- เปลี่ยนพารามิเตอร์เดียว ภาพก็เปลี่ยน — คิดแบบพารามิเตอร์คือรากฐานของการสร้างด้วย AI

### 🔧 วิธีทำซ้ำ

- เล่น playground บนหน้านี้ (ของเรา แคนวาสฝั่งไคลเอนต์ล้วน ไม่มี dependency)
- เขียนเอง: เปิด p5.js Web Editor ปรับตัวเลขใน draw() ดูการเปลี่ยนแปลงสด
- สร้างระบบอนุภาค: เก็บ 'ออบเจกต์อนุภาค' หลายตัวใน array อัปเดต+วาดทุกเฟรม
- ไปต่อ: p5.js + ml5.js เชื่อมแอนิเมชันเข้ากับ AI (ควบคุมด้วยท่าทาง/เสียง) ดูการ์ด webcam-controller

</details>

---
*本文档由 `card.json` 生成 · slug: `particle-play` · 三语内容以 card.json 为准*
