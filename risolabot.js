// 📦 Kutubxonalar
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { OpenAI } = require('openai');
const UserBot = require('./models/UserBot');

require('dotenv').config();

// 🔑 Sozlamalar
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const ADMIN_ID = 5174150715;
const userStates = new Map(); 
const COMPANY_LAT = 41.00491343939893;
const COMPANY_LNG = 71.68375613581506;

// 📦 MongoDB ulash
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 MongoDB ulanildi'))
  .catch(err => console.error('❌ MongoDB xatolik:', err.message));

// 📚 AI yordamchi
async function getAIResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
             role: 'system',
          content: `Siz Risola Travel Lux firmasining vakili sifatida foydalanuvchilarga ma'lumot beradigan administrator siz. Javoblaringiz har doim iliq, samimiy, tushunarli va ishonchli bo‘lishi kerak. O‘zbek tilida yozing, imloviy xatolarga yo‘l qo‘ymang. Siz hech qachon ellikboshi emassiz, balki faqat administrator sifatida gapirasiz. Savol bergan shaxs o‘rtacha 30-50 yoshdagi oddiy inson deb tasavvur qiling.
🌟 Paketlar:
1. 🌟"Risola" paket:
🕌 Madinada 3 yoki 4 kunduz turiladi  
- 3 mahal milliy taom beriladi  
- Mehmonxona Haramdan 150–200 metr uzoqlikda Saraya Harmony bo‘ladi  
🕋 Makkada esa:
- 10 kun turiladi  
- 3 mahal o‘zbek milliy taomlari  
- Mehmonxona Haramdan 1–1.5 km uzoqlikda joylashgan  Anan mexmonxonasi
💰 Narxi 1250$
📞 Batafsil ma’lumot uchun: +998781134444 +998777771616

2. 🌟"Oilaviy" paket:
🕌 Madinada  3 kunduz turiladi  
- 2 mahal milliy taom beriladi 
- Mehmonxona Haramdan 150–200 metr uzoqlikda Saraya Harmony bo‘ladi  
🕋 Makkada esa:
- 10 kun turiladi  
- 3 mahal o‘zbek milliy taomlari  
- Mehmonxona Haramdan 3–4 km uzoqlikda joylashgan Snood Marva 
💰 Narxi 1100$
📞 Batafsil ma’lumot uchun: +998781134444 +998777771616





📦 *Bizning xizmatlarimiz:*
- Litsenziyalangan umra hizmati №0008
- Saudya Arabistoni vizasi.
- Borish va kelish aviachiptasi.  
- Ikki Haramga yaqin va qulay mehmonxonalar.  
- Shifokor xizmati.  
- 3 mahal mazali turli milliy taomlar (taomlar mehmonxonada tayyorlanadi).  
- Ilmli va tajribali guruh rahbari.
- Madina va Makkada qo'shimcha ishchi guruhi xizmati. 
- Maxsus kiyim-bosh va sumka,beydjik,umra qo'llanmasi.
- Aeroportdan kuzatish, Madina va Makkada kutib olish. 
- Zamonaviy so'nggi  rusumdagi avtobus xizmati. 
- Makka va Madinada qo'shimcha ziyoratlar (Shahidlar qabristoni,
   Islom tarixida birinchi qurilgan masjid,10 000 sahoba dafn qilingan qabriston,
   Odam Alayhissalom va Momo Havo uchrashgan joy,Payg'ambarimiz berkingan g'or,
   Shaytonga tosh otiladigan joy va boshqa ziyoratgohlar).

✈️ Parvozlar(reyslar,reslar):
📍 To‘g‘ridan-to‘g‘ri reyslar orqali amalga oshiriladi:
➡️ Namangan ➝ Madina
⬅️ Madina ➝ Namangan

📅 Parvoz sanalari:
🗓 2-oktyabr
🗓 9-oktyabr
🗓 16-oktyabr
🗓 23-oktyabr
🗓 30-oktyabr
🗓 7-noyabr
🗓 14-noyabr
🗓 21-noyabr
🗓 28-noyabr


✈️ Parvozlar(reyslar,reslar):
📍 To‘g‘ridan-to‘g‘ri reyslar orqali amalga oshiriladi:
➡️ Toshkent ➝ Madina
⬅️ Madina ➝ Toshkent

📅 Parvoz sanalari:
🗓 6-oktyabr
🗓 13-oktyabr
🗓 20-oktyabr
🗓 27-oktyabr





Reyslar milliy aviakompaniya orqali amalga oshiriladi


Bizdagi barcha safarlar 14 kunlik agar mijoz 14 kunlikdan boshqa paketni so'rasa quydagi raqamlarga murojaat qilishni aytasan. 
Uchish va qaytish vaqtlari haqida so'rasa quyidagi raqamga murojaat qilishni aytasan.

 buni mijoz sorasa keyin bering agar soramasa indamang agar mijoz chegirma haqida sorasa @risola4444 akkauntiga murojaat qilishni so'rang

 Agar mijoz manzil haqida sorasa 📍 Manzil: Namangan shahri, Uychi ko'chasi 1-uy.\nMo'ljal: "Bahor" kinoteatri ro'parasida. ushbu bizning manzil 
 Agar guruh rahbarlar yoki ellikboshilar haqida so'rasa ellikboshilar O'zbekiston Musulmonlari idorasi tomonidan berilayotgani aytasan agar falonchi domla deb so'rab qolsa quyidagi raqamga murojaat qilishni aytasan.


 Har bir text tagida Risola bilan risoladagidek safar qiling! shu jumlani qo'shib ajralib turadigan qilib  qoraytirib yoz


 Iltimos, har bir javobingizda foydalanuvchiga mos, tushunarli tarzda ma’lumot bering va kiritilgan formatda bo'lsin.

 Agar mijoz gapini salom bilan boshlaydigan bolsa sen ham Assalomu Alaykum bilan boshla gapini agar mijoz salom bermay boshlasa ham gapini sen Assalomu Alaykum bilan boshla gapini

 Agar mijoz kril tilida yozsa krillda javob berilsin agar lotinda yozsa lotinda javob berilsin.

 Agar mijoz bo'lib to'lash haqida komentariya yozsa yoki shu mavzuda nimadir sorasa indama javob bermagin

 Agar mijoz katta skidkada oganla mi deyman shunday deb yozsa javob berma.



 Agar grupppa yoki kanal adminlari yozsa yoki video yokida rasm tashlasa shunchaki sukut saqla

 Agar bir user senga yana qayta yozsa yoki gurux yoki kanalda bir user qayta savol sorasa yokida fikr bidirsa unga yana qayta savol hamda salom berma va iloji borichia har bir usernni eslab qol va savoliga javob ber, yani bir user oldin yozgan bolsa uni savolini eslab qol yokida fikrini

 Agar mijoz senga kiritilgandan boshqa oylardagi parvoz sanalarini sorasa va mijoz soragan oydagi sanalar senga hali malum bolmasa har oyning payshanba kuniga reyslar bor Namangandan Madianaga togridan togri deb javob beraver.

 Agar mijoz diniy masalada yozsa mutaxasislardan so'ralsa yaxshi bolishii tavsiya qil.

 Agar guruh raxbarlari haqida sorasa gurux raxbarlari O'zbekiston musulmonlari  diniy idorasi tomonidan ajratilayotganini ma'lum qil.

 Agar voyaga yetmagan bolalarni umraga olib borish haqida so'rasa voyaga yetmaganlarga xizmat ko'rsata olmasligimizni aytib uzr so'ra qo'yasan.

 Agar Jamoldin domlani qachon umraga borishlari haqida so'rasa borish sanalari endi ma'lum bo'lishini aytasan Risolada ishlayabdilarmi deb so'rasa ishlayabdi deb javob qilasan 


 Agar boshqa viloyatlarda ofisimiz borligi haqida savol berilsa hozircha Namanganda yagona bosh ofisimiz bor deb javob qil.

 Agar Ishonch savdo turi orqali bo'lib to'lash haqida so'rasa quyidagi raqam bilan bog'lanishni aytasan. 

 Agar Madinada 4 kundan ko'p turish haqida so'rasa qyidagi raqam bilan bog'lanish haqida aytasan.

 Agar qizil dengiz Qur'on bosma xonasiga borish haqida sorasa dasturda yo'q ekanligini lekin ziyoratchilarni talabiga ko'ra bonus sifatida tashkil qilib berishimizni ma'lum qilasan.

 Agar xona joylashuvi haqida so'rasa 4 kishilik joylashuv ekanligini aytasan, alohida hona so'rasa qo'shimcha to'lov orqai tashkil qilib berishimizni ma'lum qilasan.

 Uchish va qaytish soatlari haqida so'rasa quyidagi raqamga murojaat qiling deysan.

 Agar O'zbekiton hududidan tashqaridagi mijozlar murojaat qilsa telegram usernamemimizni berasan..

 Agar mijoz emoji tashlasa yoki biror videoga emoji hamda reaksiya bildirsa emoji orqali javob bermaysan.

 Agar adminlar yoki guruh egasi kanal yoki guruhga video yoki post joylasa unga javob berma hamda reaksiya bildirma.

`


        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.6, // 0.6 – barqaror va mantiqli javoblar uchun ideal
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("❌ AI xatolik:", err.message);
    return "❗ Texnik nosozlik yuz berdi. Keyinroq urinib ko‘ring.";
  }
}


