# 随身口语陪练 · A roleplay language tutor

> 💬 造个聊天助手 · 入门 · 适合：高中→大学 / 老师 · 🟢 自建 playground（我们自己的后端 / 你的浏览器里跑，不依赖第三方）

做一个会角色扮演的聊天机器人：它是巴黎咖啡馆服务员，只用简单法语跟你对话并纠错。

### 🎮 体验

做一个会角色扮演的聊天机器人：它是巴黎咖啡馆的服务员，只用简单法语跟你对话，还随时纠错。一个随身、不害羞、无限耐心的口语陪练。

### 🧠 原理

先说结论：这张卡里你没有训练任何 AI，也没写一行代码，你只是用一段话，给一个现成的大语言模型（LLM，比如 Google 的 Gemini）「安排了一个角色」。

先认识这个大模型。你可以把它想成一个读过几乎整个互联网的「语言超级模仿者」：海量的法语对话、菜单、小说、咖啡馆场景它都见过，所以它天生就会说法语，也大概知道「一个巴黎服务员」会怎么措辞、怎么招呼客人。它不住在你手机里，而是跑在 Google 云端的大机房。你每说一句，其实是通过网络把话发到远方那台超级计算机，它算完再把回复顺着网线送回来——你的手机只是个收发窗口。

魔法藏在对话最前面那段你看不见的「系统指令」（system prompt）。你写下：「你是巴黎咖啡馆的服务员，只用简单法语（A2 级别），我说错时先自然接话，再用括号温和纠正。」这段话就像导演递给演员的角色设定，模型会一直照着演。你把设定改一句，它立刻换一个人：面试官、导游、辩论对手都行。这就是「提示工程」——不动模型分毫，只把你想要的行为写清楚。

那它到底怎么「读懂」你的话？其实它并不认识整句中文或法语。它先用一个叫「分词器」（tokenizer）的部件，把你的话切成一小段一小段的「词元」（token）——有时一个词是一个 token，有时半个词就切一刀，比如「café」可能被切成「ca」和「fé」。每个 token 再变成一串数字。模型真正做的事，说穿了就是「超级接龙」：根据前面所有内容（包括那段人设和你刚说的话），一个 token 一个 token 地预测「下一个最该出现的词」，一路接出一串，再拼回人话，就是你看到的回复。它之所以会纠错，也只是因为你在剧本里让它这么做，于是它把「纠正」当成演出的一部分，自然地接着往下说。

一句话总结：你租用了一个云端的语言超级模仿者，用一段设定给它「穿上戏服」，它就成了你随身、不害羞、无限耐心的口语陪练。

### 🗺 架构流程图

```
你输入的法语句子
   ↓
[系统指令(人设) + 历史对话 + 你这句话] 一起打包
   ↓
经网络发到云端大模型(如 Gemini)
   ↓
分词器把文字切成 token → 变成数字
   ↓
模型逐个 token 预测「下一个词」 → 生成回复
   ↓
(按剧本)先自然回应，再用括号温和纠错
   ↓
回复经网络传回 → 显示在你屏幕上
   ↓
你再说下一句 → 循环(它始终记得那段人设)
```

### 🎓 学到什么

- system prompt 决定“人设”和规则（AI 的行为是写出来的）
- 如何让它纠错而不打断对话（先回应、再温和提示）
- 语言老师的减负用法：给每个学生一个专属陪练角色

### 🔧 怎么复现

- 最快：Google AI Studio，把上面那段“设定”粘进 system instruction，直接开聊
- 接进网页：用 Vercel AI SDK 的 useChat + streamText，几十行做个聊天页
- 换角色/语言只要改 system prompt：面试官、导游、辩论对手…
- 需要：一个 LLM（可接我们的体验卡 token）；纯前端做界面即可

**要点：** system prompt 决定“人设” · 如何让它纠错而不打断 · 语言老师的减负用法

[▶ 去 playground](/play/roleplay-tutor) · [源码/参考](https://github.com/vercel/ai)

<details>
<summary><b>English</b></summary>

### 🎮 Experience

Build a chatbot that role-plays: it's a Parisian café waiter, speaks only simple French with you, and corrects you as you go. A pocket speaking partner — patient, never judging.

### 🧠 How it works

Here's the punchline first: on this card you didn't train any AI, and you didn't write a single line of code — you just used a paragraph of plain language to 'assign a role' to an off-the-shelf large language model (an LLM, like Google's Gemini).

