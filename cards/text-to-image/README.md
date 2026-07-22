# 一句话变一张图 · A sentence becomes an image

> 🎨 涂鸦成画 · 入门 · 适合：人人 · 🟢 自建 playground（我们自己的后端 / 你的浏览器里跑，不依赖第三方）

输入一句话，AI 当场生成一张图 —— 这张卡的 playground 是我们自己搭的，出图按 token 计量。

### 🎮 体验

输入一句话，AI 当场把它变成一张图。这张卡的 playground 是「我们自己搭的」（跑在我们自己的 GPU 上），出图按 token 计量——所以它是我们自己的，不是外链。

### 🧠 原理

你在网页输入框里敲下一句话，比如「一只戴宇航头盔的柯基坐在月球上」，然后点「生成」。接下来发生的事，像一条流水线。

第一步，这句话从你的浏览器出发，跑到我们架在 Cloudflare 上的一个「门房」程序（我们叫它 Worker，地址是 /api/play）。门房不干画画的活，它只做两件事：查你的积分钱包够不够、够就放行。这一步很快，因为它只是查账。

放行之后，你的句子被转交给真正干活的地方——我们部署在 Modal 上的一块 A10G 显卡。Modal 是一个「用完即走」的云端 GPU 平台，机房在美国。平时没人用的时候，这块显卡是关着的（省钱，一分钱不花）；一有请求，它几秒内被叫醒。这块显卡上跑着一个叫 SD-Turbo 的扩散模型——请记住：代码和模型都在我们租的这台远程机器上跑，不在你的手机或电脑里。

那模型怎么「读懂」你那句中文或英文？它其实看不懂文字，得先翻译成数字。第一棒交给一个叫 CLIP 文本编码器的部件：它把你的句子切成一个个「词块」（token），再把每个词块变成一串数字（向量）。你可以把这串数字想成「这句话的意思坐标」——意思相近的话，坐标也接近。

第二棒是主角 UNet。它从「一整张电视雪花点」（纯噪声）出发，一边参照刚才那串意思坐标，一边把雪花一点点擦掉、显出形状，这就叫「去噪」。普通扩散模型要几十步，SD-Turbo 经过特训，1 到 2 步就够，所以快。

最后一棒是 VAE 解码器，它把 UNet 算出来的「压缩草稿」还原成一张真正的、由像素组成的图片。

图画好后，它被打包成一段叫 base64 的文字串（图片的文字化身），顺原路传回你的浏览器显示出来。与此同时，门房按这次显卡实际忙了多少秒，从你钱包里扣掉相应积分——干得多、扣得多。整条链路：你点击 → 门房查账 → 远程显卡唤醒 → CLIP 编码 → UNet 去噪 → VAE 出图 → 传回浏览器 → 按秒计费。这就是一套完全自建、能计量的出图后端。

### 🗺 架构流程图

```
[你的浏览器: 输入文字]
        ↓
[Cloudflare Worker /api/play: 查积分钱包]
        ↓ 够 → 放行
[Modal Serverless GPU (美国 A10G): 闲时关闭, 有请求秒级唤醒]
        ↓
[CLIP 文本编码器: 句子 → token → 意思向量]
        ↓
[UNet: 纯噪声 --去噪 1~2 步--> 图像草稿]
        ↓
[VAE 解码器: 草稿 → 像素图片]
        ↓
[图片(base64) 传回浏览器 + 按 GPU 耗时扣积分]
```

### 🎓 学到什么

- 文生图 = 噪声 → 去噪 → 成图（扩散的直觉）
- prompt 的具体程度决定可控程度
- 自建推理 + token 计量是怎么跑起来的

### 🔧 怎么复现

- 最快：直接用本页 playground（我们自建）出图
- 看模型：SD-Turbo（stabilityai/sd-turbo），diffusers 几行就能跑
- 自建后端：把模型部署到 Modal serverless GPU，套一个鉴权 web endpoint
- 计量：用一个钱包记 token，成功出图才扣费（见 /api/play）

**要点：** 文生图：从噪声一步步去噪成图 · prompt 越具体越可控 · 这就是我们自建、可计量的出图后端

