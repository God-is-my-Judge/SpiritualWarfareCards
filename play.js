'use strict';

const EDITIONS = {
  easy: {
    label: 'English — Easy to Read (CSB/LSB)',
    day: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Day 1.1.pdf'
    },
    night: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Night 1.1.pdf'
    }
  },
  modern: {
    label: 'English — Modern (CSB/LSB)',
    day: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Day 1.1 (Original Optima).pdf'
    },
    night: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Night 1.1 (Original Optima).pdf'
    }
  },
  kjv: {
    label: 'English — KJV',
    day: {
      scenario: 'Digital/Translations/KJV/SWCG Scenario Day 1.1.pdf',
      scripture: 'Digital/Translations/KJV/SWCG Scripture Day KJV.pdf'
    },
    night: {
      scenario: 'Digital/Translations/KJV/SWCG Scenario Night 1.1.pdf',
      scripture: 'Digital/Translations/KJV/SWCG Scripture Night KJV.pdf'
    }
  },
  es: {
    label: 'Español — RVR09',
    day: {
      scenario: 'Digital/Translations/RVR09/SWCG_Escenarios_Dia_Español.pdf',
      scripture: 'Digital/Translations/RVR09/SWCG_Escrituras_Dia_RVR09.pdf'
    },
    night: {
      scenario: 'Digital/Translations/RVR09/SWCG_Escenarios_Noche_Español.pdf',
      scripture: 'Digital/Translations/RVR09/SWCG_Escrituras_Noche_RVR09.pdf'
    }
  },
  ar: {
    label: 'العربية — SVD',
    day: {
      scenario: 'Digital/Translations/SVD/SWCG_Sīnāriyūhāt_al-Nahār_AR.pdf',
      scripture: 'Digital/Translations/SVD/SWCG_Ayat_Nahar_SVD.pdf'
    },
    night: {
      scenario: 'Digital/Translations/SVD/SWCG_Sīnāriyūhāt_al-Layl_AR.pdf',
      scripture: 'Digital/Translations/SVD/SWCG_Ayat_Layl_SVD.pdf'
    }
  },
  fr: {
    label: 'Français — LS',
    day: {
      scenario: 'Digital/Translations/LS/SWCG_Scenarios_Jour_FR.pdf',
      scripture: 'Digital/Translations/LS/SWCG_Ecritures_Jour_LS.pdf'
    },
    night: {
      scenario: 'Digital/Translations/LS/SWCG_Scenarios_Nuit_FR.pdf',
      scripture: 'Digital/Translations/LS/SWCG_Ecritures_Nuit_LS.pdf'
    }
  },
  ru: {
    label: 'Русский — RST',
    day: {
      scenario: 'Digital/Translations/RST/SWCG_Stsenarii_Den_RU.pdf',
      scripture: 'Digital/Translations/RST/SWCG_Pisaniya_Den_RST.pdf'
    },
    night: {
      scenario: 'Digital/Translations/RST/SWCG_Stsenarii_Noch_RU.pdf',
      scripture: 'Digital/Translations/RST/SWCG_Pisaniya_Noch_RST.pdf'
    }
  },
  zh: {
    label: '中文 — CUV',
    day: {
      scenario: 'Digital/Translations/CUV/SWCG_Qingjing_Ri_CHT.pdf',
      scripture: 'Digital/Translations/CUV/SWCG_Jingwen_Ri_CUV.pdf'
    },
    night: {
      scenario: 'Digital/Translations/CUV/SWCG_Qingjing_Ye_CHT.pdf',
      scripture: 'Digital/Translations/CUV/SWCG_Jingwen_Ye_CUV.pdf'
    }
  },
  "ML-SVP1910": {
    label: "മലയാളം — സത്യവേദപുസ്തകം 1910 · ML-SVP1910",
    day: {
      scenario: "Digital/Translations/ML-SVP1910/SWCG Scenarios Day - Malayalam.pdf",
      scripture: "Digital/Translations/ML-SVP1910/SWCG Scripture Day - Malayalam SVP1910.pdf"
    },
    night: {
      scenario: "Digital/Translations/ML-SVP1910/SWCG Scenarios Night - Malayalam.pdf",
      scripture: "Digital/Translations/ML-SVP1910/SWCG Scripture Night - Malayalam SVP1910.pdf"
    }
  },
  "ML-IRV": {
    label: "മലയാളം — ഇന്ത്യൻ റിവൈസ്ഡ് വേർഷൻ · ML-IRV",
    day: {
      scenario: "Digital/Translations/ML-IRV/SWCG Scenarios Day - Malayalam.pdf",
      scripture: "Digital/Translations/ML-IRV/SWCG Scripture Day - Malayalam IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/ML-IRV/SWCG Scenarios Night - Malayalam.pdf",
      scripture: "Digital/Translations/ML-IRV/SWCG Scripture Night - Malayalam IRV.pdf"
    }
  },
  "HI-IRV": {
    label: "हिन्दी — इंडियन रिवाइज्ड वर्जन · HI-IRV",
    day: {
      scenario: "Digital/Translations/HI-IRV/SWCG Scenarios Day - Hindi.pdf",
      scripture: "Digital/Translations/HI-IRV/SWCG Scripture Day - Hindi IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/HI-IRV/SWCG Scenarios Night - Hindi.pdf",
      scripture: "Digital/Translations/HI-IRV/SWCG Scripture Night - Hindi IRV.pdf"
    }
  },
  "TA-IRV": {
    label: "தமிழ் — இந்தியன் ரிவைஸ்டு வெர்ஸன் · TA-IRV",
    day: {
      scenario: "Digital/Translations/TA-IRV/SWCG Scenarios Day - Tamil.pdf",
      scripture: "Digital/Translations/TA-IRV/SWCG Scripture Day - Tamil IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/TA-IRV/SWCG Scenarios Night - Tamil.pdf",
      scripture: "Digital/Translations/TA-IRV/SWCG Scripture Night - Tamil IRV.pdf"
    }
  },
  "TE-IRV": {
    label: "తెలుగు — ఇండియన్ రివైజ్డ్ వెర్షన్ · TE-IRV",
    day: {
      scenario: "Digital/Translations/TE-IRV/SWCG Scenarios Day - Telugu.pdf",
      scripture: "Digital/Translations/TE-IRV/SWCG Scripture Day - Telugu IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/TE-IRV/SWCG Scenarios Night - Telugu.pdf",
      scripture: "Digital/Translations/TE-IRV/SWCG Scripture Night - Telugu IRV.pdf"
    }
  },
  "KN-IRV": {
    label: "ಕನ್ನಡ — ಇಂಡಿಯನ್ ರಿವೈಜ್ಡ್ ವರ್ಸನ್ · KN-IRV",
    day: {
      scenario: "Digital/Translations/KN-IRV/SWCG Scenarios Day - Kannada.pdf",
      scripture: "Digital/Translations/KN-IRV/SWCG Scripture Day - Kannada IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/KN-IRV/SWCG Scenarios Night - Kannada.pdf",
      scripture: "Digital/Translations/KN-IRV/SWCG Scripture Night - Kannada IRV.pdf"
    }
  },
  "MR-IRV": {
    label: "मराठी — इंडियन रीवाइज्ड वर्जन · MR-IRV",
    day: {
      scenario: "Digital/Translations/MR-IRV/SWCG Scenarios Day - Marathi.pdf",
      scripture: "Digital/Translations/MR-IRV/SWCG Scripture Day - Marathi IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/MR-IRV/SWCG Scenarios Night - Marathi.pdf",
      scripture: "Digital/Translations/MR-IRV/SWCG Scripture Night - Marathi IRV.pdf"
    }
  },
  "GU-IRV": {
    label: "ગુજરાતી — ઇન્ડિયન રિવાઇઝ્ડ વર્ઝન · GU-IRV",
    day: {
      scenario: "Digital/Translations/GU-IRV/SWCG Scenarios Day - Gujarati.pdf",
      scripture: "Digital/Translations/GU-IRV/SWCG Scripture Day - Gujarati IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/GU-IRV/SWCG Scenarios Night - Gujarati.pdf",
      scripture: "Digital/Translations/GU-IRV/SWCG Scripture Night - Gujarati IRV.pdf"
    }
  },
  "PA-IRV": {
    label: "ਪੰਜਾਬੀ — ਇੰਡਿਅਨ ਰਿਵਾਇਜ਼ਡ ਵਰਜ਼ਨ · PA-IRV",
    day: {
      scenario: "Digital/Translations/PA-IRV/SWCG Scenarios Day - Punjabi.pdf",
      scripture: "Digital/Translations/PA-IRV/SWCG Scripture Day - Punjabi IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/PA-IRV/SWCG Scenarios Night - Punjabi.pdf",
      scripture: "Digital/Translations/PA-IRV/SWCG Scripture Night - Punjabi IRV.pdf"
    }
  },
  "BN-IRV": {
    label: "বাংলা — ইন্ডিয়ান রিভাইজড ভার্সন · BN-IRV",
    day: {
      scenario: "Digital/Translations/BN-IRV/SWCG Scenarios Day - Bengali.pdf",
      scripture: "Digital/Translations/BN-IRV/SWCG Scripture Day - Bengali IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/BN-IRV/SWCG Scenarios Night - Bengali.pdf",
      scripture: "Digital/Translations/BN-IRV/SWCG Scripture Night - Bengali IRV.pdf"
    }
  },
  "AS-IRV": {
    label: "অসমীয়া — ইণ্ডিয়ান ৰিভাইজ্ড ভাৰ্চন · AS-IRV",
    day: {
      scenario: "Digital/Translations/AS-IRV/SWCG Scenarios Day - Assamese.pdf",
      scripture: "Digital/Translations/AS-IRV/SWCG Scripture Day - Assamese IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/AS-IRV/SWCG Scenarios Night - Assamese.pdf",
      scripture: "Digital/Translations/AS-IRV/SWCG Scripture Night - Assamese IRV.pdf"
    }
  },
  "OR-IRV": {
    label: "ଓଡ଼ିଆ — ଇଣ୍ଡିଆନ ରିଭାଇଜଡ ଭର୍ସନ · OR-IRV",
    day: {
      scenario: "Digital/Translations/OR-IRV/SWCG Scenarios Day - Oriya.pdf",
      scripture: "Digital/Translations/OR-IRV/SWCG Scripture Day - Oriya IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/OR-IRV/SWCG Scenarios Night - Oriya.pdf",
      scripture: "Digital/Translations/OR-IRV/SWCG Scripture Night - Oriya IRV.pdf"
    }
  },
  "TL-ULB": {
    label: "Tagalog — Banal na Bibliya · TL-ULB",
    day: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf",
      scripture: "Digital/Translations/TL-ULB/SWCG Scripture Day - Tagalog ULB.pdf"
    },
    night: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf",
      scripture: "Digital/Translations/TL-ULB/SWCG Scripture Night - Tagalog ULB.pdf"
    }
  },
  "CEB-APSD": {
    label: "Cebuano — Ang Pulong sa Dios · CEB-APSD",
    day: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf",
      scripture: "Digital/Translations/CEB-APSD/SWCG Scripture Day - Cebuano APSD.pdf"
    },
    night: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf",
      scripture: "Digital/Translations/CEB-APSD/SWCG Scripture Night - Cebuano APSD.pdf"
    }
  },
  "HIL-APSGD": {
    label: "Hiligaynon — Ang Pulong Sang Dios · HIL-APSGD",
    day: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf",
      scripture: "Digital/Translations/HIL-APSGD/SWCG Scripture Day - Hiligaynon APSGD.pdf"
    },
    night: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf",
      scripture: "Digital/Translations/HIL-APSGD/SWCG Scripture Night - Hiligaynon APSGD.pdf"
    }
  },
  "ILO-ULB": {
    label: "Ilocano — Ti Biblia · ILO-ULB",
    day: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf",
      scripture: "Digital/Translations/ILO-ULB/SWCG Scripture Day - Ilocano ULB.pdf"
    },
    night: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf",
      scripture: "Digital/Translations/ILO-ULB/SWCG Scripture Night - Ilocano ULB.pdf"
    }
  },
  "PT-BPM": {
    label: "Portuguese — Bíblia Portuguesa Mundial · PT-BPM",
    day: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf",
      scripture: "Digital/Translations/PT-BPM/SWCG Scripture Day - Portuguese BPM.pdf"
    },
    night: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf",
      scripture: "Digital/Translations/PT-BPM/SWCG Scripture Night - Portuguese BPM.pdf"
    }
  },
  "PT-NBV": {
    label: "Portuguese — Nova Bíblia Viva · PT-NBV",
    day: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf",
      scripture: "Digital/Translations/PT-NBV/SWCG Scripture Day - Portuguese NBV.pdf"
    },
    night: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf",
      scripture: "Digital/Translations/PT-NBV/SWCG Scripture Night - Portuguese NBV.pdf"
    }
  },
  "SW-NENO": {
    label: "Kiswahili — Neno: Bibilia Takatifu · SW-NENO",
    day: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf",
      scripture: "Digital/Translations/SW-NENO/SWCG Scripture Day - Swahili NENO.pdf"
    },
    night: {
      scenario: "Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf",
      scripture: "Digital/Translations/SW-NENO/SWCG Scripture Night - Swahili NENO.pdf"
    }
  },
  "UR-IRV": {
    label: "उर्दू — इंडियन रिवाइज्ड वर्जन · UR-IRV",
    day: {
      scenario: "Digital/Translations/UR-IRV/SWCG Scenarios Day - Urdu.pdf",
      scripture: "Digital/Translations/UR-IRV/SWCG Scripture Day - Urdu IRV.pdf"
    },
    night: {
      scenario: "Digital/Translations/UR-IRV/SWCG Scenarios Night - Urdu.pdf",
      scripture: "Digital/Translations/UR-IRV/SWCG Scripture Night - Urdu IRV.pdf"
    }
  },
  "DE-LUT1912": {
    label: "Deutsch — Lutherbibel 1912 · DE-LUT1912",
    day: {
      scenario: "Digital/Translations/DE-LUT1912/SWCG Scenarios Day - German.pdf",
      scripture: "Digital/Translations/DE-LUT1912/SWCG Scripture Day - German LUT1912.pdf"
    },
    night: {
      scenario: "Digital/Translations/DE-LUT1912/SWCG Scenarios Night - German.pdf",
      scripture: "Digital/Translations/DE-LUT1912/SWCG Scripture Night - German LUT1912.pdf"
    }
  },
  "DE-ELB1905": {
    label: "Deutsch — Elberfelder 1905 · DE-ELB1905",
    day: {
      scenario: "Digital/Translations/DE-ELB1905/SWCG Scenarios Day - German.pdf",
      scripture: "Digital/Translations/DE-ELB1905/SWCG Scripture Day - German ELB1905.pdf"
    },
    night: {
      scenario: "Digital/Translations/DE-ELB1905/SWCG Scenarios Night - German.pdf",
      scripture: "Digital/Translations/DE-ELB1905/SWCG Scripture Night - German ELB1905.pdf"
    }
  },
};


