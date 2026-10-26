/* =========================================================
   VisaCompass — sayt logikasi
   1. Ma'lumot yuklash (data/data.json yoki js/data.js)
   2. Tillar (i18n)            7. Davlatlar ro'yxati
   3. Qidiruv + avtoto'ldirish  8. FAQ, manbalar, viza turlari
   4. Viza kartasi + tablar     9. Viza yordamchisi (mini-anketa)
   5. Chek-list + PDF          10. Kunduzgi / tungi reys mavzusi
   6. Kunlar kalkulyatori
   ========================================================= */

let DATA = null;

const LEVEL_COLORS = ["#8b8fe0", "#2fae6b", "#7bbf3a", "#e6a817", "#e9692c", "#d63a3a"];
const DEFAULT_DIFFICULTY = { free: 1, eta: 1, voa: 2, evisa: 2, visa: 3 };
const LIGHT_STATUSES = ["free", "eta", "voa"];

const state = {
  lang: "uz",
  theme: "day",
  passport: "UZ",
  dest: "",
  tab: "tourism",
  sub: "work",
  sort: "easy",
  typeIdx: 0,
  trips: [{ in: "", out: "" }]
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- localStorage (xatolarga chidamli) ---------- */
const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("visacompass:" + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("visacompass:" + key, JSON.stringify(value)); } catch (e) { /* jim */ }
  }
};

/* =========================================================
   1. MA'LUMOT YUKLASH
   Server orqali ochilsa data/data.json fetch qilinadi,
   fayl sifatida (file://) ochilsa js/data.js nusxasi ishlatiladi.
   ========================================================= */