Meet the model first. Think of it as a 'language super-mimic' that has read almost the entire internet: mountains of French conversations, menus, novels and café scenes. So it already speaks French, and roughly knows how a Parisian waiter would phrase things and greet a customer. It doesn't live in your phone — it runs in Google's cloud data center. Every time you say something, your words travel over the network to that faraway supercomputer; it computes a reply and sends it back down the wire. Your phone is just the window.

The magic hides in an invisible 'system prompt' at the very front of the chat. You write: 'You are a waiter in a Parisian café, use only simple A2 French, and when I make a mistake, respond naturally first, then gently correct me in parentheses.' That paragraph is like the character brief a director hands an actor — the model stays in that role. Change one line and it becomes someone else: an interviewer, a tour guide, a debate partner. This is 'prompt engineering' — you touch nothing inside the model, you just write the behavior you want, clearly.

So how does it 'understand' you? It doesn't actually see whole Chinese or French sentences. First a part called the 'tokenizer' chops your words into little pieces called 'tokens' — sometimes a whole word is one token, sometimes half a word gets a cut (e.g. 'café' might split into 'ca' and 'fé'). Each token becomes a string of numbers. What the model really does is 'super autocomplete': based on everything so far (including the persona and what you just said), it predicts the next most likely token, one token at a time, then stitches them back into human language — that's the reply you see. It corrects you only because your script told it to; it treats 'correcting' as part of the performance and simply keeps going.

In one line: you rented a cloud-based language super-mimic and dressed it in a costume with a paragraph of setup — and it became your pocket speaking partner: always available, never shy, infinitely patient.

### 🗺 How it flows

```
Your French sentence
   ↓
[system prompt (persona) + chat history + your sentence] bundled together
   ↓
sent over the network to a cloud LLM (e.g. Gemini)
   ↓
tokenizer chops the text into tokens → turned into numbers
   ↓
model predicts the next token, one at a time → generates the reply
   ↓
(per the script) responds naturally first, then corrects in parentheses
   ↓
reply travels back over the network → shows on your screen
   ↓
you say the next line → loop (it always remembers the persona)
```

### 🎓 What you learn

- The system prompt sets the persona and rules (AI behavior is written)
- How to make it correct you without breaking the flow (respond first, then gently note)
- A teacher's time-saver: give every student a personal practice partner

### 🔧 How to reproduce

- Fastest: Google AI Studio — paste the 'setup' into the system instruction and start chatting
- Wire a web app: Vercel AI SDK's useChat + streamText, a chat page in a few dozen lines
- Swap role/language by editing the system prompt: interviewer, tour guide, debate partner…
- You need: an LLM (can run on your card tokens); the UI is pure front-end

</details>

<details>
<summary><b>ภาษาไทย</b></summary>

### 🎮 ประสบการณ์

สร้างแชตบอตที่สวมบทบาท: เป็นบริกรร้านกาแฟปารีส คุยกับคุณด้วยภาษาฝรั่งเศสง่าย ๆ และแก้ให้ทันที คู่ฝึกพูดพกพา อดทน ไม่ตัดสิน

### 🧠 หลักการ

สรุปก่อนเลย: การ์ดใบนี้คุณไม่ได้เทรน AI ใด ๆ และไม่ได้เขียนโค้ดสักบรรทัด คุณแค่ใช้ข้อความสั้น ๆ 'กำหนดบทบาท' ให้กับโมเดลภาษาขนาดใหญ่ (LLM เช่น Gemini ของ Google) ที่มีอยู่แล้ว

มารู้จักโมเดลก่อน คิดว่ามันเป็น 'นักเลียนแบบภาษาขั้นเทพ' ที่อ่านอินเทอร์เน็ตมาเกือบทั้งหมด: บทสนทนาภาษาฝรั่งเศส เมนู นิยาย ฉากร้านกาแฟมากมาย มันจึงพูดฝรั่งเศสได้เอง และพอรู้ว่าบริกรปารีสพูดจาอย่างไร ทักทายลูกค้าอย่างไร มันไม่ได้อยู่ในมือถือคุณ แต่รันอยู่ในศูนย์ข้อมูลคลาวด์ของ Google ทุกครั้งที่คุณพูด คำพูดจะวิ่งผ่านเครือข่ายไปยังซูเปอร์คอมพิวเตอร์ไกลโพ้น มันคำนวณคำตอบแล้วส่งกลับมา มือถือเป็นแค่หน้าต่างรับส่ง