/* Public deep-link codes, for URLs printed on advertisements:
   spiritualwarfarecards.com/play.html#CSB  or  #LS, #SVD, #HI-IRV ...
   The original seven have terse internal keys nobody would guess from a poster,
   so each gets its published abbreviation as an alias. The new editions are
   already named by their code and alias to themselves. Matching is
   case-insensitive so #csb, #CSB and #Csb all work. */
const EDITION_ALIASES = {
  CSB: 'modern', LSB: 'modern', MODERN: 'modern', EASY: 'easy',
  KJV: 'kjv', RVR09: 'es', ES: 'es', SVD: 'ar', AR: 'ar',
  LS: 'fr', FR: 'fr', RST: 'ru', RU: 'ru', CUV: 'zh', ZH: 'zh'
};
Object.keys(EDITIONS).forEach(key => {
  if (/-|^ML-|^DE-/.test(key) || key === key.toUpperCase()) EDITION_ALIASES[key] = key;
});

/* Resolve #CSB / ?edition=CSB / a raw internal key to an EDITIONS key. */
function resolveEdition(raw) {
  if (!raw) return null;
  const v = decodeURIComponent(String(raw)).trim();
  if (EDITIONS[v]) return v;
  const up = v.toUpperCase();
  if (EDITION_ALIASES[up] && EDITIONS[EDITION_ALIASES[up]]) return EDITION_ALIASES[up];
  const hit = Object.keys(EDITIONS).find(k => k.toUpperCase() === up);
  return hit && EDITIONS[hit] ? hit : null;
}