// 📩 Universal xabar yuborish
async function sendUniversalMessage(chatId, text, threadId = null, options = {}) {
  try {
    const sendOptions = { ...options };
    if (threadId) sendOptions.message_thread_id = threadId;
    await bot.sendMessage(chatId, text, sendOptions);
  } catch (err) {
    console.error("❌ Universal message yuborishda xato:", err.message);
  }
}

// 🟢 /start komandasi
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const keyboard = [
    [{ text: '📦 Xizmatlar', callback_data: 'xizmat' }],
    [{ text: '💳 Tariflar', callback_data: 'tariflar' }],
    [{ text: '🍽 Ovqatlar', callback_data: 'ovqat' }],
    [{ text: '🛏 Sharoitlar', callback_data: 'sharoit' }],
    [{ text: '📍 Manzil', callback_data: 'send_location' }],
    [{ text: '📞 Admin bilan bog‘lanish', callback_data: 'admin_contact' }]
  ];
  if (msg.from.id === ADMIN_ID) {
    keyboard.push([{ text: '🛠 Admin panel', callback_data: 'admin_panel' }]);
  }
  await bot.sendMessage(chatId, 'Assalomu alaykum! Bo‘limlardan birini tanlang:', {
    reply_markup: { inline_keyboard: keyboard }
  });
});

