# VisaCompass — viza va hujjatlar yo'lchisi

O'quv loyihasi. Foydalanuvchi o'z fuqaroligini va boradigan davlatni tanlaydi —
sayt viza turini, kirish qiyinligini (1–5) va kerakli hujjatlar ro'yxatini ko'rsatadi.
Sayt **internetsiz to'liq ishlaydi**: shriftlar, rasmlar, bayroqlar va kutubxona loyiha ichida.

## Qanday ochish

`index.html` faylini ikki marta bosing — brauzerda ochiladi.

## Tuzilma

```
visa-sayt/
├── index.html            — sahifa (one-page)
├── data/data.json        — MA'LUMOTLAR BAZASI: davlatlar, viza qoidalari,
│                           hujjatlar, tranzit, FAQ (3 tilda)
├── js/data.js            — data.json nusxasi (fayl sifatida ochilganda ishlatiladi)
├── js/i18n.js            — interfeys tarjimalari (UZ / EN / RU)
├── js/app.js             — barcha logika
├── js/lib/html2pdf…js    — PDF yaratish kutubxonasi (lokal)
├── css/style.css         — dizayn, kunduzgi va tungi mavzu
├── css/fonts.css, fonts/ — Jost va Inter shriftlari (lokal)
├── images/               — fon rasmlari (Unsplash) va bayroqlar (flagcdn)
└── build-data.sh         — data.json -> js/data.js nusxalash skripti
```

## Imkoniyatlar

- **3 til** — UZ / EN / RU, butun interfeys va hujjatlar matni almashadi (`data-i18n` kalitlari).
- **Jonli qidiruv** — avtoto'ldirish, uchala tilda va xato yozilganda ham topadi
  («Фран» → Франция, «germanya» → Germaniya). Levenshtein algoritmi ishlatilgan.
- **Fuqarolikka bog'liqlik** — «Men fuqaroman [A] → Uchaman [B]»: 16 pasport × 22 davlat.
- **Viza kartasi** — natija boarding pass ko'rinishida: viza turi, muddat, yig'im, qiyinlik.
- **Tablar** — Turizm / Ish–O'qish / Tranzit.
- **Interaktiv chek-list** — belgilar saqlanadi (til almashganda ham).
- **PDF eksport** — belgilangan chek-listni PDF qilib yuklab olish (html2pdf.js).
- **Viza yordamchisi** — 3 savol (fuqarolik → davlat → maqsad) va sayt paketni o'zi yig'adi.
- **Kunlar kalkulyatori** — Shengen, Turkiya, Rossiya, Qozog'iston uchun 90/180 qoidasi.
- **Kunduzgi reys / Tungi reys** — yorug' va yulduzli neon mavzu.
- **F.A.Q.** — apostil, biometrika, surat talablari va boshqalar.
- **Mobil moslashuv** — telefonda ham to'g'ri ko'rinadi.

## Ma'lumotni o'zgartirish

1. `data/data.json` faylini tahrirlang.
2. Terminalda `sh build-data.sh` ni ishga tushiring — `js/data.js` yangilanadi.

Viza qoidasi formati: `"UZ:visa4 KZ:free *:free"` — pasport kodi, holat
(`free`, `eta`, `voa`, `evisa`, `visa`) va qiyinlik (1–5).

> Ma'lumotlar 2026-yil holatiga ko'ra tanishuv uchun berilgan. Rasmiy talablarni elchixona saytida tekshiring.