const state = {
  edition: 'easy',
  mode: 'day',
  docs: { scenario: null, scripture: null },
  paths: { scenario: '', scripture: '' },
  documentCache: new Map(),
  loadCache: new Map(),
  deckStates: new Map(),
  generation: 0
};

const statusNode = document.getElementById('game-status');
const scenarioCard = document.getElementById('scenario-card');
const scriptureCards = [...document.querySelectorAll('#scripture-hand .pdf-card-view')];
const allCards = [scenarioCard, ...scriptureCards];
const dialog = document.getElementById('card-dialog');

function setStatus(message, error = false) {
  statusNode.textContent = message;
  statusNode.classList.toggle('error', error);
}

function deckKey() {
  return `${state.edition}:${state.mode}`;
}

function currentDeckState(create = true) {
  const key = deckKey();
  if (!state.deckStates.has(key) && create) {
    state.deckStates.set(key, {
      used: { scenario: [], scripture: [] },
      scenarioPage: null,
      scripturePages: Array(scriptureCards.length).fill(null)
    });
  }
  return state.deckStates.get(key) || null;
}

function shuffledPage(kind) {
  const deck = currentDeckState();
  const maximum = kind === 'scenario' ? 12 : 42;
  let available = Array.from({ length: maximum }, (_, index) => index + 1)
    .filter(page => !deck.used[kind].includes(page));
  if (!available.length) {
    deck.used[kind] = [];
    available = Array.from({ length: maximum }, (_, index) => index + 1);
  }
  const page = available[Math.floor(Math.random() * available.length)];
  deck.used[kind].push(page);
  return page;
}