[▶ 去 playground](/play/text-to-image) · [源码/参考](https://github.com/huggingface/diffusers)

<details>
<summary><b>English</b></summary>

### 🎮 Experience

Type a sentence and AI turns it into an image on the spot. This card's playground is our own (running on our own GPU), metered by tokens — truly ours, not an external link.

### 🧠 How it works

You type a sentence into the box on the web page — say, 'a corgi in an astronaut helmet sitting on the moon' — and hit Generate. What happens next is like an assembly line.

First, your sentence leaves your browser and travels to a little 'doorman' program we run on Cloudflare (we call it a Worker, at the address /api/play). The doorman doesn't paint; it does two things only: check whether your token wallet has enough balance, and if so, let the request through. This is fast — it's just checking an account.

Once cleared, your sentence is handed to the place that does the real work: an A10G GPU we've deployed on Modal. Modal is a 'use-it-and-leave' cloud GPU platform, with data centers in the US. When nobody's using it, that GPU is switched off (saving money — it costs nothing); the moment a request arrives, it wakes up within seconds. On that GPU runs a diffusion model called SD-Turbo — remember, the code and the model both run on that remote machine we rent, not on your phone or computer.

So how does the model 'read' your Chinese or English sentence? It can't actually read text; it must first turn it into numbers. The first leg goes to a part called the CLIP text encoder: it chops your sentence into 'tokens' and turns each token into a string of numbers (a vector). Think of that string as 'the meaning-coordinates of your sentence' — sentences with similar meaning land at nearby coordinates.

The second leg is the star, UNet. It starts from 'a full screen of TV static' (pure noise) and, guided by those meaning-coordinates, wipes the static away bit by bit until a shape emerges — this is 'denoising.' Ordinary diffusion models take dozens of steps; SD-Turbo is specially trained to need just 1 or 2, which is why it's fast.

The final leg is the VAE decoder, which restores UNet's 'compressed draft' into a real image made of pixels.

Once painted, the image is packed into a text string called base64 (a text stand-in for the picture) and sent back the same way to your browser to display. Meanwhile, the doorman deducts tokens from your wallet based on how many seconds the GPU was actually busy — more work, more cost. The whole chain: you click → doorman checks the account → remote GPU wakes → CLIP encodes → UNet denoises → VAE outputs the image → sent back to the browser → billed by the second. That's a fully self-built, meterable image backend.

### 🗺 How it flows

```
[Your browser: type text]
        ↓
[Cloudflare Worker /api/play: check token wallet]
        ↓ enough → pass
[Modal serverless GPU (US, A10G): off when idle, wakes in seconds]
        ↓
[CLIP text encoder: sentence → tokens → meaning vector]
        ↓
[UNet: pure noise --denoise 1-2 steps--> image draft]
        ↓
[VAE decoder: draft → pixel image]
        ↓
[image (base64) back to browser + charge by GPU time]
```

### 🎓 What you learn

- Text-to-image = noise -> denoise -> image (the diffusion intuition)
- Prompt specificity determines control
- How self-hosted inference + token metering actually runs

### 🔧 How to reproduce

- Fastest: use the playground on this page (ours)
- See the model: SD-Turbo, a few lines with diffusers
- Self-host: deploy on Modal serverless GPU behind an authed endpoint
- Metering: a wallet tracks tokens; charge only on success (see /api/play)

</details>

<details>
<summary><b>ภาษาไทย</b></summary>

### 🎮 ประสบการณ์

พิมพ์ประโยคหนึ่ง AI เปลี่ยนเป็นภาพทันที playground ของการ์ดนี้เราสร้างเอง (รันบน GPU ของเราเอง) คิดค่าตามโทเคน จึงเป็นของเราจริง ๆ

### 🧠 หลักการ

คุณพิมพ์ประโยคหนึ่งลงในช่องบนหน้าเว็บ เช่น 'คอร์กี้ใส่หมวกนักบินอวกาศนั่งอยู่บนดวงจันทร์' แล้วกด Generate สิ่งที่เกิดขึ้นต่อไปเหมือนสายพานการผลิต

อย่างแรก ประโยคของคุณออกจากเบราว์เซอร์ วิ่งไปยังโปรแกรม 'คนเฝ้าประตู' ที่เรารันบน Cloudflare (เราเรียกมันว่า Worker อยู่ที่ /api/play) คนเฝ้าประตูไม่ได้วาดรูป มันทำแค่สองอย่าง: ตรวจว่ากระเป๋าโทเคนของคุณมีพอไหม ถ้าพอก็ปล่อยผ่าน ขั้นนี้เร็วมากเพราะแค่เช็คบัญชี

เมื่อผ่านแล้ว ประโยคของคุณถูกส่งต่อไปยังที่ที่ทำงานจริง: การ์ดจอ A10G ที่เราดีพลอยบน Modal — แพลตฟอร์ม GPU บนคลาวด์แบบ 'ใช้เสร็จแล้วปิด' ศูนย์ข้อมูลอยู่ที่สหรัฐฯ ตอนไม่มีใครใช้ การ์ดจอนี้ถูกปิดอยู่ (ประหยัด ไม่เสียเงินเลย) พอมีคำขอเข้ามา มันตื่นภายในไม่กี่วินาที บนการ์ดจอนี้รันโมเดล diffusion ชื่อ SD-Turbo — จำไว้ว่าโค้ดและโมเดลรันอยู่บนเครื่องระยะไกลที่เราเช่า ไม่ได้อยู่ในมือถือหรือคอมพิวเตอร์ของคุณ

แล้วโมเดล 'อ่าน' ประโยคของคุณได้อย่างไร? จริง ๆ มันอ่านตัวอักษรไม่ได้ ต้องแปลงเป็นตัวเลขก่อน ไม้แรกส่งให้ส่วนที่ชื่อ CLIP text encoder: มันหั่นประโยคเป็น 'โทเคน' แล้วเปลี่ยนแต่ละโทเคนเป็นชุดตัวเลข (เวกเตอร์) ลองนึกว่าชุดตัวเลขนี้คือ 'พิกัดความหมายของประโยค' ประโยคที่ความหมายใกล้กันพิกัดก็อยู่ใกล้กัน

ไม้ที่สองคือพระเอก UNet มันเริ่มจาก 'จอเต็มไปด้วยหิมะทีวี' (สัญญาณรบกวนล้วน) แล้วอ้างอิงพิกัดความหมายนั้น ค่อย ๆ ลบหิมะออกทีละนิดจนรูปทรงปรากฏ นี่คือ 'การลดรบกวน' โมเดล diffusion ทั่วไปใช้หลายสิบขั้น แต่ SD-Turbo ถูกฝึกพิเศษให้ใช้แค่ 1-2 ขั้น จึงเร็ว

ไม้สุดท้ายคือ VAE decoder ที่คืน 'ร่างที่ถูกบีบอัด' ของ UNet ให้กลายเป็นภาพจริงที่ประกอบด้วยพิกเซล

เมื่อวาดเสร็จ ภาพถูกแพ็คเป็นสายตัวอักษรชื่อ base64 (ตัวแทนภาพในรูปตัวอักษร) แล้วส่งกลับทางเดิมไปแสดงบนเบราว์เซอร์ พร้อมกันนั้น คนเฝ้าประตูหักโทเคนจากกระเป๋าตามจำนวนวินาทีที่ GPU ทำงานจริง — ทำมากหักมาก ทั้งสาย: คุณคลิก → คนเฝ้าประตูเช็คบัญชี → GPU ระยะไกลตื่น → CLIP เข้ารหัส → UNet ลดรบกวน → VAE ออกภาพ → ส่งกลับเบราว์เซอร์ → คิดเงินตามวินาที นี่คือแบ็กเอนด์สร้างภาพที่เราสร้างเองและวัดปริมาณได้ทั้งหมด

### 🗺 แผนผังการทำงาน

```
[เบราว์เซอร์: พิมพ์ข้อความ]
        ↓
[Cloudflare Worker /api/play: เช็คกระเป๋าโทเคน]
        ↓ พอ → ปล่อยผ่าน
[Modal serverless GPU (สหรัฐฯ, A10G): ปิดเมื่อว่าง ตื่นในไม่กี่วินาที]
        ↓
[CLIP text encoder: ประโยค → โทเคน → เวกเตอร์ความหมาย]
        ↓
[UNet: สัญญาณรบกวนล้วน --ลดรบกวน 1-2 ขั้น--> ร่างภาพ]
        ↓
[VAE decoder: ร่าง → ภาพพิกเซล]
        ↓
[ภาพ (base64) กลับไปเบราว์เซอร์ + คิดเงินตามเวลา GPU]
```

### 🎓 สิ่งที่ได้เรียนรู้

- text-to-image = สัญญาณรบกวน -> ลดรบกวน -> ภาพ
- ความเจาะจงของ prompt กำหนดการควบคุม
- การรันเอง + คิดค่าโทเคนทำงานอย่างไร

### 🔧 วิธีทำซ้ำ

- เร็วที่สุด: ใช้ playground บนหน้านี้
- ดูโมเดล: SD-Turbo ไม่กี่บรรทัดด้วย diffusers
- รันเอง: ดีพลอยบน Modal serverless GPU หลัง endpoint ที่ยืนยันตัวตน
- คิดค่า: กระเป๋าเก็บโทเคน หักเมื่อสำเร็จ (ดู /api/play)

</details>

---
*本文档由 `card.json` 生成 · slug: `text-to-image` · 三语内容以 card.json 为准*