async function loadData() {
  if (location.protocol.startsWith("http")) {
    try {
      const res = await fetch("data/data.json", { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (e) { /* nusxaga o'tamiz */ }
  }
  return window.VISA_DATA;
}

/* ---------- Yordamchi funksiyalar ---------- */
function t(key) {
  return I18N[state.lang][key] ?? I18N.uz[key] ?? key;
}
function fmt(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
function cname(code, lang = state.lang) {
  return DATA.countries[code] ? DATA.countries[code][lang] : code;
}
/* Bayroq rasmi (emoji Windows'da ko'rinmaydi, shuning uchun SVG) */
function flag(code) {
  return `<img class="flag-img" src="images/flags/${code.toLowerCase()}.svg" alt="">`;
}
function getDest(code) {
  return DATA.destinations.find(d => d.code === code);
}
function resolveSet(value, sets) {
  return typeof value === "string" && value.startsWith("@") ? sets[value.slice(1)] : value;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* "UZ:visa4 KZ:free *:free" qoidasidan holat va qiyinlikni topish */
function getRequirement(passport, dest) {
  if (passport === dest.code) return { status: "home", level: 0 };
  const rules = {};
  resolveSet(dest.rules, DATA.ruleSets).split(/\s+/).forEach(r => {
    const [k, v] = r.split(":");
    rules[k] = v;
  });
  const raw = rules[passport] || rules["*"] || "visa3";
  const m = raw.match(/^([a-z]+)(\d)?$/);
  const status = m[1];
  const level = m[2] ? Number(m[2]) : DEFAULT_DIFFICULTY[status];
  return { status, level };
}

function statusLabel(req, dest) {
  if (req.status === "home") return t("status").home;
  if (req.status === "free") return fmt(t("visa_type_free"), { n: dest.stay });
  if (req.status === "visa" && DATA.schengen.includes(dest.code)) return t("status").schengen;
  return t("status")[req.status];
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* =========================================================
   2. TILLAR
   ========================================================= */
function applyLang() {
  document.documentElement.lang = state.lang;
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $$("#langSwitch button").forEach(b => b.classList.toggle("active", b.dataset.lang === state.lang));

  fillSelects();
  renderTheme();
  renderResult();
  renderCalc();
  renderGrid();
  renderTypes();
  renderFaq();
  renderSources();
  if ($("#wizard").classList.contains("open")) renderWizard();
}

function setLang(lang) {
  state.lang = lang;
  store.set("lang", lang);
  applyLang();
}

/* ---------- Tanlash ro'yxatlari ---------- */
function sortedCodes(codes) {
  return [...codes].sort((a, b) => cname(a).localeCompare(cname(b), state.lang));
}

function fillSelects() {
  const pSel = $("#passportSel");
  const dSel = $("#destSel");
  pSel.innerHTML = sortedCodes(DATA.passports)
    .map(c => `<option value="${c}">${cname(c)}</option>`).join("");
  dSel.innerHTML = `<option value="">${t("choose")}</option>` +
    sortedCodes(DATA.destinations.map(d => d.code))
      .map(c => `<option value="${c}">${cname(c)}</option>`).join("");
  pSel.value = state.passport;
  dSel.value = state.dest;
}

/* =========================================================
   3. QIDIRUV + AVTOTO'LDIRISH (yumshoq qidiruv)
   "Фран" -> Франция, "Frnace" -> France, "germanya" -> Germaniya
   ========================================================= */
function normalize(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[''ʻʼ`’‘]/g, "")
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

function isSubsequence(q, s) {
  let i = 0;
  for (const ch of s) if (ch === q[i]) i++;
  return i === q.length;
}

/* Kichik ball — yaxshiroq moslik. null — mos emas */
function matchScore(q, name) {
  const n = normalize(name);
  if (!q) return null;
  if (n.startsWith(q)) return 0;
  if (n.split(" ").some(w => w.startsWith(q))) return 0.5;
  if (n.includes(q)) return 1;
  const maxTypos = q.length <= 3 ? 0 : q.length <= 5 ? 1 : 2;
  const d = levenshtein(q, n.slice(0, q.length));
  if (d <= maxTypos) return 2 + d;
  if (q.length >= 4 && isSubsequence(q, n)) return 4.5;
  return null;
}

function searchCountries(query) {
  const q = normalize(query);
  if (!q) return [];
  const results = [];
  DATA.destinations.forEach(d => {
    let best = null;
    let via = null;
    ["uz", "en", "ru"].forEach(lang => {
      const s = matchScore(q, cname(d.code, lang));
      if (s !== null && (best === null || s < best)) { best = s; via = lang; }
    });
    if (q.length === 2 && normalize(d.code) === q) { best = 0; via = state.lang; }
    if (best !== null) results.push({ code: d.code, score: best, via });
  });
  return results.sort((a, b) => a.score - b.score || cname(a.code).localeCompare(cname(b.code))).slice(0, 7);
}

function initSearch(wrap) {
  const input = $("input", wrap);
  const list = $(".suggest", wrap);
  let items = [];
  let active = -1;

  function close() { list.classList.remove("open"); active = -1; }

  function render() {
    items = searchCountries(input.value);
    if (!input.value.trim()) { close(); return; }
    if (!items.length) {
      list.innerHTML = `<li class="none">${t("search_none")}</li>`;
    } else {
      list.innerHTML = items.map((it, i) => {
        const dest = getDest(it.code);
        const req = getRequirement(state.passport, dest);
        const alt = it.via !== state.lang ? `<small>${escapeHtml(cname(it.code, it.via))}</small>` : "";
        return `<li role="option" data-code="${it.code}" class="${i === active ? "active" : ""}">
          <span class="flag">${flag(it.code)}</span>
          <span class="s-name">${escapeHtml(cname(it.code))}${alt}</span>
          <span class="badge" style="background:${LEVEL_COLORS[req.level]}">${escapeHtml(t("status")[req.status])}</span>
        </li>`;
      }).join("");
    }
    list.classList.add("open");
  }

  function choose(code) {
    input.value = "";
    close();
    selectDestination(code, true);
  }

  input.addEventListener("input", () => { active = -1; render(); });
  input.addEventListener("focus", render);
  input.addEventListener("keydown", e => {
    if (!list.classList.contains("open") || !items.length) {
      if (e.key === "Enter") e.preventDefault();
      return;
    }
    if (e.key === "ArrowDown") { active = (active + 1) % items.length; render(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { active = (active - 1 + items.length) % items.length; render(); e.preventDefault(); }
    else if (e.key === "Enter") { e.preventDefault(); choose(items[Math.max(active, 0)].code); }
    else if (e.key === "Escape") close();
  });
  list.addEventListener("mousedown", e => {
    const li = e.target.closest("li[data-code]");
    if (li) { e.preventDefault(); choose(li.dataset.code); }
  });
  document.addEventListener("click", e => { if (!wrap.contains(e.target)) close(); });
}

/* =========================================================
   4. VIZA KARTASI (boarding pass) + TABLAR
   ========================================================= */
function selectDestination(code, scroll) {
  state.dest = code;
  $("#destSel").value = code;
  check(scroll);
}

function check(scroll) {
  state.passport = $("#passportSel").value;
  state.dest = $("#destSel").value;
  store.set("passport", state.passport);
  store.set("dest", state.dest);
  renderResult();
  renderCalc();
  renderGrid();
  if (scroll && state.dest) {
    $("#check").scrollIntoView({ behavior: "smooth" });
  }
}

function renderResult() {
  const box = $("#result");
  const dest = getDest(state.dest);
  if (!dest) {
    box.innerHTML = `<p class="empty">${t("empty_hint")}</p>`;
    return;
  }
  const req = getRequirement(state.passport, dest);
  const color = LEVEL_COLORS[req.level];
  const fee = req.status === "free" || req.status === "home" || dest.fee[req.status] === "0"
    ? t("free_fee") : (dest.fee[req.status] || "—");
  const range = dest.days[req.status];
  const time = !range ? "—" : range[1] === 0 ? t("instant") : fmt(t("days"), { a: range[0], b: range[1] });
  const meter = [1, 2, 3, 4, 5].map(i => `<span style="${i <= req.level ? `background:${color}` : ""}"></span>`).join("");

  const passHtml = `
    <article class="pass">
      <div class="pass-main">
        <div class="pass-photo" style="background-image:url('${dest.img}')">
          <div class="pass-photo-in">
            <span class="pass-label">${t("pass_title")}</span>
            <span class="pass-brand">VisaCompass</span>
          </div>
        </div>
        <div class="pass-route">
          <div>
            <div class="city">${t("pass_from")}</div>
            <div class="code">${state.passport}</div>
            <div class="city">${flag(state.passport)} ${escapeHtml(cname(state.passport))}</div>
          </div>
          <div class="plane-line">
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>
          </div>
          <div class="to">
            <div class="city">${t("pass_to")}</div>
            <div class="code">${dest.code}</div>
            <div class="city">${flag(dest.code)} ${escapeHtml(cname(dest.code))}</div>
          </div>
        </div>
        <div class="pass-type">
          <div>
            <small>${t("pass_type")}</small>
            <b>${escapeHtml(statusLabel(req, dest))}</b>
          </div>
          ${req.level ? `<span class="badge" style="background:${color}">${t("levels")[req.level]}</span>` : ""}
        </div>
        ${req.status === "home" ? `<p class="home-note">${t("home_text")}</p>` : `
        <div class="pass-fields">
          <div><small>${t("pass_stay")}</small><b>${fmt(t("up_to"), { n: dest.stay })}</b></div>
          <div><small>${t("pass_fee")}</small><b>${escapeHtml(fee)}</b></div>
          <div><small>${t("pass_time")}</small><b>${time}</b></div>
          <div><small>${t("pass_site")}</small><b>${escapeHtml(dest.site)}</b></div>
        </div>`}
      </div>
      <aside class="pass-stub">
        <small class="muted">${t("pass_level")}</small>
        <div class="stub-level" style="color:${color}">${req.level}<small>/5</small></div>
        <div class="meter">${meter}</div>
        <div class="barcode"></div>
        <div class="stub-code">VCP-${state.passport}-${dest.code}-2026</div>
      </aside>
    </article>`;

  if (req.status === "home") {
    box.innerHTML = passHtml;
    return;
  }

  const tabs = [
    ["tourism", t("tab_tourism")],
    ["workstudy", t("tab_workstudy")],
    ["transit", t("tab_transit")]
  ];
  box.innerHTML = passHtml + `
    <div class="tabs" role="tablist">
      ${tabs.map(([k, label]) => `<button role="tab" data-tab="${k}" class="${state.tab === k ? "active" : ""}">${label}</button>`).join("")}
    </div>
    <div class="tab-panel" id="tabPanel"></div>`;

  $$(".tabs button", box).forEach(b => b.addEventListener("click", () => {
    state.tab = b.dataset.tab;
    $$(".tabs button", box).forEach(x => x.classList.toggle("active", x === b));
    renderPanel(dest, req);
  }));
  renderPanel(dest, req);
}

function renderPanel(dest, req) {
  const panel = $("#tabPanel");
  const L = state.lang;
  panel.style.animation = "none";
  void panel.offsetWidth;
  panel.style.animation = "";

  if (state.tab === "tourism") {
    const docs = DATA.documents.tourism[req.status][L];
    const steps = DATA.steps[req.status][L];
    const tips = resolveSet(dest.tips, DATA.tipSets)[L];
    panel.innerHTML = `
      <div class="panel-grid">
        ${checklistHtml("tourism", t("tab_tourism"), docs)}
        <div class="box">
          <h4>${t("steps_title")}</h4>
          <ol class="steps">${steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
          <h4>${t("tips_title")}</h4>
          <ul class="tips">${tips.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </div>
      </div>`;
    bindChecklist(panel, "tourism", t("tab_tourism"), docs);
  }

  else if (state.tab === "workstudy") {
    const sub = state.sub;
    const docs = DATA.documents[sub][L];
    const typeInfo = t("types")[sub === "study" ? 1 : 2];
    const eaeu = sub === "work" && DATA.eaeu.includes(state.passport) && DATA.eaeu.includes(dest.code);
    const note = eaeu ? t("eaeu_note") : LIGHT_STATUSES.includes(req.status) ? t("work_note") : "";
    const title = `${t("tab_workstudy")} — ${t(sub === "work" ? "sub_work" : "sub_study")}`;
    panel.innerHTML = `
      <div class="sub-switch">
        <button data-sub="work" class="${sub === "work" ? "active" : ""}">${t("sub_work")}</button>
        <button data-sub="study" class="${sub === "study" ? "active" : ""}">${t("sub_study")}</button>
      </div>
      <div class="panel-grid">
        ${checklistHtml(sub, title, docs)}
        <div class="box">
          ${note ? `<p class="note">${escapeHtml(note)}</p>` : ""}
          <h4>${escapeHtml(typeInfo.name)}</h4>
          <p class="muted">${escapeHtml(typeInfo.text)}</p>
        </div>
      </div>`;
    $$(".sub-switch button", panel).forEach(b => b.addEventListener("click", () => {
      state.sub = b.dataset.sub;
      renderPanel(dest, req);
    }));
    bindChecklist(panel, sub, title, docs);
  }

  else {
    let key, verdict, color, icon;
    if (LIGHT_STATUSES.includes(req.status)) {
      key = "noneNeeded"; verdict = t("transit_no"); color = LEVEL_COLORS[1]; icon = "✓";
    } else if (dest.transit === "strict") {
      key = "strict"; verdict = t("transit_yes"); color = LEVEL_COLORS[5]; icon = "!";
    } else if (dest.transit === "cn240" && DATA.cn_transit_240h.includes(state.passport)) {
      key = "cn240"; verdict = t("transit_240"); color = LEVEL_COLORS[1]; icon = "✓";
    } else {
      key = "airside"; verdict = t("transit_maybe"); color = LEVEL_COLORS[3]; icon = "?";
    }
    const docs = DATA.documents.transit[L];
    panel.innerHTML = `
      <div class="panel-grid">
        ${checklistHtml("transit", t("tab_transit"), docs)}
        <div class="box">
          <h4>${t("transit_title")}</h4>
          <div class="verdict">
            <span class="dot" style="background:${color}">${icon}</span>
            <b>${verdict}</b>
          </div>
          <p class="muted">${escapeHtml(DATA.transit[key][L])}</p>
        </div>
      </div>`;
    bindChecklist(panel, "transit", t("tab_transit"), docs);
  }
}

/* =========================================================
   5. INTERAKTIV CHEK-LIST + PDF
   Belgilar indeks bo'yicha saqlanadi, shuning uchun til
   almashganda ham saqlanib qoladi.
   ========================================================= */
function checkKey(listKey) {
  return `checks:${state.passport}-${state.dest}-${listKey}`;
}

function checklistHtml(listKey, title, docs) {
  const checked = store.get(checkKey(listKey), []);
  return `
    <div class="box checklist">
      <h4>${t("docs_title")} <small class="count"></small></h4>
      <div class="progress"><i></i></div>
      <ul class="docs">
        ${docs.map((d, i) => `<li><label><input type="checkbox" data-i="${i}" ${checked.includes(i) ? "checked" : ""}><span>${escapeHtml(d)}</span></label></li>`).join("")}
      </ul>
      <div class="box-actions">
        <button class="btn-dark pdf-btn">⤓ ${t("pdf_btn")}</button>
        <button class="btn-ghost reset-btn">${t("reset_btn")}</button>
      </div>
    </div>`;
}

function bindChecklist(root, listKey, title, docs) {
  const box = $(".checklist", root);
  const inputs = $$("input[type=checkbox]", box);

  function update() {
    const checked = inputs.filter(i => i.checked).map(i => Number(i.dataset.i));
    store.set(checkKey(listKey), checked);
    $(".count", box).textContent = fmt(t("docs_progress"), { a: checked.length, b: inputs.length });
    $(".progress i", box).style.width = (checked.length / inputs.length * 100) + "%";
  }
  inputs.forEach(i => i.addEventListener("change", update));
  $(".reset-btn", box).addEventListener("click", () => { inputs.forEach(i => { i.checked = false; }); update(); });
  $(".pdf-btn", box).addEventListener("click", () => exportPdf(title, docs, inputs.map(i => i.checked)));
  update();
}

function exportPdf(title, docs, checks) {
  const dest = getDest(state.dest);
  const req = getRequirement(state.passport, dest);
  const now = new Date();
  const date = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;

  const sheet = document.createElement("div");
  sheet.className = "pdf-sheet";
  sheet.innerHTML = `
    <h1>VisaCompass</h1>
    <h2>${escapeHtml(t("docs_title"))} — ${escapeHtml(title)}</h2>
    <p class="meta">
      ${escapeHtml(cname(state.passport))} (${state.passport}) → ${escapeHtml(cname(dest.code))} (${dest.code})<br>
      ${escapeHtml(t("pass_type"))}: <b>${escapeHtml(statusLabel(req, dest))}</b> ·
      ${escapeHtml(t("pass_level"))}: ${req.level}/5 (${escapeHtml(t("levels")[req.level])})<br>
      ${escapeHtml(t("pdf_date"))}: ${date}
    </p>
    <table>
      ${docs.map((d, i) => `<tr><td>${checks[i] ? "☑" : "☐"}</td><td>${escapeHtml(d)}</td></tr>`).join("")}
    </table>
    <p class="foot">${escapeHtml(t("pdf_note"))} · ${escapeHtml(dest.site)}</p>`;

  const filename = `visacompass-${state.passport}-${dest.code}-${state.tab}.pdf`;

  if (typeof html2pdf === "undefined") {
    // Kutubxona bo'lmasa — brauzerning chop etish oynasi
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>${filename}</title><link rel="stylesheet" href="css/fonts.css"><link rel="stylesheet" href="css/style.css"></head><body style="background:#fff">${sheet.outerHTML}</body></html>`);
    w.document.close();
    w.onload = () => w.print();
    return;
  }

  html2pdf()
    .set({
      margin: 10,
      filename,
      image: { type: "jpeg", quality: 0.95 },
      // scrollX/scrollY: 0 — aks holda sahifa aylantirilganda PDF bo'sh chiqadi
      html2canvas: { scale: 2, backgroundColor: "#ffffff", scrollX: 0, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .from(sheet)
    .save()
    .then(() => toast(t("pdf_made")));
}

/* =========================================================
   6. QOLISH KUNLARI KALKULYATORI (90/180 qoidasi)
   ========================================================= */
const DAY = 24 * 60 * 60 * 1000;

function parseDate(v) {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}
function showDate(ms) {
  const d = new Date(ms);
  return `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${d.getUTCFullYear()}`;
}

function calcDest() {
  return getDest(state.dest) || getDest("FR");
}

function renderCalc() {
  const dest = calcDest();
  const req = getRequirement(state.passport, dest);
  $("#calcCountry").innerHTML = fmt(t("calc_for"), { c: `${flag(dest.code)} ${cname(dest.code)}` });
  $("#calcRule").textContent = req.status === "visa"
    ? fmt(t("calc_rule_visa"), { n: dest.stay })
    : dest.rule180
      ? fmt(t("calc_rule180"), { n: dest.stay })
      : fmt(t("calc_rule_simple"), { n: dest.stay });

  $("#trips").innerHTML = state.trips.map((tr, i) => `
    <div class="trip" data-i="${i}">
      <label>${t("calc_entry")}<input type="date" data-k="in" value="${tr.in}"></label>
      <label>${t("calc_exit")}<input type="date" data-k="out" value="${tr.out}"></label>
      <button class="del" aria-label="remove" ${state.trips.length === 1 ? "disabled" : ""}>✕</button>
    </div>`).join("");

  $$("#trips .trip").forEach(row => {
    const i = Number(row.dataset.i);
    $$("input", row).forEach(inp => inp.addEventListener("input", () => {
      state.trips[i][inp.dataset.k] = inp.value;
      store.set("trips", state.trips);
      computeCalc();
    }));
    $(".del", row).addEventListener("click", () => {
      state.trips.splice(i, 1);
      store.set("trips", state.trips);
      renderCalc();
    });
  });
  computeCalc();
}

function computeCalc() {
  const dest = calcDest();
  const limit = dest.stay;
  const out = $("#calcOut");
  const trips = state.trips
    .map(tr => ({ a: parseDate(tr.in), b: parseDate(tr.out) }))
    .filter(tr => tr.a !== null && tr.b !== null);

  if (trips.some(tr => tr.b < tr.a)) {
    out.innerHTML = `<p class="calc-msg bad">${t("calc_bad")}</p>`;
    return;
  }
  if (!trips.length) {
    out.innerHTML = `<p class="muted">${t("calc_empty")}</p>`;
    return;
  }

  let used, windowText = "";
  if (dest.rule180) {
    // Oxirgi chiqish sanasidan orqaga 180 kunlik oyna
    const ref = Math.max(...trips.map(tr => tr.b));
    const start = ref - 179 * DAY;
    used = trips.reduce((sum, tr) => {
      const a = Math.max(tr.a, start);
      const b = Math.min(tr.b, ref);
      return sum + (b >= a ? Math.round((b - a) / DAY) + 1 : 0);
    }, 0);
    windowText = fmt(t("calc_window"), { a: showDate(start), b: showDate(ref) });
  } else {
    used = Math.max(...trips.map(tr => Math.round((tr.b - tr.a) / DAY) + 1));
  }

  const left = limit - used;
  const pct = Math.min(used / limit, 1) * 100;
  const color = left < 0 ? LEVEL_COLORS[5] : pct > 75 ? LEVEL_COLORS[3] : LEVEL_COLORS[1];
  out.innerHTML = `
    <div class="calc-nums">
      <div><b>${used}</b><small>${t("calc_used")}</small></div>
      <div><b style="color:${color}">${Math.max(left, 0)}</b><small>${t("calc_left")}</small></div>
      <div><b>${limit}</b><small>${t("calc_limit")}</small></div>
    </div>
    <div class="ring"><i style="width:${pct}%;background:${color}"></i></div>
    <p class="calc-msg ${left < 0 ? "bad" : "good"}">${left < 0 ? fmt(t("calc_over"), { n: -left }) : t("calc_ok")}</p>
    ${windowText ? `<p class="calc-window">${windowText}</p>` : ""}`;
}

/* =========================================================
   7. DAVLATLAR RO'YXATI
   ========================================================= */
function renderGrid() {
  $("#countriesSub").innerHTML = fmt(t("countries_sub"), { p: `${flag(state.passport)} ${cname(state.passport)}` });
  const list = DATA.destinations
    .filter(d => d.code !== state.passport)
    .map(d => ({ d, req: getRequirement(state.passport, d) }));

  if (state.sort === "easy") list.sort((a, b) => a.req.level - b.req.level || cname(a.d.code).localeCompare(cname(b.d.code)));
  if (state.sort === "hard") list.sort((a, b) => b.req.level - a.req.level || cname(a.d.code).localeCompare(cname(b.d.code)));
  if (state.sort === "name") list.sort((a, b) => cname(a.d.code).localeCompare(cname(b.d.code), state.lang));

  $("#grid").innerHTML = list.map(({ d, req }) => `
    <button class="tile" data-code="${d.code}" style="background-image:url('${d.img}')">
      <span class="t-level" style="background:${LEVEL_COLORS[req.level]}">${t("levels")[req.level]}</span>
      <h4>${flag(d.code)} ${escapeHtml(cname(d.code))}</h4>
      <span class="t-status">${escapeHtml(statusLabel(req, d))}</span>
      <span class="dots5">${[1, 2, 3, 4, 5].map(i => `<i style="${i <= req.level ? `background:${LEVEL_COLORS[req.level]}` : ""}"></i>`).join("")}</span>
    </button>`).join("");
}

/* =========================================================
   8. VIZA TURLARI, FAQ, MANBALAR
   ========================================================= */
const TYPE_IMAGES = ["images/sky.jpg", "images/travel.jpg", "images/jet.jpg"];

function renderTypes() {
  const type = t("types")[state.typeIdx];
  $("#typeName").textContent = type.name;
  $("#typeText").textContent = type.text;
  $("#typeImg").src = TYPE_IMAGES[state.typeIdx];
}

function renderFaq() {
  $("#faqList").innerHTML = DATA.faq.map((f, i) => `
    <details ${i === 0 ? "open" : ""}>
      <summary>${escapeHtml(f.q[state.lang])}</summary>
      <p>${escapeHtml(f.a[state.lang])}</p>
    </details>`).join("");
}

function renderSources() {
  $("#sources").innerHTML = DATA.sources
    .map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${escapeHtml(s.name)}</a></li>`).join("");
}

/* =========================================================
   9. VIZA YORDAMCHISI (3 savol)
   ========================================================= */
const wiz = { step: 1, passport: "", dest: "" };
const PURPOSES = [
  ["tourism", "🏖"],
  ["work", "💼"],
  ["study", "🎓"],
  ["transit", "🔁"]
];

function openWizard() {
  wiz.step = 1;
  $("#wizard").classList.add("open");
  $("#wizard").setAttribute("aria-hidden", "false");
  renderWizard();
}
function closeWizard() {
  $("#wizard").classList.remove("open");
  $("#wizard").setAttribute("aria-hidden", "true");
}

function renderWizard() {
  $("#wizStep").textContent = fmt(t("wiz_step"), { a: wiz.step, b: 3 });
  $("#wizQ").textContent = t("wiz_q" + wiz.step);
  $("#wizBar").style.width = (wiz.step / 3 * 100) + "%";
  $("#wizBack").style.visibility = wiz.step === 1 ? "hidden" : "visible";
  const box = $("#wizOptions");
  box.classList.toggle("big", wiz.step === 3);

  if (wiz.step === 1) {
    box.innerHTML = sortedCodes(DATA.passports)
      .map(c => `<button data-v="${c}"><span class="flag">${flag(c)}</span>${escapeHtml(cname(c))}</button>`).join("");
  } else if (wiz.step === 2) {
    box.innerHTML = sortedCodes(DATA.destinations.map(d => d.code).filter(c => c !== wiz.passport))
      .map(c => `<button data-v="${c}"><span class="flag">${flag(c)}</span>${escapeHtml(cname(c))}</button>`).join("");
  } else {
    box.innerHTML = PURPOSES
      .map(([k, ico]) => `<button data-v="${k}"><span class="ico">${ico}</span>${t("purpose_" + k)}</button>`).join("");
  }
}

function wizardPick(value) {
  if (wiz.step === 1) { wiz.passport = value; wiz.step = 2; renderWizard(); return; }
  if (wiz.step === 2) { wiz.dest = value; wiz.step = 3; renderWizard(); return; }

  // 3-qadam: natijani yig'ish
  if (value === "work" || value === "study") { state.tab = "workstudy"; state.sub = value; }
  else state.tab = value;
  $("#passportSel").value = wiz.passport;
  $("#destSel").value = wiz.dest;
  closeWizard();
  check(true);
}

/* =========================================================
   10. MAVZU: Kunduzgi reys / Tungi reys
   ========================================================= */
function renderTheme() {
  document.documentElement.dataset.theme = state.theme;
  $("#themeLabel").textContent = t(state.theme === "day" ? "theme_day" : "theme_night");
}

/* =========================================================
   ISHGA TUSHIRISH
   ========================================================= */
async function init() {
  DATA = await loadData();
  if (!DATA) {
    document.body.insertAdjacentHTML("afterbegin", "<p style='padding:20px;color:red'>data/data.json not found</p>");
    return;
  }

  state.lang = store.get("lang", "uz");
  state.theme = store.get("theme", "day");
  state.passport = store.get("passport", "UZ");
  state.dest = store.get("dest", "");
  state.trips = store.get("trips", [{ in: "", out: "" }]);
  if (!DATA.passports.includes(state.passport)) state.passport = "UZ";
  if (!getDest(state.dest)) state.dest = "";
  if (!Array.isArray(state.trips) || !state.trips.length) state.trips = [{ in: "", out: "" }];

  // Tillar
  $$("#langSwitch button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

  // Mavzu
  $("#themeBtn").addEventListener("click", () => {
    state.theme = state.theme === "day" ? "night" : "day";
    store.set("theme", state.theme);
    renderTheme();
  });

  // Menyu
  $("#menuBtn").addEventListener("click", e => { e.stopPropagation(); $("#menu").classList.toggle("open"); });
  document.addEventListener("click", e => { if (!$("#menu").contains(e.target)) $("#menu").classList.remove("open"); });

  // Tekshirish
  $("#checkBtn").addEventListener("click", () => check(false));
  $("#passportSel").addEventListener("change", () => check(false));
  $("#destSel").addEventListener("change", () => check(false));

  // Qidiruvlar
  $$(".hero-search").forEach(initSearch);

  // Kalkulyator
  $("#addTrip").addEventListener("click", () => {
    state.trips.push({ in: "", out: "" });
    store.set("trips", state.trips);
    renderCalc();
  });

  // Davlatlar
  $$(".sort button").forEach(b => b.addEventListener("click", () => {
    state.sort = b.dataset.sort;
    $$(".sort button").forEach(x => x.classList.toggle("active", x === b));
    renderGrid();
  }));
  $("#grid").addEventListener("click", e => {
    const tile = e.target.closest(".tile");
    if (tile) selectDestination(tile.dataset.code, true);
  });

  // Viza turlari
  $("#typePrev").addEventListener("click", () => { state.typeIdx = (state.typeIdx + 2) % 3; renderTypes(); });
  $("#typeNext").addEventListener("click", () => { state.typeIdx = (state.typeIdx + 1) % 3; renderTypes(); });

  // Yordamchi
  $("#wizardBtn").addEventListener("click", openWizard);
  $("#wizardBtn2").addEventListener("click", openWizard);
  $("#wizClose").addEventListener("click", closeWizard);
  $("#wizBack").addEventListener("click", () => { wiz.step = Math.max(1, wiz.step - 1); renderWizard(); });
  $("#wizOptions").addEventListener("click", e => {
    const b = e.target.closest("button[data-v]");
    if (b) wizardPick(b.dataset.v);
  });
  $("#wizard").addEventListener("click", e => { if (e.target.id === "wizard") closeWizard(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeWizard(); });

  applyLang();
}

init();