async function getDocument(kind) {
  const path = EDITIONS[state.edition][state.mode][kind];
  if (state.docs[kind] && state.paths[kind] === path) return state.docs[kind];
  if (state.documentCache.has(path)) {
    const documentProxy = state.documentCache.get(path);
    state.docs[kind] = documentProxy;
    state.paths[kind] = path;
    return documentProxy;
  }
  if (state.loadCache.has(path)) return state.loadCache.get(path);

  const url = new URL(path, document.baseURI).href;
  const promise = (async () => {
    const response = await fetch(url, {
      credentials: 'same-origin',
      cache: 'force-cache'
    });
    if (!response.ok) throw new Error(`${kind} PDF returned HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      throw new Error(`${kind} PDF was redirected to an HTML sign-in page`);
    }
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 1000) throw new Error(`${kind} PDF download was incomplete`);
    const task = window.pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
    const documentProxy = await task.promise;
    if (documentProxy.numPages < (kind === 'scenario' ? 12 : 42)) {
      throw new Error(`${kind} PDF contains fewer cards than expected`);
    }
    state.documentCache.set(path, documentProxy);
    if (EDITIONS[state.edition][state.mode][kind] === path) {
      state.docs[kind] = documentProxy;
      state.paths[kind] = path;
    }
    return documentProxy;
  })();

  state.loadCache.set(path, promise);
  try {
    return await promise;
  } finally {
    state.loadCache.delete(path);
  }
}

function invalidateDocuments() {
  state.docs = { scenario: null, scripture: null };
  state.paths = { scenario: '', scripture: '' };
}

async function renderPage(card, kind, pageNumber, generation = state.generation) {
  card.dataset.kind = kind;
  card.dataset.page = String(pageNumber);
  const loading = card.querySelector('.card-loading');
  if (loading) loading.hidden = false;
  const documentProxy = await getDocument(kind);
  if (generation !== state.generation) return;
  const page = await documentProxy.getPage(pageNumber);
  const canvas = card.querySelector('canvas');
  const base = page.getViewport({ scale: 1 });
  const desiredWidth = Math.min(1100, Math.max(520, card.clientWidth * Math.min(window.devicePixelRatio || 1, 2)));
  const viewport = page.getViewport({ scale: desiredWidth / base.width });
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  await page.render({ canvasContext: canvas.getContext('2d', { alpha: false }), viewport }).promise;
  if (generation !== state.generation) return;
  if (loading) loading.hidden = true;
}

async function drawCard(card, kind) {
  const page = shuffledPage(kind);
  const deck = currentDeckState();
  if (kind === 'scenario') deck.scenarioPage = page;
  else deck.scripturePages[scriptureCards.indexOf(card)] = page;
  try {
    await renderPage(card, kind, page);
    setStatus(`${EDITIONS[state.edition].label} · ${state.mode === 'day' ? 'Day' : 'Night'} deck`);
  } catch (error) {
    console.error(error);
    setStatus(`The cards could not load: ${error.message}.`, true);
  }
}

async function drawHand() {
  await Promise.all(scriptureCards.map(card => drawCard(card, 'scripture')));
}

async function newRound() {
  state.generation += 1;
  const generation = state.generation;
  const deck = currentDeckState();
  allCards.forEach(card => { const loading = card.querySelector('.card-loading'); if (loading) loading.hidden = false; });
  setStatus('Loading the selected PDFs…');
  try {
    const scenarioPage = shuffledPage('scenario');
    const scripturePages = scriptureCards.map(() => shuffledPage('scripture'));
    deck.scenarioPage = scenarioPage;
    deck.scripturePages = [...scripturePages];
    await Promise.all([
      renderPage(scenarioCard, 'scenario', scenarioPage, generation),
      ...scriptureCards.map((card, index) => renderPage(card, 'scripture', scripturePages[index], generation))
    ]);
    if (generation === state.generation) setStatus(`${EDITIONS[state.edition].label} · ${state.mode === 'day' ? 'Day' : 'Night'} deck`);
  } catch (error) {
    console.error(error);
    setStatus(`The cards could not load: ${error.message}. Try New round again or use the downloads on Translations.`, true);
  }
}

async function restoreDeckOrDeal() {
  const deck = currentDeckState();
  const hasCompleteTable = deck.scenarioPage && deck.scripturePages.every(Boolean);
  if (!hasCompleteTable) return newRound();

  state.generation += 1;
  const generation = state.generation;
  allCards.forEach(card => { const loading = card.querySelector('.card-loading'); if (loading) loading.hidden = false; });
  setStatus(`Restoring the ${state.mode === 'day' ? 'Day' : 'Night'} table…`);
  try {
    await Promise.all([
      renderPage(scenarioCard, 'scenario', deck.scenarioPage, generation),
      ...scriptureCards.map((card, index) => renderPage(card, 'scripture', deck.scripturePages[index], generation))
    ]);
    if (generation === state.generation) {
      setStatus(`${EDITIONS[state.edition].label} · ${state.mode === 'day' ? 'Day' : 'Night'} deck · restored`);
    }
  } catch (error) {
    console.error(error);
    setStatus(`The saved table could not load: ${error.message}.`, true);
  }
}

async function enlarge(card) {
  const kind = card.dataset.kind;
  const pageNumber = Number(card.dataset.page);
  if (!kind || !pageNumber) return;
  try {
    const page = await state.docs[kind].getPage(pageNumber);
    const canvas = dialog.querySelector('canvas');
    const base = page.getViewport({ scale: 1 });
    const maxWidth = Math.min(window.innerWidth * .9, 1500);
    const maxHeight = window.innerHeight * .88;
    const scale = Math.min(maxWidth / base.width, maxHeight / base.height) * Math.min(window.devicePixelRatio || 1, 2);
    const viewport = page.getViewport({ scale });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    await page.render({ canvasContext: canvas.getContext('2d', { alpha: false }), viewport }).promise;
    dialog.showModal();
  } catch (error) { console.error(error); }
}

function selectMode(mode) {
  if (state.mode === mode) return;
  state.mode = mode;
  ['day', 'night'].forEach(value => {
    const button = document.getElementById(`${value}-mode`);
    const active = value === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  syncGameTheme();
  invalidateDocuments();
  restoreDeckOrDeal();
}

function syncGameTheme() {
  if (typeof applyTheme === 'function') applyTheme(state.mode);
  try {
    localStorage.setItem('swcg_play_mode', state.mode);
    localStorage.setItem('swcg_theme', state.mode);
  } catch (_) {}
}

if (!window.pdfjsLib) {
  setStatus('PDF rendering could not start. Check your connection, or use the downloads on the Translations page.', true);
} else {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';

  document.getElementById('edition-select').addEventListener('change', event => {
    state.edition = event.target.value;
    try { localStorage.setItem('swcg_play_edition', state.edition); } catch (_) {}
    // Keep the address bar shareable: whatever is selected is what a copied
    // link will open. replaceState so this does not fill the back button.
    try {
      const code = Object.keys(EDITION_ALIASES).find(
        k => EDITION_ALIASES[k] === state.edition && k.toUpperCase() === k) || state.edition;
      history.replaceState(null, '', '#' + code);
    } catch (_) {}
    invalidateDocuments();
    restoreDeckOrDeal();
  });

  // The hash is live, not just an entry condition. Editing
  // .../play.html#KJV in the address bar and pressing Enter fires
  // `hashchange` without reloading the page, so reading the hash only at
  // startup left the URL saying one edition while the table showed another.
  // An unrecognised code is ignored rather than snapping the game somewhere
  // the visitor did not ask for -- a typo should leave the deck alone.
  window.addEventListener('hashchange', () => {
    const wanted = resolveEdition(location.hash.slice(1));
    if (!wanted || wanted === state.edition) return;
    state.edition = wanted;
    try { localStorage.setItem('swcg_play_edition', state.edition); } catch (_) {}
    document.getElementById('edition-select').value = state.edition;
    invalidateDocuments();
    restoreDeckOrDeal();
  });
  document.getElementById('day-mode').addEventListener('click', () => selectMode('day'));
  document.getElementById('night-mode').addEventListener('click', () => selectMode('night'));
  document.getElementById('new-round').addEventListener('click', newRound);
  document.getElementById('replace-scenario').addEventListener('click', () => drawCard(scenarioCard, 'scenario'));
  document.getElementById('replace-hand').addEventListener('click', drawHand);

  scriptureCards.forEach(card => {
    card.querySelector('.card-action').addEventListener('click', event => {
      event.stopPropagation();
      drawCard(card, 'scripture');
    });
  });
  allCards.forEach(card => {
    card.addEventListener('click', event => { if (!event.target.closest('.card-action')) enlarge(card); });
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); enlarge(card); } });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', () => dialog.close());

  const query = new URLSearchParams(location.search);
  const queryMode = query.get('mode');
  // #CSB is what goes on a poster; ?edition=modern is the older form. Both work.
  const queryEdition = resolveEdition(location.hash.slice(1))
                    || resolveEdition(query.get('edition'));
  try {
    const savedEdition = localStorage.getItem('swcg_play_edition');
    const savedMode = localStorage.getItem('swcg_play_mode');
    if (queryEdition) state.edition = queryEdition;
    else if (savedEdition && EDITIONS[savedEdition]) state.edition = savedEdition;
    if (queryMode === 'day' || queryMode === 'night') state.mode = queryMode;
    else if (savedMode === 'day' || savedMode === 'night') state.mode = savedMode;
  } catch (_) {}
  document.getElementById('edition-select').value = state.edition;
  ['day', 'night'].forEach(value => {
    const active = value === state.mode;
    document.getElementById(`${value}-mode`).classList.toggle('active', active);
    document.getElementById(`${value}-mode`).setAttribute('aria-pressed', String(active));
  });
  syncGameTheme();
  restoreDeckOrDeal();
}
