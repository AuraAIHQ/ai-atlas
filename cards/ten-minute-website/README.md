# 十分钟上线你的 Airbnb 房源网站 · Your Airbnb listing site in 10 minutes

> ✨ 帮你完成一个想法 · 入门 · 适合：人人 / Airbnb 房东 · 🔗 外部 playground：https://aistudio.google.com（第三方托管，可用性以对方为准）

有一两间空房出租？房间、照片、评价、周边一页搞定，还能加预订。二维码印名片，客人自己看，不用一条条重发。

### 🎮 体验

有一两间空房出租？房间、照片、评价、周边、你对这座城市的理解，一页搞定，还能加预订。二维码印名片，客人自己看，不用一条条重发信息——顺便帮你记住域名、帮你宣传。

### 🧠 原理

这张卡和「给孩子办画展」那张，是同一套魔法：vibe coding——你不需要「会做网站」，只需要「会描述你想要什么」，写代码这件苦活交给 AI。

背后是跑在云端的大语言模型（LLM）。它在训练时吞下过海量的网页源码，所以你说人话，它就能还原成机器能跑的网页。你说：「做一个介绍我 Airbnb 房源的单页——顶部一张大图、下面是房间列表、住客评价、一张地图、还有一个预订按钮。」这句话会先被「分词器」切成一个个 token（词元）、变成数字送进模型；模型再一个 token 一个 token 地往外接龙，接出来的是一整套代码：HTML 负责内容、CSS 负责样式、JS 负责交互。

这张卡特别的地方，在于它用了像 E2B Fragments 这类工具，比单纯生成代码多做了一步：它不只把代码「写给你看」，而是马上把这段代码丢进一个「安全沙箱」里当场运行。沙箱你可以理解成一间隔离的小实验室——代码在里面跑，就算写错了也弄不坏你的电脑、碰不到别的东西。好处是你几乎立刻就能看到真实页面长什么样，然后继续用嘴微调：「把预订按钮放大」「整体换成暖色调」「把评价挪到地图上面」。你改一句，沙箱就刷新一次，真正的所见即所得。

页面满意之后就是「部署」：把代码上传到云端托管（比如 Cloudflare Pages 或 Vercel），你拿到一个正式网址。再用二维码生成器，把这个网址变成一个二维码印在名片上——客人扫一下，就能自己看你的房源、照片、评价、周边和你对这座城市的了解，你不用在聊天里一条条重发信息，二维码还顺手帮客人记住了你的域名。

一句话：AI 把过去「开发一个网站」那种又长又难的工程，压缩成了「对着它说话 + 随手微调」这么简单的一件事。

### 🗺 架构流程图

```
你的描述(「Airbnb 单页：大图+房间+评价+地图+预订按钮」)
   ↓ 分词器切成 token → 数字
   ↓ 发到云端大模型(LLM)
模型逐 token 生成网页代码(HTML/CSS/JS)
   ↓ 代码丢进安全沙箱(如 E2B Fragments)当场运行
你立刻看到真实页面
   ↓ 用嘴微调(「按钮放大/换暖色/评价挪上面」)
沙箱即时刷新 → 所见即所得
   ↓ 满意后部署到云端(Cloudflare Pages / Vercel)
拿到正式网址
   ↓ 网址 → 生成二维码 → 印名片
客人扫码自己看房源
```

### 🎓 学到什么

- 把“介绍自己/生意”结构化成一个页面（信息架构的直觉）
- 用自然语言迭代 UI：一次改一个地方，越改越合意
- 上线的完整链路：生成→预览→部署→域名→二维码

### 🔧 怎么复现

- 最快（无代码）：Google AI Studio → Build，一句话描述房源单页，替换照片文案
- 边生成边运行：clone e2b-dev/fragments（开源版 v0），配 LLM key 本地玩
- 加预订：接一个表单/预订服务，或嵌入第三方组件
- 上线+二维码：部署 Cloudflare Pages/Vercel 拿网址，用二维码生成器印名片

**要点：** 把“介绍自己”结构化成一个页面 · 一句话生成 → 你来改文案配图 · 部署上线 + 域名 + 二维码

