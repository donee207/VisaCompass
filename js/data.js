/* AVTOMATIK YARATILGAN — data/data.json dan nusxa. Tahrirlamang. */
window.VISA_DATA = {
  "meta": {
    "name": "VisaCompass",
    "updated": "2026-10",
    "statuses": {
      "free": "visa-free entry",
      "eta": "electronic travel authorisation (ESTA, ETA, K-ETA, eTA)",
      "voa": "visa on arrival",
      "evisa": "online electronic visa",
      "visa": "regular visa via embassy or visa centre"
    },
    "rule_format": "PASSPORT:status[level 1-5], '*' = all other passports"
  },

  "countries": {
    "UZ": { "flag": "🇺🇿", "uz": "O'zbekiston", "en": "Uzbekistan", "ru": "Узбекистан" },
    "KZ": { "flag": "🇰🇿", "uz": "Qozog'iston", "en": "Kazakhstan", "ru": "Казахстан" },
    "KG": { "flag": "🇰🇬", "uz": "Qirg'iziston", "en": "Kyrgyzstan", "ru": "Киргизия" },
    "TJ": { "flag": "🇹🇯", "uz": "Tojikiston", "en": "Tajikistan", "ru": "Таджикистан" },
    "TM": { "flag": "🇹🇲", "uz": "Turkmaniston", "en": "Turkmenistan", "ru": "Туркменистан" },
    "RU": { "flag": "🇷🇺", "uz": "Rossiya", "en": "Russia", "ru": "Россия" },
    "TR": { "flag": "🇹🇷", "uz": "Turkiya", "en": "Türkiye", "ru": "Турция" },
    "US": { "flag": "🇺🇸", "uz": "AQSH", "en": "United States", "ru": "США" },
    "GB": { "flag": "🇬🇧", "uz": "Buyuk Britaniya", "en": "United Kingdom", "ru": "Великобритания" },
    "DE": { "flag": "🇩🇪", "uz": "Germaniya", "en": "Germany", "ru": "Германия" },
    "FR": { "flag": "🇫🇷", "uz": "Fransiya", "en": "France", "ru": "Франция" },
    "IT": { "flag": "🇮🇹", "uz": "Italiya", "en": "Italy", "ru": "Италия" },
    "ES": { "flag": "🇪🇸", "uz": "Ispaniya", "en": "Spain", "ru": "Испания" },
    "CN": { "flag": "🇨🇳", "uz": "Xitoy", "en": "China", "ru": "Китай" },
    "IN": { "flag": "🇮🇳", "uz": "Hindiston", "en": "India", "ru": "Индия" },
    "JP": { "flag": "🇯🇵", "uz": "Yaponiya", "en": "Japan", "ru": "Япония" },
    "KR": { "flag": "🇰🇷", "uz": "Janubiy Koreya", "en": "South Korea", "ru": "Южная Корея" },
    "AE": { "flag": "🇦🇪", "uz": "BAA (Dubay)", "en": "UAE (Dubai)", "ru": "ОАЭ (Дубай)" },
    "CA": { "flag": "🇨🇦", "uz": "Kanada", "en": "Canada", "ru": "Канада" },
    "AU": { "flag": "🇦🇺", "uz": "Avstraliya", "en": "Australia", "ru": "Австралия" },
    "TH": { "flag": "🇹🇭", "uz": "Tailand", "en": "Thailand", "ru": "Таиланд" },
    "MY": { "flag": "🇲🇾", "uz": "Malayziya", "en": "Malaysia", "ru": "Малайзия" },
    "GE": { "flag": "🇬🇪", "uz": "Gruziya", "en": "Georgia", "ru": "Грузия" },
    "EG": { "flag": "🇪🇬", "uz": "Misr", "en": "Egypt", "ru": "Египет" },
    "SA": { "flag": "🇸🇦", "uz": "Saudiya Arabistoni", "en": "Saudi Arabia", "ru": "Саудовская Аравия" }
  },

  "passports": ["UZ", "KZ", "KG", "TJ", "TM", "RU", "TR", "US", "GB", "DE", "FR", "CN", "IN", "JP", "KR", "AE"],
  "schengen": ["FR", "DE", "IT", "ES"],
  "eaeu": ["RU", "KZ", "KG"],
  "cn_transit_240h": ["RU", "US", "GB", "DE", "FR", "IT", "ES", "AE"],

  "ruleSets": {
    "schengen": "UZ:visa4 KZ:visa3 KG:visa4 TJ:visa4 TM:visa4 RU:visa4 TR:visa3 CN:visa3 IN:visa3 US:free GB:free JP:free KR:free AE:free DE:free FR:free IT:free ES:free"
  },

  "tipSets": {
    "schengen": {
      "uz": [
        "Sug'urta kamida 30 000 € qoplamali va butun Shengen hududida amal qilishi shart.",
        "Hujjatlarni safardan 15 kundan kech va 6 oydan erta bo'lmagan muddatda topshiring.",
        "Arizani ko'proq kun qoladigan davlat elchixonasiga topshirasiz."
      ],
      "en": [
        "Travel insurance must cover at least €30,000 and be valid in the whole Schengen area.",
        "Apply no later than 15 days and no earlier than 6 months before the trip.",
        "Apply at the embassy of the country where you will spend the most days."
      ],
      "ru": [
        "Страховка должна покрывать не менее 30 000 € и действовать во всей Шенгенской зоне.",
        "Подавайте документы не позднее чем за 15 дней и не ранее чем за 6 месяцев до поездки.",
        "Подаваться нужно в посольство страны, где вы проведёте больше всего дней."
      ]
    }
  },

  "destinations": [
    {
      "code": "US", "img": "images/nyc.jpg", "stay": 180, "rule180": false, "transit": "strict",
      "fee": { "visa": "$185", "eta": "$21" }, "days": { "visa": [30, 365], "eta": [1, 3] },
      "site": "travel.state.gov",
      "rules": "UZ:visa5 KZ:visa4 KG:visa5 TJ:visa5 TM:visa5 RU:visa5 TR:visa3 CN:visa4 IN:visa4 AE:visa3 GB:eta DE:eta FR:eta JP:eta KR:eta",
      "tips": {
        "uz": [
          "DS-160 onlayn anketasini to'ldirib, elchixonada shaxsan suhbatdan o'tasiz.",
          "Asosiy talab — vataningizga qaytishingizni isbotlash: ish, oila, mulk.",
          "Suhbatda qisqa, aniq va rost javob bering — konsul hujjatdan ko'ra javobingizga ko'proq qaraydi."
        ],
        "en": [
          "Fill in the DS-160 online form and attend an in-person interview at the embassy.",
          "The key requirement is proving strong ties to your home country: job, family, property.",
          "Answer briefly, clearly and honestly — the consul focuses on your answers more than papers."
        ],
        "ru": [
          "Заполните онлайн-анкету DS-160 и пройдите личное собеседование в посольстве.",
          "Главное — доказать связь с родиной: работа, семья, имущество.",
          "Отвечайте кратко, чётко и честно — консул больше смотрит на ответы, чем на бумаги."
        ]
      }
    },
    {
      "code": "GB", "img": "images/london.jpg", "stay": 180, "rule180": false, "transit": "airside",
      "fee": { "visa": "£127", "eta": "£16" }, "days": { "visa": [15, 21], "eta": [1, 3] },
      "site": "gov.uk/standard-visitor",
      "rules": "UZ:visa4 KZ:visa4 KG:visa4 TJ:visa5 TM:visa5 RU:visa5 TR:visa3 CN:visa3 IN:visa3 US:eta DE:eta FR:eta JP:eta KR:eta AE:eta",
      "tips": {
        "uz": [
          "Ariza gov.uk saytida onlayn to'ldiriladi, so'ng VFS markazida barmoq izi topshiriladi.",
          "6 oylik bank ko'chirmasida pul birdan tushgan bo'lmasligi kerak — bu shubha uyg'otadi.",
          "Barcha hujjatlar ingliz tilida yoki tasdiqlangan tarjima bilan bo'lishi shart."
        ],
        "en": [
          "Apply online at gov.uk, then give fingerprints at a VFS centre.",
          "Avoid large sudden deposits in your 6-month bank statement — they raise suspicion.",
          "All documents must be in English or come with a certified translation."
        ],
        "ru": [
          "Анкета заполняется на gov.uk, затем сдаются отпечатки пальцев в центре VFS.",
          "Крупные внезапные поступления на счёт за 6 месяцев вызывают подозрение.",
          "Все документы — на английском или с заверенным переводом."
        ]
      }
    },
    {
      "code": "FR", "img": "images/paris.jpg", "stay": 90, "rule180": true, "transit": "airside",
      "fee": { "visa": "€90" }, "days": { "visa": [15, 45] }, "site": "france-visas.gouv.fr",
      "rules": "@schengen", "tips": "@schengen"
    },
    {
      "code": "DE", "img": "images/berlin.jpg", "stay": 90, "rule180": true, "transit": "airside",
      "fee": { "visa": "€90" }, "days": { "visa": [15, 45] }, "site": "digital.diplo.de",
      "rules": "@schengen", "tips": "@schengen"
    },
    {
      "code": "IT", "img": "images/rome.jpg", "stay": 90, "rule180": true, "transit": "airside",
      "fee": { "visa": "€90" }, "days": { "visa": [15, 45] }, "site": "vistoperitalia.esteri.it",
      "rules": "@schengen", "tips": "@schengen"
    },
    {
      "code": "ES", "img": "images/barcelona.jpg", "stay": 90, "rule180": true, "transit": "airside",
      "fee": { "visa": "€90" }, "days": { "visa": [15, 45] }, "site": "exteriores.gob.es",
      "rules": "@schengen", "tips": "@schengen"
    },
    {
      "code": "JP", "img": "images/tokyo.jpg", "stay": 90, "rule180": false, "transit": "airside",
      "fee": { "visa": "~$20", "evisa": "~$20" }, "days": { "visa": [5, 10], "evisa": [5, 10] },
      "site": "mofa.go.jp",
      "rules": "UZ:visa3 KZ:visa3 KG:visa3 TJ:visa4 TM:visa4 RU:visa3 TR:free CN:visa3 IN:evisa US:free GB:free DE:free FR:free KR:free AE:free",
      "tips": {
        "uz": [
          "Yaponiya batafsil kunma-kun sayohat rejasini (itinerary) talab qiladi.",
          "Taklif qiluvchi bo'lsa, uning kafolat xati (guarantee letter) katta yordam beradi."
        ],
        "en": [
          "Japan asks for a detailed day-by-day itinerary.",
          "If you have a host, their guarantee letter helps a lot."
        ],
        "ru": [
          "Япония требует подробный план поездки по дням.",
          "Если есть приглашающая сторона, её гарантийное письмо очень поможет."
        ]
      }
    },
    {
      "code": "KR", "img": "images/seoul.jpg", "stay": 90, "rule180": false, "transit": "airside",
      "fee": { "visa": "$40", "eta": "₩10 000" }, "days": { "visa": [7, 14], "eta": [1, 3] },
      "site": "visa.go.kr",
      "rules": "UZ:visa3 KZ:free KG:visa4 TJ:visa4 TM:visa4 RU:free TR:eta CN:visa3 IN:visa3 US:free GB:free DE:free FR:free JP:free AE:eta",
      "tips": {
        "uz": [
          "Turistik C-3 viza uchun bank hisobida yetarli mablag' va doimiy ish joyi muhim.",
          "Ilgari Koreyada qoidabuzarlik (noqonuniy ishlash) bo'lgan bo'lsa, rad etish ehtimoli yuqori."
        ],
        "en": [
          "For a C-3 tourist visa, sufficient bank funds and stable employment are key.",
          "Previous violations in Korea (illegal work) greatly increase refusal risk."
        ],
        "ru": [
          "Для туристической визы C-3 важны достаточные средства на счёте и постоянная работа.",
          "Прошлые нарушения в Корее (нелегальная работа) резко повышают риск отказа."
        ]
      }
    },
    {
      "code": "CN", "img": "images/china.jpg", "stay": 30, "rule180": false, "transit": "cn240",
      "fee": { "visa": "~$60" }, "days": { "visa": [4, 10] }, "site": "visaforchina.cn",
      "rules": "UZ:visa2 KZ:free KG:visa3 TJ:visa3 TM:visa3 RU:free TR:visa2 US:visa3 GB:visa2 DE:free FR:free IT:free ES:free IN:visa3 JP:free KR:free AE:free",
      "tips": {
        "uz": [
          "Ariza Xitoy viza markazi (CVASC) orqali onlayn to'ldiriladi va barmoq izi olinadi.",
          "Mehmonxona broni va aviachipta nusxasi deyarli har doim so'raladi."
        ],
        "en": [
          "Apply online through the Chinese Visa Application Service Center; fingerprints are taken.",
          "Hotel bookings and flight tickets are almost always required."
        ],
        "ru": [
          "Анкета заполняется онлайн через визовый центр Китая; сдаются отпечатки пальцев.",
          "Бронь отеля и авиабилеты требуются почти всегда."
        ]
      }
    },
    {
      "code": "TR", "img": "images/istanbul.jpg", "stay": 90, "rule180": true, "transit": "airside",
      "fee": { "evisa": "~$60", "visa": "~$60" }, "days": { "evisa": [0, 1], "visa": [5, 15] },
      "site": "evisa.gov.tr",
      "rules": "UZ:free KZ:free KG:free TJ:evisa TM:evisa RU:free US:free GB:free DE:free FR:free CN:evisa IN:evisa JP:free KR:free AE:free",
      "tips": {
        "uz": [
          "180 kun ichida jami 90 kundan ortiq qolish mumkin emas — kalkulyatorda tekshiring.",
          "Chegarada qaytish chiptasi va mehmonxona broni so'ralishi mumkin."
        ],
        "en": [
          "You cannot stay more than 90 days within any 180 days — check it in the calculator.",
          "Border officers may ask for a return ticket and hotel booking."
        ],
        "ru": [
          "Нельзя находиться более 90 дней в любые 180 дней — проверьте в калькуляторе.",
          "На границе могут спросить обратный билет и бронь отеля."
        ]
      }
    },
    {
      "code": "AE", "img": "images/dubai.jpg", "stay": 30, "rule180": false, "transit": "airside",
      "fee": { "evisa": "~$90", "voa": "0" }, "days": { "evisa": [2, 5], "voa": [0, 0] },
      "site": "icp.gov.ae",
      "rules": "UZ:evisa KZ:free KG:evisa TJ:evisa TM:evisa RU:voa1 TR:evisa US:voa1 GB:voa1 DE:voa1 FR:voa1 CN:voa1 IN:evisa JP:voa1 KR:voa1",
      "tips": {
        "uz": [
          "Viza odatda aviakompaniya, mehmonxona yoki turagentlik orqali rasmiylashtiriladi.",
          "Pasport kamida 6 oy amal qilishi va qaytish chiptasi bo'lishi shart."
        ],
        "en": [
          "The visa is usually arranged through an airline, hotel or travel agency.",
          "Passport must be valid for 6+ months, and a return ticket is required."
        ],
        "ru": [
          "Визу обычно оформляет авиакомпания, отель или турагентство.",
          "Паспорт должен действовать 6+ месяцев, нужен обратный билет."
        ]
      }
    },
    {
      "code": "CA", "img": "images/toronto.jpg", "stay": 180, "rule180": false, "transit": "strict",
      "fee": { "visa": "CAD 185", "eta": "CAD 7" }, "days": { "visa": [30, 120], "eta": [1, 3] },
      "site": "canada.ca/immigration",
      "rules": "UZ:visa4 KZ:visa4 KG:visa5 TJ:visa5 TM:visa5 RU:visa5 TR:visa4 CN:visa4 IN:visa4 AE:eta US:free GB:eta DE:eta FR:eta JP:eta KR:eta",
      "tips": {
        "uz": [
          "Ariza IRCC portalida onlayn topshiriladi; biometrika (CAD 85) narxga kiradi.",
          "Ko'rib chiqish muddati uzoq — kamida 3–4 oy oldin topshiring."
        ],
        "en": [
          "Apply online on the IRCC portal; biometrics (CAD 85) are included in the fee.",
          "Processing is long — apply at least 3–4 months in advance."
        ],
        "ru": [
          "Подача онлайн через портал IRCC; биометрия (85 CAD) включена в сбор.",
          "Рассмотрение долгое — подавайте минимум за 3–4 месяца."
        ]
      }
    },
    {
      "code": "AU", "img": "images/sydney.jpg", "stay": 90, "rule180": false, "transit": "strict",
      "fee": { "visa": "AUD 195", "eta": "AUD 20" }, "days": { "visa": [20, 40], "eta": [1, 2] },
      "site": "immi.homeaffairs.gov.au",
      "rules": "UZ:visa4 KZ:visa4 KG:visa4 TJ:visa5 TM:visa5 RU:visa4 TR:visa3 CN:visa3 IN:visa3 AE:visa3 US:eta GB:eta DE:eta FR:eta JP:eta KR:eta",
      "tips": {
        "uz": [
          "Visitor (subclass 600) vizasi ImmiAccount orqali to'liq onlayn topshiriladi.",
          "Tibbiy ko'rik va sog'liq sug'urtasi talab qilinishi mumkin."
        ],
        "en": [
          "The Visitor (subclass 600) visa is filed fully online via ImmiAccount.",
          "A medical check and health insurance may be required."
        ],
        "ru": [
          "Гостевая виза (subclass 600) подаётся полностью онлайн через ImmiAccount.",
          "Могут потребовать медосмотр и медицинскую страховку."
        ]
      }
    },
    {
      "code": "RU", "img": "images/moscow.jpg", "stay": 90, "rule180": true, "transit": "airside",
      "fee": { "evisa": "$52", "visa": "~$80" }, "days": { "evisa": [2, 4], "visa": [10, 20] },
      "site": "evisa.kdmid.ru",
      "rules": "UZ:free KZ:free KG:free TJ:free TM:evisa TR:evisa US:visa4 GB:visa4 DE:evisa FR:evisa IT:evisa ES:evisa CN:evisa IN:evisa JP:evisa KR:free AE:free",
      "tips": {
        "uz": [
          "Kelgandan keyin 7 ish kuni ichida migratsiya hisobiga turish majburiy.",
          "Ishlash uchun alohida patent kerak — turistik kirish ishlash huquqini bermaydi."
        ],
        "en": [
          "Migration registration within 7 working days of arrival is mandatory.",
          "Working requires a separate patent — tourist entry does not allow work."
        ],
        "ru": [
          "Миграционный учёт в течение 7 рабочих дней после прибытия обязателен.",
          "Для работы нужен патент — туристический въезд не даёт права работать."
        ]
      }
    },
    {
      "code": "KZ", "img": "images/mount2.jpg", "stay": 90, "rule180": true, "transit": "airside",
      "fee": { "evisa": "~$60", "visa": "~$60" }, "days": { "evisa": [5, 10], "visa": [5, 10] },
      "site": "vmp.gov.kz",
      "rules": "UZ:free KG:free TJ:free TM:visa2 RU:free TR:free US:free GB:free DE:free FR:free CN:free IN:evisa JP:free KR:free AE:free",
      "tips": {
        "uz": [
          "30 kundan ortiq qolsangiz, migratsiya xizmatida ro'yxatdan o'tishingiz kerak.",
          "Chegarada migratsiya kartasini to'g'ri to'ldiring va saqlab qo'ying."
        ],
        "en": [
          "If you stay longer than 30 days, you must register with the migration service.",
          "Fill in the migration card correctly at the border and keep it safe."
        ],
        "ru": [
          "При пребывании более 30 дней нужно встать на учёт в миграционной службе.",
          "Правильно заполните миграционную карту на границе и сохраните её."
        ]
      }
    },
    {
      "code": "TH", "img": "images/bangkok.jpg", "stay": 60, "rule180": false, "transit": "airside",
      "fee": { "evisa": "~$40" }, "days": { "evisa": [5, 14] }, "site": "thaievisa.go.th",
      "rules": "UZ:evisa KZ:free KG:evisa TJ:evisa TM:evisa3 RU:free TR:free US:free GB:free DE:free FR:free CN:free IN:free JP:free KR:free AE:free",
      "tips": {
        "uz": [
          "Safardan 3 kun oldin onlayn Thailand Digital Arrival Card (TDAC) to'ldirish shart.",
          "E-viza uchun 3 oylik bank ko'chirmasi va mehmonxona broni yuklanadi."
        ],
        "en": [
          "Fill in the online Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
          "For an e-visa, upload a 3-month bank statement and hotel booking."
        ],
        "ru": [
          "За 3 дня до прибытия заполните онлайн-карту Thailand Digital Arrival Card (TDAC).",
          "Для э-визы загружаются выписка из банка за 3 месяца и бронь отеля."
        ]
      }
    },
    {
      "code": "MY", "img": "images/kualalumpur.jpg", "stay": 30, "rule180": false, "transit": "airside",
      "fee": {}, "days": {}, "site": "imigresen-online.imi.gov.my",
      "rules": "*:free",
      "tips": {
        "uz": [
          "Kelishdan 3 kun oldin onlayn MDAC (Malaysia Digital Arrival Card) to'ldiring.",
          "Qaytish chiptasi va kamida 6 oy amal qiladigan pasport bo'lishi kerak."
        ],
        "en": [
          "Submit the online MDAC (Malaysia Digital Arrival Card) within 3 days before arrival.",
          "Have a return ticket and a passport valid for at least 6 months."
        ],
        "ru": [
          "За 3 дня до прибытия заполните онлайн-карту MDAC (Malaysia Digital Arrival Card).",
          "Нужны обратный билет и паспорт, действующий не менее 6 месяцев."
        ]
      }
    },
    {
      "code": "GE", "img": "images/georgia.jpg", "stay": 365, "rule180": false, "transit": "airside",
      "fee": { "evisa": "~$20" }, "days": { "evisa": [5, 7] }, "site": "evisa.gov.ge",
      "rules": "*:free IN:evisa",
      "tips": {
        "uz": [
          "Ko'pchilik davlat fuqarolari Gruziyada 1 yilgacha vizasiz qolishi mumkin.",
          "Tibbiy sug'urta bo'lishi tavsiya etiladi — chegarada so'ralishi mumkin."
        ],
        "en": [
          "Citizens of most countries can stay in Georgia visa-free for up to one year.",
          "Health insurance is recommended — it may be checked at the border."
        ],
        "ru": [
          "Граждане большинства стран могут находиться в Грузии без визы до года.",
          "Рекомендуется медстраховка — её могут проверить на границе."
        ]
      }
    },
    {
      "code": "EG", "img": "images/egypt.jpg", "stay": 30, "rule180": false, "transit": "airside",
      "fee": { "evisa": "$25", "voa": "$25" }, "days": { "evisa": [3, 7], "voa": [0, 0] },
      "site": "visa2egypt.gov.eg",
      "rules": "UZ:evisa KZ:voa KG:evisa TJ:evisa TM:evisa RU:voa TR:evisa US:voa GB:voa DE:voa FR:voa IT:voa ES:voa CN:evisa IN:evisa JP:voa KR:voa AE:free",
      "tips": {
        "uz": [
          "E-vizani faqat rasmiy visa2egypt.gov.eg saytida oling — soxta saytlardan ehtiyot bo'ling.",
          "Sharm el-Shayx kurortiga 15 kungacha maxsus kirish shtampi bilan kirish mumkin."
        ],
        "en": [
          "Get the e-visa only on the official visa2egypt.gov.eg site — beware of fake sites.",
          "Sharm El-Sheikh allows a special entry stamp for stays up to 15 days."
        ],
        "ru": [
          "Оформляйте э-визу только на официальном сайте visa2egypt.gov.eg — остерегайтесь подделок.",
          "В Шарм-эль-Шейх можно въехать по специальному штампу до 15 дней."
        ]
      }
    },
    {
      "code": "SA", "img": "images/mecca.jpg", "stay": 90, "rule180": false, "transit": "airside",
      "fee": { "evisa": "~$135", "visa": "~$135" }, "days": { "evisa": [1, 5], "visa": [7, 21] },
      "site": "visa.visitsaudi.com",
      "rules": "UZ:evisa KZ:evisa KG:evisa TJ:evisa TM:visa3 RU:evisa TR:evisa US:evisa GB:evisa DE:evisa FR:evisa IT:evisa ES:evisa CN:evisa IN:visa3 JP:evisa KR:evisa AE:free",
      "tips": {
        "uz": [
          "Turistik e-viza bilan umra qilish mumkin, ammo haj uchun alohida haj vizasi kerak.",
          "E-viza narxiga majburiy tibbiy sug'urta kiritilgan."
        ],
        "en": [
          "A tourist e-visa allows Umrah, but Hajj requires a separate Hajj visa.",
          "Mandatory health insurance is included in the e-visa fee."
        ],
        "ru": [
          "Туристическая э-виза позволяет совершить умру, но для хаджа нужна отдельная виза.",
          "Обязательная медстраховка включена в стоимость э-визы."
        ]
      }
    },
    {
      "code": "IN", "img": "images/india.jpg", "stay": 90, "rule180": false, "transit": "airside",
      "fee": { "evisa": "$25–80", "voa": "~$30", "visa": "~$80" }, "days": { "evisa": [3, 5], "voa": [0, 0], "visa": [7, 21] },
      "site": "indianvisaonline.gov.in",
      "rules": "UZ:evisa KZ:evisa KG:evisa TJ:evisa TM:evisa RU:evisa TR:evisa US:evisa GB:evisa DE:evisa FR:evisa IT:evisa ES:evisa CN:visa3 JP:voa KR:voa AE:voa",
      "tips": {
        "uz": [
          "E-vizani safardan kamida 4 kun oldin indianvisaonline.gov.in saytida oling.",
          "Pasportda kamida 2 ta bo'sh sahifa bo'lishi kerak."
        ],
        "en": [
          "Apply for the e-visa at least 4 days before travel on indianvisaonline.gov.in.",
          "Your passport needs at least 2 blank pages."
        ],
        "ru": [
          "Подавайте на э-визу минимум за 4 дня до поездки на indianvisaonline.gov.in.",
          "В паспорте должно быть не менее 2 чистых страниц."
        ]
      }
    },
    {
      "code": "UZ", "img": "images/road.jpg", "stay": 30, "rule180": false, "transit": "airside",
      "fee": { "evisa": "$20" }, "days": { "evisa": [2, 3] }, "site": "e-visa.gov.uz",
      "rules": "KZ:free KG:free TJ:free TM:evisa RU:free TR:free US:free GB:free DE:free FR:free IT:free ES:free CN:free IN:evisa JP:free KR:free AE:free",
      "tips": {
        "uz": [
          "Xorijliklar 3 kundan ortiq qolsa, mehmonxona yoki emehmon.uz orqali ro'yxatdan o'tadi.",
          "E-viza e-visa.gov.uz rasmiy saytida 2–3 kunda beriladi."
        ],
        "en": [
          "Foreigners staying over 3 days must register via the hotel or emehmon.uz.",
          "E-visas are issued on the official e-visa.gov.uz site in 2–3 days."
        ],
        "ru": [
          "Иностранцы, пребывающие более 3 дней, регистрируются через отель или emehmon.uz.",
          "Э-виза оформляется на официальном сайте e-visa.gov.uz за 2–3 дня."
        ]
      }
    }
  ],

  "documents": {
    "tourism": {
      "free": {
        "uz": ["Kamida 6 oy amal qiladigan xorijiy pasport", "Qaytish yoki keyingi yo'nalishga aviachipta", "Mehmonxona broni yoki yashash manzili", "Safar uchun yetarli mablag' (naqd yoki karta)", "Tibbiy sug'urta (tavsiya etiladi)"],
        "en": ["Passport valid for at least 6 months", "Return or onward flight ticket", "Hotel booking or address of stay", "Enough money for the trip (cash or card)", "Travel health insurance (recommended)"],
        "ru": ["Загранпаспорт, действующий не менее 6 месяцев", "Обратный или транзитный авиабилет", "Бронь отеля или адрес проживания", "Достаточно денег на поездку (наличные или карта)", "Медицинская страховка (рекомендуется)"]
      },
      "eta": {
        "uz": ["Biometrik xorijiy pasport", "Onlayn ETA arizasi (rasmiy sayt yoki ilova orqali)", "Yuz surati (telefonda olingan bo'lishi mumkin)", "To'lov uchun bank kartasi va elektron pochta", "Qaytish chiptasi va mehmonxona broni"],
        "en": ["Biometric passport", "Online ETA application (official site or app)", "Face photo (can be taken with a phone)", "Bank card for payment and an email address", "Return ticket and hotel booking"],
        "ru": ["Биометрический загранпаспорт", "Онлайн-заявка на ETA (официальный сайт или приложение)", "Фото лица (можно снять на телефон)", "Банковская карта для оплаты и e-mail", "Обратный билет и бронь отеля"]
      },
      "voa": {
        "uz": ["Kamida 6 oy amal qiladigan pasport", "Yig'im uchun naqd pul (odatda AQSH dollarida)", "Qaytish aviachiptasi", "Mehmonxona broni", "1 dona rangli surat (ba'zi davlatlarda)"],
        "en": ["Passport valid for at least 6 months", "Cash for the fee (usually in US dollars)", "Return flight ticket", "Hotel booking", "1 colour photo (in some countries)"],
        "ru": ["Паспорт, действующий не менее 6 месяцев", "Наличные для сбора (обычно в долларах США)", "Обратный авиабилет", "Бронь отеля", "1 цветное фото (в некоторых странах)"]
      },
      "evisa": {
        "uz": ["Pasportning birinchi sahifasi skaneri", "Elektron surat (oq fon, 3.5×4.5 sm)", "Rasmiy saytda to'ldirilgan onlayn anketa", "Onlayn to'lov uchun bank kartasi", "Mehmonxona broni va aviachipta", "Bank ko'chirmasi (ba'zan so'raladi)", "Chop etilgan e-viza nusxasi"],
        "en": ["Scan of the passport photo page", "Digital photo (white background, 3.5×4.5 cm)", "Online form filled in on the official site", "Bank card for online payment", "Hotel booking and flight ticket", "Bank statement (sometimes required)", "Printed copy of the e-visa"],
        "ru": ["Скан первой страницы паспорта", "Электронное фото (белый фон, 3,5×4,5 см)", "Онлайн-анкета на официальном сайте", "Банковская карта для онлайн-оплаты", "Бронь отеля и авиабилет", "Выписка из банка (иногда требуется)", "Распечатанная э-виза"]
      },
      "visa": {
        "uz": ["To'ldirilgan va imzolangan viza anketasi", "Xorijiy pasport (+ eski pasportlar, bo'lsa)", "2 dona surat 3.5×4.5 sm (AQSH uchun 5×5 sm), oq fon", "Oxirgi 3–6 oylik bank ko'chirmasi", "Ish joyidan maosh ko'rsatilgan ma'lumotnoma", "Mulk, oila, o'qish haqida hujjatlar (vatanga bog'liqlik)", "Mehmonxona broni va aviachipta broni", "Tibbiy sug'urta polisi", "Taklifnoma (agar mavjud bo'lsa)", "Konsullik yig'imi to'langanlik kvitansiyasi"],
        "en": ["Completed and signed visa application form", "Passport (+ old passports, if any)", "2 photos 3.5×4.5 cm (5×5 cm for the USA), white background", "Bank statement for the last 3–6 months", "Employment letter stating your salary", "Proof of ties: property, family, studies", "Hotel and flight reservations", "Travel health insurance policy", "Invitation letter (if any)", "Receipt of the consular fee payment"],
        "ru": ["Заполненная и подписанная визовая анкета", "Загранпаспорт (+ старые паспорта, если есть)", "2 фото 3,5×4,5 см (для США 5×5 см), белый фон", "Выписка из банка за последние 3–6 месяцев", "Справка с работы с указанием зарплаты", "Документы о связи с родиной: имущество, семья, учёба", "Бронь отеля и авиабилетов", "Полис медицинского страхования", "Приглашение (если есть)", "Квитанция об оплате консульского сбора"]
      }
    },
    "work": {
      "uz": ["Xorijiy ish beruvchining taklifnomasi / mehnat shartnomasi", "Ish ruxsatnomasi yoki patent (ish beruvchi rasmiylashtiradi)", "Apostillangan diplom va uning tarjimasi", "Ish tajribasini tasdiqlovchi ma'lumotnoma", "Sudlanmaganlik haqida ma'lumotnoma (apostil bilan)", "Tibbiy ko'rik natijalari", "Kamida 6 oy amal qiladigan pasport", "Surat 3.5×4.5 sm, oq fon", "Til sertifikati (talab qilinsa)"],
      "en": ["Job offer / employment contract from a foreign employer", "Work permit or patent (arranged by the employer)", "Apostilled diploma with translation", "Proof of work experience", "Police clearance certificate (apostilled)", "Medical examination results", "Passport valid for at least 6 months", "Photo 3.5×4.5 cm, white background", "Language certificate (if required)"],
      "ru": ["Приглашение / трудовой договор от иностранного работодателя", "Разрешение на работу или патент (оформляет работодатель)", "Диплом с апостилем и переводом", "Справка, подтверждающая опыт работы", "Справка о несудимости (с апостилем)", "Результаты медосмотра", "Паспорт, действующий не менее 6 месяцев", "Фото 3,5×4,5 см, белый фон", "Языковой сертификат (если требуется)"]
    },
    "study": {
      "uz": ["O'quv yurtidan qabul xati (offer / admission letter)", "O'qish to'lovi to'langanlik kvitansiyasi", "Apostillangan attestat yoki diplom va tarjimasi", "Til sertifikati (IELTS, TOEFL, TOPIK, HSK va h.k.)", "Yashash xarajatlarini qoplaydigan bank ko'chirmasi yoki homiylik xati", "Tibbiy sug'urta", "Kamida 6 oy amal qiladigan pasport", "Motivatsion xat (ba'zi davlatlarda)", "Surat 3.5×4.5 sm, oq fon"],
      "en": ["Offer / admission letter from the school", "Receipt of tuition payment", "Apostilled school certificate or diploma with translation", "Language certificate (IELTS, TOEFL, TOPIK, HSK, etc.)", "Bank statement or sponsorship letter covering living costs", "Health insurance", "Passport valid for at least 6 months", "Motivation letter (some countries)", "Photo 3.5×4.5 cm, white background"],
      "ru": ["Письмо о зачислении из учебного заведения", "Квитанция об оплате обучения", "Аттестат или диплом с апостилем и переводом", "Языковой сертификат (IELTS, TOEFL, TOPIK, HSK и др.)", "Выписка из банка или спонсорское письмо на расходы", "Медицинская страховка", "Паспорт, действующий не менее 6 месяцев", "Мотивационное письмо (в некоторых странах)", "Фото 3,5×4,5 см, белый фон"]
    },
    "transit": {
      "uz": ["Kamida 6 oy amal qiladigan pasport", "Yakuniy manzilga chipta (bitta bronda bo'lgani ma'qul)", "Yakuniy davlat vizasi (kerak bo'lsa)", "Tranzit vizasi yoki ruxsatnoma (talab qilinsa)"],
      "en": ["Passport valid for at least 6 months", "Ticket to the final destination (ideally on one booking)", "Visa for the final destination (if needed)", "Transit visa or authorisation (if required)"],
      "ru": ["Паспорт, действующий не менее 6 месяцев", "Билет до конечного пункта (лучше в одном бронировании)", "Виза страны назначения (если нужна)", "Транзитная виза или разрешение (если требуется)"]
    }
  },

  "steps": {
    "free": {
      "uz": ["Pasport muddatini tekshiring", "Chipta va mehmonxonani bron qiling", "Chegarada pasport va bronlarni ko'rsating"],
      "en": ["Check your passport validity", "Book flights and accommodation", "Show your passport and bookings at the border"],
      "ru": ["Проверьте срок действия паспорта", "Забронируйте билеты и жильё", "Покажите паспорт и брони на границе"]
    },
    "eta": {
      "uz": ["Rasmiy saytda ETA arizasini to'ldiring", "Yig'imni karta orqali to'lang", "Tasdiqni elektron pochtada oling", "Safarga o'sha pasport bilan boring — ETA unga bog'langan"],
      "en": ["Fill in the ETA application on the official site", "Pay the fee by card", "Receive approval by email", "Travel with the same passport — the ETA is linked to it"],
      "ru": ["Заполните заявку ETA на официальном сайте", "Оплатите сбор картой", "Получите одобрение на e-mail", "Путешествуйте с тем же паспортом — ETA привязано к нему"]
    },
    "voa": {
      "uz": ["Chipta va mehmonxonani bron qiling", "Yig'im uchun naqd pul tayyorlang", "Aeroportda viza oynasiga murojaat qiling", "Pasportga viza yopishtiriladi yoki shtamp qo'yiladi"],
      "en": ["Book flights and accommodation", "Prepare cash for the fee", "Go to the visa counter at the airport", "Get a visa sticker or stamp in your passport"],
      "ru": ["Забронируйте билеты и жильё", "Подготовьте наличные для сбора", "Обратитесь к визовой стойке в аэропорту", "Получите визу или штамп в паспорт"]
    },
    "evisa": {
      "uz": ["Rasmiy saytda anketa to'ldiring", "Pasport va surat yuklang", "Yig'imni onlayn to'lang", "E-vizani pochtadan yuklab, chop eting"],
      "en": ["Fill in the form on the official site", "Upload passport scan and photo", "Pay the fee online", "Download and print the e-visa"],
      "ru": ["Заполните анкету на официальном сайте", "Загрузите скан паспорта и фото", "Оплатите сбор онлайн", "Скачайте и распечатайте э-визу"]
    },
    "visa": {
      "uz": ["Hujjatlarni to'plang", "Onlayn anketa to'ldiring va navbatga yoziling", "Viza markaziga borib biometrika topshiring", "Suhbatdan o'ting (talab qilinsa)", "Pasportni viza bilan qaytarib oling"],
      "en": ["Collect the documents", "Fill in the online form and book an appointment", "Visit the visa centre for biometrics", "Attend the interview (if required)", "Collect your passport with the visa"],
      "ru": ["Соберите документы", "Заполните онлайн-анкету и запишитесь", "Сдайте биометрию в визовом центре", "Пройдите собеседование (если нужно)", "Получите паспорт с визой"]
    }
  },

  "transit": {
    "noneNeeded": {
      "uz": "Bu davlatga vizasiz yoki soddalashtirilgan tartibda kirasiz, shuning uchun tranzit uchun ham alohida viza kerak emas.",
      "en": "You can enter this country visa-free or with a simplified procedure, so no separate transit visa is needed.",
      "ru": "Вы въезжаете в эту страну без визы или по упрощённой процедуре, поэтому отдельная транзитная виза не нужна."
    },
    "airside": {
      "uz": "Aeroportning tranzit zonasidan chiqmasangiz (odatda 24 soatgacha) ko'pincha viza kerak emas. Agar shaharga chiqmoqchi bo'lsangiz yoki bagajni qayta topshirishingiz kerak bo'lsa — kirish vizasi talab qilinadi. Ba'zi fuqaroliklar uchun aeroport tranzit vizasi (ATV / DATV) kerak — aviakompaniyadan aniqlang.",
      "en": "If you stay in the airport transit zone (usually up to 24 hours), a visa is often not needed. If you want to go into the city or must re-check your luggage, an entry visa is required. Some nationalities need an airport transit visa (ATV / DATV) — check with your airline.",
      "ru": "Если вы не выходите из транзитной зоны аэропорта (обычно до 24 часов), виза часто не нужна. Если хотите выйти в город или нужно перерегистрировать багаж — требуется въездная виза. Некоторым гражданствам нужна транзитная виза аэропорта (ATV / DATV) — уточните у авиакомпании."
    },
    "strict": {
      "uz": "Bu davlatda tranzit zonasi yo'q: hatto samolyot almashtirish uchun ham viza yoki elektron ruxsatnoma (tranzit vizasi) talab qilinadi. Iloji bo'lsa, boshqa davlat orqali uchadigan yo'nalishni tanlang.",
      "en": "This country has no sterile transit zone: even a plane change requires a visa or electronic authorisation (transit visa). If possible, choose a route via another country.",
      "ru": "В этой стране нет стерильной транзитной зоны: даже для пересадки нужна виза или электронное разрешение (транзитная виза). По возможности выбирайте маршрут через другую страну."
    },
    "cn240": {
      "uz": "Pasportingiz 240 soatlik vizasiz tranzit dasturiga kiradi: uchinchi davlatga chipta bo'lsa, Xitoyda 10 kungacha vizasiz qolishingiz mumkin.",
      "en": "Your passport qualifies for the 240-hour visa-free transit: with an onward ticket to a third country you can stay in China up to 10 days.",
      "ru": "Ваш паспорт подходит для 240-часового безвизового транзита: с билетом в третью страну можно находиться в Китае до 10 дней."
    }
  },

  "faq": [
    {
      "q": { "uz": "Apostil nima?", "en": "What is an apostille?", "ru": "Что такое апостиль?" },
      "a": {
        "uz": "Apostil — rasmiy hujjat (diplom, tug'ilganlik guvohnomasi, ma'lumotnoma) haqiqiyligini tasdiqlovchi maxsus shtamp. U Gaaga konvensiyasiga a'zo davlatlarda qo'shimcha legalizatsiyasiz tan olinadi. O'zbekistonda apostil Adliya vazirligi, Xalq ta'limi va Oliy ta'lim vazirligi orqali qo'yiladi (my.gov.uz orqali ariza berish mumkin).",
        "en": "An apostille is a special stamp that certifies an official document (diploma, birth certificate, certificate). It is recognised by all Hague Convention countries without further legalisation. In Uzbekistan it is issued by the Ministry of Justice or the Ministries of Education (you can apply via my.gov.uz).",
        "ru": "Апостиль — специальный штамп, подтверждающий подлинность официального документа (диплома, свидетельства о рождении, справки). Он признаётся во всех странах Гаагской конвенции без дополнительной легализации. В Узбекистане его ставят Министерство юстиции или министерства образования (заявку можно подать через my.gov.uz)."
      }
    },
    {
      "q": { "uz": "Biometrika nima?", "en": "What is biometrics?", "ru": "Что такое биометрия?" },
      "a": {
        "uz": "Biometrika — viza markazida 10 ta barmoq izi skanerlanishi va raqamli surat olinishi. Shengen davlatlari uchun barmoq izlari 5 yil saqlanadi, shuning uchun bu muddat ichida qayta topshirish shart emas. Jarayon 5–10 daqiqa davom etadi.",
        "en": "Biometrics means scanning all 10 fingerprints and taking a digital photo at the visa centre. For Schengen countries fingerprints are stored for 5 years, so you don't need to repeat it within that time. It takes 5–10 minutes.",
        "ru": "Биометрия — сканирование 10 отпечатков пальцев и цифровое фото в визовом центре. Для Шенгена отпечатки хранятся 5 лет, поэтому в этот период сдавать повторно не нужно. Процедура занимает 5–10 минут."
      }
    },
    {
      "q": { "uz": "Viza uchun suratga qanday talablar bor?", "en": "What are the visa photo requirements?", "ru": "Какие требования к фото на визу?" },
      "a": {
        "uz": "Ko'pchilik davlatlar uchun: 3.5×4.5 sm, rangli, och (oq yoki och kulrang) fon, yuz kadrning 70–80% qismini egallaydi, ko'zoynaksiz, neytral ifoda, oxirgi 6 oy ichida olingan. AQSH uchun 5×5 sm. Bosh kiyim faqat diniy sabab bilan, yuz to'liq ko'rinishi sharti bilan.",
        "en": "For most countries: 3.5×4.5 cm, colour, light (white or light grey) background, face covering 70–80% of the frame, no glasses, neutral expression, taken within the last 6 months. For the USA: 5×5 cm. Headwear only for religious reasons, with the face fully visible.",
        "ru": "Для большинства стран: 3,5×4,5 см, цветное, светлый (белый или светло-серый) фон, лицо занимает 70–80% кадра, без очков, нейтральное выражение, сделано не ранее 6 месяцев назад. Для США — 5×5 см. Головной убор только по религиозным причинам, лицо полностью открыто."
      }
    },
    {
      "q": { "uz": "Bank ko'chirmasi qanday bo'lishi kerak?", "en": "What should a bank statement look like?", "ru": "Какой должна быть выписка из банка?" },
      "a": {
        "uz": "Bank muhri va imzosi bilan, oxirgi 3–6 oylik harakatlar ko'rsatilgan bo'lishi kerak. Qoldiq safar har bir kuni uchun yetarli bo'lishi lozim (Shengen uchun odatda kuniga 50–120 €). Arizadan oldin birdaniga katta summa tushirish shubha uyg'otadi.",
        "en": "It must carry the bank's stamp and signature and show transactions for the last 3–6 months. The balance should cover every day of the trip (Schengen usually expects €50–120 per day). A large sudden deposit right before applying looks suspicious.",
        "ru": "С печатью и подписью банка, с движением средств за последние 3–6 месяцев. Остатка должно хватать на каждый день поездки (для Шенгена обычно 50–120 € в день). Крупное внезапное пополнение перед подачей вызывает подозрение."
      }
    },
    {
      "q": { "uz": "Shengen 90/180 qoidasi nima?", "en": "What is the Schengen 90/180 rule?", "ru": "Что такое правило 90/180 в Шенгене?" },
      "a": {
        "uz": "Har qanday 180 kunlik davr ichida Shengen hududida jami 90 kundan ortiq bo'lish mumkin emas. Hisob har kuni orqaga qarab 180 kun bo'yicha olib boriladi. Sahifadagi kalkulyator orqali qolgan kunlaringizni hisoblang.",
        "en": "In any 180-day period you may not spend more than 90 days in total in the Schengen area. The window is counted backwards from each day. Use the calculator on this page to see how many days you have left.",
        "ru": "В любой 180-дневный период нельзя находиться в Шенгене более 90 дней суммарно. Окно отсчитывается назад от каждого дня. Посчитайте оставшиеся дни в калькуляторе на этой странице."
      }
    },
    {
      "q": { "uz": "Viza rad etilsa nima qilish kerak?", "en": "What if my visa is refused?", "ru": "Что делать при отказе в визе?" },
      "a": {
        "uz": "Rad etish xatidagi sababni diqqat bilan o'qing. Ko'p davlatlarda 15–30 kun ichida apellyatsiya berish mumkin. Kamchilikni tuzatib (masalan, ko'proq moliyaviy hujjat qo'shib) qayta topshirish ham mumkin. Keyingi arizalarda rad etish haqida doim rost ma'lumot bering.",
        "en": "Read the reason in the refusal letter carefully. Many countries allow an appeal within 15–30 days. You can also fix the weak point (for example, add more financial proof) and reapply. Always declare previous refusals truthfully in later applications.",
        "ru": "Внимательно прочитайте причину в письме об отказе. Во многих странах можно подать апелляцию в течение 15–30 дней. Можно исправить слабое место (например, добавить финансовых документов) и подать заново. В будущих анкетах всегда честно указывайте прошлые отказы."
      }
    },
    {
      "q": { "uz": "Tranzit vizasi qachon kerak?", "en": "When do I need a transit visa?", "ru": "Когда нужна транзитная виза?" },
      "a": {
        "uz": "Agar aeroportdan chiqsangiz, bagajni qayta topshirsangiz yoki davlat tranzit zonasiga ega bo'lmasa (AQSH, Kanada, Avstraliya). Ba'zi fuqaroliklar uchun aeroportning o'zida ham tranzit vizasi kerak. Natijalar blokidagi «Tranzit» yorlig'ida aniq javobni ko'ring.",
        "en": "When you leave the airport, have to re-check luggage, or the country has no transit zone (USA, Canada, Australia). Some nationalities need a transit visa even airside. See the exact answer in the “Transit” tab of the results.",
        "ru": "Если вы выходите из аэропорта, перерегистрируете багаж или в стране нет транзитной зоны (США, Канада, Австралия). Некоторым гражданствам транзитная виза нужна даже в аэропорту. Точный ответ — во вкладке «Транзит» в результатах."
      }
    }
  ],

  "sources": [
    { "name": "travel.state.gov", "url": "https://travel.state.gov" },
    { "name": "gov.uk/visas-immigration", "url": "https://www.gov.uk/browse/visas-immigration" },
    { "name": "home-affairs.ec.europa.eu", "url": "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa_en" },
    { "name": "canada.ca/immigration", "url": "https://www.canada.ca/en/services/immigration-citizenship.html" },
    { "name": "mfa.uz", "url": "https://mfa.uz" },
    { "name": "e-visa.gov.uz", "url": "https://e-visa.gov.uz" },
    { "name": "visaforchina.cn", "url": "https://www.visaforchina.cn" },
    { "name": "evisa.gov.tr", "url": "https://www.evisa.gov.tr" }
  ]
}
;