// 🔁 Bitta umumiy `message` handler
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase() || '';
  const { id, first_name, username } = msg.from;

  // 👥 Foydalanuvchini bazaga qo‘shish
  try {
    const exists = await UserBot.findOne({ userId: id });
    if (!exists) await UserBot.create({ userId: id, firstName: first_name, username });
  } catch (err) {
    console.error("❌ DB saqlash xato:", err.message);
  }

  // 🔄 Admin bilan bog‘lanish
  if (userStates.get(chatId) === 'admin_contact') {
    await bot.sendMessage(ADMIN_ID, `📩 Xabar: ${msg.text}\n👤 ID: ${chatId}`, {
      reply_markup: { inline_keyboard: [[{ text: '✉️ Javob yozish', callback_data: `reply_${chatId}` }]] }
    });
    await bot.sendMessage(chatId, '✅ Xabaringiz adminga yuborildi.');
    userStates.delete(chatId);
    return;
  }

  // 🔮 AI javobi (agar uzun matn bo‘lsa)
  if (text.length > 5) {
    const aiReply = await getAIResponse(text);
    await bot.sendMessage(chatId, aiReply);
  } else {
    await bot.sendMessage(chatId, "🤖 Qanday yordam bera olishim mumkin?");
  }
});

// 🟢 Kanalga yuborish komanda
bot.onText(/\/kanal/, async () => {
  await sendUniversalMessage("@mychannel", "📢 Salom kanal!");
});

// 🟢 Forumga yuborish komanda
bot.onText(/\/forum/, async (msg) => {
  if (msg.message_thread_id) {
    await sendUniversalMessage(msg.chat.id, "📢 Salom forum!", msg.message_thread_id);
  } else {
    await bot.sendMessage(msg.chat.id, "❗ Bu chat forum emas.");
  }
});

// 🔄 Callback query
bot.on('callback_query', async (query) => {
  const userId = query.from.id;
  const data = query.data;

  if (data === 'admin_contact') {
    userStates.set(userId, 'admin_contact');
    await bot.sendMessage(userId, "✍️ Xabaringizni yozing. Admin ko‘radi.");
  } 
  else if (data.startsWith('reply_') && userId === ADMIN_ID) {
    const targetId = data.split('_')[1];
    userStates.set(userId, `replying_to_${targetId}`);
    await bot.sendMessage(userId, "✍️ Javob yozing:");
  } 
  else if (data === 'send_location') {
    await bot.sendLocation(userId, COMPANY_LAT, COMPANY_LNG);
    await bot.sendMessage(userId, "📍 Manzil: Namangan shahri, Uychi ko‘chasi 1-uy.\nMo‘ljal: Bahor kinoteatri ro‘parasida.");
  }

  await bot.answerCallbackQuery(query.id);
});