[▶ 去 playground](https://aistudio.google.com) · [源码/参考](https://github.com/e2b-dev/fragments)

<details>
<summary><b>English</b></summary>

### 🎮 Experience

Got a spare room or two to rent? Rooms, photos, reviews, the neighborhood, your local knowledge — all on one page, with booking. Put the QR code on a card; guests browse it themselves instead of you re-sending info — and it helps them remember your domain.

### 🧠 How it works

This card runs on the same magic as the kids' art gallery: vibe coding — you don't need to 'build websites,' only to 'describe what you want,' and the grunt work of writing code goes to the AI.

Behind it is a large language model (LLM) running in the cloud. During training it swallowed a huge amount of web source code, so when you speak plainly it can reconstruct a runnable web page. You say: 'Make a single page for my Airbnb listing — a big hero image up top, then a room list, guest reviews, a map, and a booking button.' That sentence is first chopped by the 'tokenizer' into tokens, turned into numbers, and fed to the model; the model then plays word-chain one token at a time, and out comes a full set of code: HTML for content, CSS for styling, JS for interaction.

What's special here is that it uses a tool like E2B Fragments, which does one extra step beyond just generating code: it doesn't only 'write the code for you to read,' it immediately drops that code into a 'safe sandbox' and runs it on the spot. Think of the sandbox as an isolated little lab — the code runs inside, and even if it's wrong it can't damage your computer or touch anything else. The payoff is you see the real page almost instantly, then keep fine-tuning by voice: 'make the booking button bigger,' 'switch to warm colors,' 'move the reviews above the map.' Each time you speak, the sandbox refreshes — true what-you-see-is-what-you-get.

Once you're happy, comes 'deployment': the code is uploaded to cloud hosting (like Cloudflare Pages or Vercel) and you get a real URL. Then a QR-code generator turns that URL into a QR code you print on a card — guests scan it and browse your listing, photos, reviews, the neighborhood and your local knowledge themselves, so you don't have to re-send info message by message; the QR code also helps them remember your domain.

In one line: AI compresses what used to be the long, hard project of 'developing a website' into something as simple as 'talking to it + tweaking on the fly.'

### 🗺 How it flows

```
Your description ("Airbnb single page: hero image + rooms + reviews + map + booking button")
   ↓ tokenizer splits into tokens → numbers
   ↓ sent to cloud LLM
model generates web code token by token (HTML/CSS/JS)
   ↓ code dropped into a safe sandbox (e.g. E2B Fragments) and run on the spot
you instantly see the real page
   ↓ fine-tune by voice ("bigger button / warm colors / reviews above map")
sandbox refreshes instantly → what-you-see-is-what-you-get
   ↓ happy? deploy to the cloud (Cloudflare Pages / Vercel)
get a real URL
   ↓ URL → generate a QR code → print on a card
guests scan and browse the listing themselves
```

### 🎓 What you learn

- Structure 'introducing yourself/your business' into a page (information-architecture intuition)
- Iterate UI in plain language: change one thing at a time
- The full go-live path: generate → preview → deploy → domain → QR code

### 🔧 How to reproduce

- Fastest (no code): Google AI Studio → Build, describe the listing page, swap in your photos/copy
- Generate-and-run: clone e2b-dev/fragments (open-source v0), add an LLM key, play locally
- Add booking: wire a form/booking service or embed a third-party widget
- Ship + QR: deploy to Cloudflare Pages/Vercel for a URL, turn it into a QR code for your card

</details>

<details>
<summary><b>ภาษาไทย</b></summary>

### 🎮 ประสบการณ์

มีห้องว่างสักหนึ่งสองห้องให้เช่า? ห้อง รูป รีวิว ย่าน และความรู้ท้องถิ่นของคุณ อยู่ในหน้าเดียว พร้อมจอง ใส่ QR code บนนามบัตร แขกดูเองไม่ต้องส่งข้อมูลซ้ำ ๆ และช่วยให้จำโดเมนคุณได้

### 🧠 หลักการ

การ์ดใบนี้ใช้เวทมนตร์เดียวกับการ์ด 'จัดนิทรรศการภาพวาดให้ลูก': vibe coding — คุณไม่ต้อง 'ทำเว็บเป็น' แค่ 'บรรยายสิ่งที่ต้องการ' ส่วนงานหนักอย่างการเขียนโค้ดยกให้ AI

เบื้องหลังคือโมเดลภาษาขนาดใหญ่ (LLM) ที่รันบนคลาวด์ ตอนเทรนมันกลืนซอร์สโค้ดเว็บมามหาศาล พอคุณพูดภาษาคน มันจึงประกอบกลับเป็นหน้าเว็บที่รันได้ คุณพูดว่า: 'ทำหน้าเดียวแนะนำที่พัก Airbnb ของฉัน — รูปใหญ่ด้านบน ตามด้วยรายการห้อง รีวิวจากผู้เข้าพัก แผนที่ และปุ่มจอง' ประโยคนี้ถูก 'tokenizer' หั่นเป็น token ก่อน แปลงเป็นตัวเลขป้อนเข้าโมเดล จากนั้นโมเดลต่อคำทีละ token ออกมาเป็นโค้ดครบชุด: HTML สำหรับเนื้อหา, CSS สำหรับสไตล์, JS สำหรับการโต้ตอบ

จุดพิเศษของการ์ดนี้คือมันใช้เครื่องมืออย่าง E2B Fragments ซึ่งทำเพิ่มอีกหนึ่งขั้นจากการสร้างโค้ดเฉย ๆ: มันไม่ได้แค่ 'เขียนโค้ดให้คุณดู' แต่โยนโค้ดเข้าไปใน 'แซนด์บ็อกซ์ที่ปลอดภัย' แล้วรันทันที แซนด์บ็อกซ์เปรียบเหมือนห้องแล็บเล็กที่แยกออกมา — โค้ดรันข้างใน ต่อให้ผิดก็ทำอันตรายคอมพิวเตอร์คุณไม่ได้ ข้อดีคือคุณเห็นหน้าเว็บจริงเกือบทันที แล้วปรับต่อด้วยปาก: 'ทำปุ่มจองให้ใหญ่ขึ้น', 'เปลี่ยนเป็นโทนสีอุ่น', 'ย้ายรีวิวไปไว้เหนือแผนที่' พูดหนึ่งครั้ง แซนด์บ็อกซ์รีเฟรชหนึ่งครั้ง เห็นอย่างไรได้อย่างนั้นจริง ๆ

พอพอใจแล้วก็ถึง 'deploy': อัปโหลดโค้ดไปยังโฮสต์บนคลาวด์ (เช่น Cloudflare Pages หรือ Vercel) แล้วได้ URL จริง จากนั้นใช้ตัวสร้าง QR code แปลง URL เป็น QR code พิมพ์ลงนามบัตร — แขกสแกนแล้วดูที่พัก รูป รีวิว ย่าน และความรู้ท้องถิ่นของคุณได้เอง ไม่ต้องส่งข้อมูลซ้ำ ๆ ทีละข้อความ QR code ยังช่วยให้แขกจำโดเมนของคุณได้ด้วย

สรุปสั้น ๆ: AI ย่อโปรเจกต์ 'พัฒนาเว็บ' ที่เคยยาวและยาก ให้เหลือแค่ 'พูดกับมัน + ปรับนิด ๆ หน่อย ๆ' เท่านั้นเอง

### 🗺 แผนผังการทำงาน

```
คำบรรยายของคุณ ("หน้าเดียว Airbnb: รูปใหญ่ + ห้อง + รีวิว + แผนที่ + ปุ่มจอง")
   ↓ tokenizer หั่นเป็น token → ตัวเลข
   ↓ ส่งไปยัง LLM บนคลาวด์
โมเดลสร้างโค้ดเว็บทีละ token (HTML/CSS/JS)
   ↓ โยนโค้ดเข้าแซนด์บ็อกซ์ที่ปลอดภัย (เช่น E2B Fragments) แล้วรันทันที
คุณเห็นหน้าเว็บจริงทันที
   ↓ ปรับด้วยปาก ("ปุ่มใหญ่ขึ้น / สีอุ่น / ย้ายรีวิวขึ้นบน")
แซนด์บ็อกซ์รีเฟรชทันที → เห็นอย่างไรได้อย่างนั้น
   ↓ พอใจแล้ว deploy ไปคลาวด์ (Cloudflare Pages / Vercel)
ได้ URL จริง
   ↓ URL → สร้าง QR code → พิมพ์ลงนามบัตร
แขกสแกนแล้วดูที่พักได้เอง
```

### 🎓 สิ่งที่ได้เรียนรู้

- จัด 'การแนะนำตัว/ธุรกิจ' ให้เป็นหน้า (สัญชาตญาณสถาปัตยกรรมข้อมูล)
- ปรับ UI ด้วยภาษาพูด: เปลี่ยนทีละอย่าง
- เส้นทางขึ้นจริงครบ: สร้าง → พรีวิว → ดีพลอย → โดเมน → QR code

### 🔧 วิธีทำซ้ำ

- เร็วที่สุด (ไม่โค้ด): Google AI Studio → Build บรรยายหน้าที่พัก แล้วสลับรูป/ข้อความ
- สร้างแล้วรัน: clone e2b-dev/fragments (v0 โอเพนซอร์ส) ใส่ LLM key เล่นในเครื่อง
- เพิ่มการจอง: ต่อฟอร์ม/บริการจอง หรือฝังวิดเจ็ตภายนอก
- ปล่อย + QR: ดีพลอย Cloudflare Pages/Vercel ได้ URL แล้วทำ QR code ใส่นามบัตร

</details>

---
*本文档由 `card.json` 生成 · slug: `ten-minute-website` · 三语内容以 card.json 为准*