เวทมนตร์ซ่อนอยู่ใน 'system prompt' ที่มองไม่เห็นตรงหน้าสุดของแชต คุณเขียนว่า: 'คุณเป็นบริกรร้านกาแฟปารีส ใช้ภาษาฝรั่งเศสง่าย ๆ ระดับ A2 เมื่อฉันพูดผิดให้ตอบอย่างเป็นธรรมชาติก่อน แล้วแก้เบา ๆ ในวงเล็บ' ข้อความนี้เหมือนบทที่ผู้กำกับยื่นให้นักแสดง โมเดลจะอยู่ในบทบาทนั้นตลอด แก้บรรทัดเดียวมันก็กลายเป็นคนอื่น: ผู้สัมภาษณ์ ไกด์ คู่โต้วาที นี่คือ 'prompt engineering' — ไม่แตะข้างในโมเดลเลย แค่เขียนพฤติกรรมที่ต้องการให้ชัด

แล้วมัน 'เข้าใจ' คำพูดคุณได้อย่างไร? จริง ๆ มันไม่ได้เห็นทั้งประโยค ก่อนอื่นส่วนที่เรียกว่า 'tokenizer' จะหั่นคำพูดเป็นชิ้นเล็ก ๆ เรียกว่า 'token' — บางทีหนึ่งคำเป็นหนึ่ง token บางทีครึ่งคำก็ถูกหั่น (เช่น 'café' อาจถูกแยกเป็น 'ca' กับ 'fé') แต่ละ token แปลงเป็นชุดตัวเลข สิ่งที่โมเดลทำจริง ๆ คือ 'ต่อคำขั้นเทพ': จากทุกอย่างก่อนหน้า (รวมถึงบทบาทและสิ่งที่คุณเพิ่งพูด) มันทำนาย token ถัดไปที่น่าจะเป็นมากที่สุด ทีละ token แล้วต่อกลับเป็นภาษาคน นั่นคือคำตอบที่คุณเห็น มันแก้ให้คุณก็เพราะบทบอกไว้ มันถือว่า 'การแก้' เป็นส่วนหนึ่งของการแสดงและเล่นต่อไป

สรุปสั้น ๆ: คุณเช่านักเลียนแบบภาษาขั้นเทพบนคลาวด์ แล้วสวม 'ชุดแสดง' ให้มันด้วยข้อความตั้งค่า มันก็กลายเป็นคู่ฝึกพูดพกพาที่พร้อมเสมอ ไม่อาย และอดทนไม่จำกัด

### 🗺 แผนผังการทำงาน

```
ประโยคภาษาฝรั่งเศสของคุณ
   ↓
[system prompt (บทบาท) + ประวัติแชต + ประโยคของคุณ] รวมเป็นชุดเดียว
   ↓
ส่งผ่านเครือข่ายไปยัง LLM บนคลาวด์ (เช่น Gemini)
   ↓
tokenizer หั่นข้อความเป็น token → แปลงเป็นตัวเลข
   ↓
โมเดลทำนาย token ถัดไปทีละตัว → สร้างคำตอบ
   ↓
(ตามบท) ตอบอย่างเป็นธรรมชาติก่อน แล้วแก้ในวงเล็บ
   ↓
คำตอบวิ่งกลับผ่านเครือข่าย → แสดงบนจอคุณ
   ↓
คุณพูดประโยคถัดไป → วนซ้ำ (มันจำบทบาทไว้เสมอ)
```

### 🎓 สิ่งที่ได้เรียนรู้

- system prompt กำหนดบุคลิกและกฎ (พฤติกรรม AI ถูกเขียนขึ้น)
- ทำให้มันแก้โดยไม่ขัดจังหวะ (ตอบก่อน แล้วค่อยเตือนเบา ๆ)
- ตัวช่วยของครู: ให้นักเรียนทุกคนมีคู่ฝึกส่วนตัว

### 🔧 วิธีทำซ้ำ

- เร็วที่สุด: Google AI Studio วาง 'การตั้งค่า' ลงใน system instruction แล้วเริ่มคุย
- ต่อเว็บ: Vercel AI SDK useChat + streamText ทำหน้าแชตในไม่กี่สิบบรรทัด
- เปลี่ยนบทบาท/ภาษาแค่แก้ system prompt: ผู้สัมภาษณ์ ไกด์ คู่โต้วาที…
- ต้องมี: LLM (ใช้โทเคนบัตรของเราได้) ส่วนหน้าเป็นฝั่งไคลเอนต์ล้วน

</details>

---
*本文档由 `card.json` 生成 · slug: `roleplay-tutor` · 三语内容以 card.json 为准*
