'use strict';

const EDITIONS = {
  easy: {
    label: 'English — Easy to Read (CSB/LSB)',
    day: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Day and Night 1.1.pdf'
    },
    night: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Day and Night 1.1.pdf',
      scriptureOffset: 42
    }
  },
  modern: {
    label: 'English — Modern (CSB/LSB)',
    day: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Day 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Day and Night 1.1 (Original Optima).pdf'
    },
    night: {
      scenario: 'Digital/Translations/CSB/SWCG Scenario Night 1.1.pdf',
      scripture: 'Digital/Translations/CSB/SWCG Scripture Day and Night 1.1 (Original Optima).pdf',
      scriptureOffset: 42
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
      scenario: "Digital/Translations/PT-BPM/SWCG Scenarios Day - Portuguese.pdf",
      scripture: "Digital/Translations/PT-BPM/SWCG Scripture Day - Portuguese BPM.pdf"
    },
    night: {
      scenario: "Digital/Translations/PT-BPM/SWCG Scenarios Night - Portuguese.pdf",
      scripture: "Digital/Translations/PT-BPM/SWCG Scripture Night - Portuguese BPM.pdf"
    }
  },
  "PT-NBV": {
    label: "Portuguese — Nova Bíblia Viva · PT-NBV",
    day: {
      scenario: "Digital/Translations/PT-NBV/SWCG Scenarios Day - Portuguese.pdf",
      scripture: "Digital/Translations/PT-NBV/SWCG Scripture Day - Portuguese NBV.pdf"
    },
    night: {
      scenario: "Digital/Translations/PT-NBV/SWCG Scenarios Night - Portuguese.pdf",
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
const scriptureHand = document.getElementById('scripture-hand');
const scriptureCards = [...scriptureHand.querySelectorAll('.pdf-card-view')];
const allCards = [scenarioCard, ...scriptureCards];
const dialog = document.getElementById('card-dialog');
const replaceEnlarged = document.getElementById('replace-enlarged-card');
const editionSelect = document.getElementById('edition-select');
const translationDownload = document.getElementById('translation-download');
const translationCredits = document.querySelectorAll('[data-credit-for]');
const ccTranslationCredits = document.getElementById('cc-translation-credits');
const layoutSelect = document.getElementById('hand-layout');
const fullBottomCard = document.getElementById('full-bottom-card');
const playSettings = document.getElementById('play-settings');
const handHint = document.getElementById('hand-hint');
const pendingRenders = new WeakMap();
const cardPageOffsets = new WeakMap();
let translationPackages;
let viewedCard;
let cardMotion;
let closingCard = false;

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
  const edition = EDITIONS[state.edition];
  const path = edition[state.mode][kind];
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
    const labels = await documentProxy.getPageLabels();
    const firstCardOffset = labels?.[0] === 'Copyright' ? 1 : 0;
    const nightOffset = path === edition.night.scripture ? (edition.night.scriptureOffset ?? 0) : 0;
    const requiredCards = kind === 'scenario' ? 12 : 42 + nightOffset;
    if (documentProxy.numPages - firstCardOffset < requiredCards) {
      throw new Error(`${kind} PDF contains fewer cards than expected`);
    }
    cardPageOffsets.set(documentProxy, firstCardOffset);
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

function getCardPage(documentProxy, kind, pageNumber) {
  const coverOffset = cardPageOffsets.get(documentProxy) ?? 0;
  const deck = EDITIONS[state.edition][state.mode];
  const sectionOffset = kind === 'scripture' ? (deck.scriptureOffset ?? 0) : 0;
  return documentProxy.getPage(pageNumber + coverOffset + sectionOffset);
}

function invalidateDocuments() {
  state.docs = { scenario: null, scripture: null };
  state.paths = { scenario: '', scripture: '' };
}

async function scripturePeek(page, viewport) {
  const { items } = await page.getTextContent();
  const baseline = item => viewport.convertToViewportPoint(item.transform[4], item.transform[5])[1];
  // Fold each card just under its printed divider, so the whole headline
  // shows and the passage stays hidden.
  const divider = items.find(item => /~(?:\s*~){3,}/.test(item.str));
  let fold;
  if (divider) {
    fold = baseline(divider) + viewport.height * .003;
  } else {
    // Some cards print no divider. The headline is the largest type on the
    // card, so fold just above the first smaller line beneath it.
    const lines = items.filter(item => item.str.trim() && item.height);
    const headlineSize = Math.max(...lines.map(item => item.height)) * .9;
    const headlineEnd = Math.max(...lines.filter(item => item.height >= headlineSize).map(baseline));
    const passage = lines
      .filter(item => item.height < headlineSize && baseline(item) > headlineEnd + 1)
      .sort((a, b) => baseline(a) - baseline(b))[0];
    if (!passage) return .4;
    fold = baseline(passage) - passage.height * 1.1;
  }
  return Math.max(.15, Math.min(.65, fold / viewport.height));
}

// The scenario's title is the largest type on the card. Its box (with a little room) is the
// window the card narrows to when folded, so long and two-line titles fit in every edition.
async function scenarioBand(page, viewport) {
  const { items } = await page.getTextContent();
  const lines = items.filter(item => item.str.trim() && item.height);
  if (!lines.length) return null;
  const big = Math.max(...lines.map(item => item.height)) * .85;
  const placed = lines.map(item => ({ item, at: viewport.convertToViewportPoint(item.transform[4], item.transform[5]) }));
  let top = Infinity, baseline = 0, bottom = 0, left = Infinity, right = 0;
  for (const { item, at: [x, y] } of placed.filter(({ item }) => item.height >= big)) {
    top = Math.min(top, y - item.height * .78);
    baseline = Math.max(baseline, y);
    bottom = Math.max(bottom, y + item.height * .22);
    left = Math.min(left, x, x + item.width);
    right = Math.max(right, x, x + item.width);
  }
  // Even room above and below the title, but never reaching the line beneath it.
  const next = Math.min(Infinity, ...placed.filter(({ item, at }) => item.height < big && at[1] - item.height * .75 > baseline)
    .map(({ item, at }) => at[1] - item.height * .75));
  const room = Math.max(.006, Math.min(.024, (next - bottom) / viewport.height - .006));
  const t = top / viewport.height - room, b = bottom / viewport.height + room;
  if (!(t >= 0 && t < .55 && b - t > .05)) return null;
  const mid = (left + right) / 2 / viewport.width, half = Math.max(.27, (right - left) / 2 / viewport.width + .035);
  return { t, b: Math.min(.85, b), l: Math.max(.07, mid - half), r: Math.min(.93, mid + half) };
}

async function renderPage(card, kind, pageNumber, generation = state.generation) {
  const request = {};
  pendingRenders.set(card, request);
  const loading = card.querySelector('.card-loading');
  loading.hidden = false;
  const documentProxy = await getDocument(kind);
  if (generation !== state.generation || pendingRenders.get(card) !== request) return;
  const page = await getCardPage(documentProxy, kind, pageNumber);
  const canvas = document.createElement('canvas');
  const base = page.getViewport({ scale: 1 });
  // Render at the hand's width so switching from the grid to the stack
  // keeps the current cards sharp without drawing a new hand.
  const displayWidth = kind === 'scripture' ? scriptureHand.clientWidth : Math.max(card.clientWidth, Math.min(520, card.parentElement.clientWidth));
  const desiredWidth = Math.min(1100, Math.max(520, displayWidth * Math.min(window.devicePixelRatio || 1, 2)));
  const viewport = page.getViewport({ scale: desiredWidth / base.width });
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const [, peek, band] = await Promise.all([
    page.render({ canvasContext: canvas.getContext('2d', { alpha: false }), viewport }).promise,
    kind === 'scripture' ? scripturePeek(page, base).catch(() => .4) : null,
    kind === 'scenario' ? scenarioBand(page, base).catch(() => null) : null
  ]);
  if (generation !== state.generation || pendingRenders.get(card) !== request) return;
  card.querySelector('canvas').replaceWith(canvas);
  card.dataset.kind = kind;
  card.dataset.page = String(pageNumber);
  if (peek) card.style.setProperty('--card-peek', peek);
  if (kind === 'scenario') { card.dataset.band = band ? [band.t, band.b, band.l, band.r].map(v => v.toFixed(3)).join(',') : ''; requestFold(); }
  loading.hidden = true;
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

function animateCardDialog(card, closing) {
  const crop = scriptureHand.dataset.layout === 'stack' ? card : card.querySelector('.card-open') || card;
  const { left, top, right, bottom } = crop.getBoundingClientRect();
  const preview = card.querySelector('canvas');
  const previewBox = preview.getBoundingClientRect();
  const dialogBox = dialog.getBoundingClientRect();
  const artwork = dialog.querySelector('canvas').getBoundingClientRect();
  if (!previewBox.width || !previewBox.height || !artwork.width || !artwork.height) return;

  // Align the full artwork with the preview's canvas, then clip it to the visible card.
  // The canvas can be taller than a stacked headline or offset inside a folded scenario.
  const previewScale = Math.min(previewBox.width / preview.width, previewBox.height / preview.height);
  const width = preview.width * previewScale;
  const height = preview.height * previewScale;
  const scaleX = width / artwork.width;
  const scaleY = height / artwork.height;
  const x = previewBox.left + (previewBox.width - width) / 2 - (artwork.left - dialogBox.left) * scaleX;
  const y = previewBox.top + (previewBox.height - height) / 2 - (artwork.top - dialogBox.top) * scaleY;
  const radius = parseFloat(getComputedStyle(crop).borderTopLeftRadius);
  const collapsed = {
    transform: `translate(${x - dialogBox.left}px, ${y - dialogBox.top}px) scale(${scaleX}, ${scaleY})`,
    clipPath: `inset(${(top - y) / scaleY}px ${(x + dialogBox.width * scaleX - right) / scaleX}px ${(y + dialogBox.height * scaleY - bottom) / scaleY}px ${(left - x) / scaleX}px round ${radius / scaleX}px / ${radius / scaleY}px)`
  };
  const expanded = {
    transform: 'translate(0px, 0px) scale(1, 1)',
    clipPath: `inset(0px round ${getComputedStyle(dialog).borderTopLeftRadius})`
  };
  return dialog.animate(closing ? [expanded, collapsed] : [collapsed, expanded], {
    duration: closing ? 250 : 320,
    easing: closing ? 'cubic-bezier(.45, 0, .75, .4)' : 'cubic-bezier(.2, .7, .25, 1)',
    fill: 'both'
  });
}

async function sharpenEnlargedCard(kind, pageNumber, canvas) {
  try {
    const page = await getCardPage(state.docs[kind], kind, pageNumber);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: canvas.width / base.width });
    const sharp = document.createElement('canvas');
    sharp.width = canvas.width;
    sharp.height = canvas.height;
    await page.render({ canvasContext: sharp.getContext('2d', { alpha: false }), viewport }).promise;
    if (dialog.open && dialog.querySelector('canvas') === canvas) canvas.getContext('2d').drawImage(sharp, 0, 0);
  } catch (error) { console.error(error); }
}

function enlarge(card) {
  const kind = card.dataset.kind;
  const pageNumber = Number(card.dataset.page);
  if (dialog.open || !pageNumber || !card.querySelector('.card-loading').hidden) return;
  const preview = card.querySelector('canvas');
  const canvas = document.createElement('canvas');
  const scale = Math.min(Math.min(window.innerWidth - 16, 960) / preview.width, (window.innerHeight - 80) / preview.height);
  const pixelScale = Math.min(window.devicePixelRatio || 1, 2) * scale;
  canvas.width = Math.max(1, Math.floor(preview.width * pixelScale));
  canvas.height = Math.max(1, Math.floor(preview.height * pixelScale));
  canvas.style.width = `${Math.max(1, Math.floor(preview.width * scale))}px`;
  canvas.getContext('2d', { alpha: false }).drawImage(preview, 0, 0, canvas.width, canvas.height);
  dialog.querySelector('canvas').replaceWith(canvas);
  viewedCard = card;
  replaceEnlarged.hidden = kind !== 'scripture';
  dialog.showModal();

  if (!reduceMotion.matches) {
    const opening = cardMotion = animateCardDialog(card, false);
    if (opening) opening.onfinish = () => {
      if (cardMotion !== opening) return;
      opening.cancel();
      cardMotion = null;
    };
  }
  if (pixelScale > 1) sharpenEnlargedCard(kind, pageNumber, canvas);
}

async function closeCardDialog(replace = false) {
  if (!dialog.open || closingCard) return;
  closingCard = true;
  const card = viewedCard;
  if (!reduceMotion.matches) {
    dialog.classList.add('is-closing');
    if (cardMotion?.playState === 'running') {
      cardMotion.onfinish = null;
      cardMotion.reverse();
    } else {
      cardMotion?.cancel();
      cardMotion = animateCardDialog(card, true);
    }
    if (cardMotion) await cardMotion.finished.catch(() => {});
  }
  dialog.close();
  cardMotion?.cancel();
  cardMotion = null;
  closingCard = false;
  viewedCard = null;
  dialog.classList.remove('is-closing');
  (card.querySelector('.card-open') || card).focus({ preventScroll: true });
  if (replace) drawCard(card, 'scripture');
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

function applyHandSettings() {
  const fullCards = layoutSelect.value !== 'stack';
  scriptureHand.dataset.layout = layoutSelect.value;
  fullBottomCard.disabled = fullCards;
  fullBottomCard.closest('.hand-option').hidden = fullCards;
  scriptureHand.toggleAttribute('data-full-bottom', fullBottomCard.checked);
  handHint.textContent = fullCards
    ? 'Open a card to enlarge it. Replace is under each card.'
    : 'Start with the headlines. Open a card to read the full passage or replace it.';
}

function updateTranslationDownload() {
  const pdfPath = EDITIONS[state.edition].day.scripture;
  const folder = pdfPath.slice(0, pdfPath.lastIndexOf('/'));
  const code = folder.slice(folder.lastIndexOf('/') + 1);
  const zip = translationPackages?.[code]?.zip;
  translationDownload.href = zip ? `${folder}/${encodeURIComponent(zip)}` : 'translations.html';
  translationDownload.toggleAttribute('download', Boolean(zip));
}

function updateTranslationCredits() {
  for (const notice of translationCredits) {
    notice.hidden = !notice.dataset.creditFor.split(' ').includes(state.edition);
  }
  ccTranslationCredits.hidden = !ccTranslationCredits.querySelector('[data-credit-for]:not([hidden])');
}

function selectEdition(edition) {
  state.edition = edition;
  editionSelect.value = edition;
  updateTranslationCredits();
  updateTranslationDownload();
  try { localStorage.setItem('swcg_play_edition', edition); } catch (_) {}
  if (window.pdfjsLib) {
    invalidateDocuments();
    restoreDeckOrDeal();
  }
}

try {
  const savedLayout = localStorage.getItem('swcg_play_hand_layout');
  if (savedLayout === 'grid' || savedLayout === 'single') layoutSelect.value = savedLayout;
  fullBottomCard.checked = localStorage.getItem('swcg_play_full_bottom_card') === 'true';
} catch (_) {}
applyHandSettings();
layoutSelect.addEventListener('change', () => {
  applyHandSettings();
  // The open panel covers the top of the hand, so close it once a layout is chosen.
  playSettings.open = false;
  try { localStorage.setItem('swcg_play_hand_layout', layoutSelect.value); } catch (_) {}
});
fullBottomCard.addEventListener('change', () => {
  applyHandSettings();
  playSettings.open = false;
  try { localStorage.setItem('swcg_play_full_bottom_card', fullBottomCard.checked); } catch (_) {}
});
// ── Scenario above the hand ─────────────────────────────────────────────────
// The painted scenario competes with the Scripture cards, so by default it sits above the
// hand and folds away: scrolling into the hand narrows it, continuously, to its own title line
// (a window onto the card), pinned above your cards; scrolling back to the top opens it again.
// Ten seconds after your first move it settles to the title by itself. "Title only" and
// "Full card" last for this visit only. Tapping the card still opens it full size.
const gameTable = document.querySelector('.game-table');
const scenarioZone = scenarioCard.closest('.game-zone');
const scenarioHead = scenarioZone.querySelector('.zone-head');
const handZone = scriptureHand.closest('.game-zone');
const foldButton = document.getElementById('scenario-fold');
const showScenario = document.getElementById('show-scenario');
const besideToggle = document.getElementById('scenario-beside');
const playToolbar = document.querySelector('.play-toolbar');
const siteHeader = document.querySelector('.site-header');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const fold = { mode: 'expanded', chosen: false, base: 0, anim: 0, frame: 0, headH: 0, armed: false };

function scenarioBeside() { return gameTable.dataset.scenario === 'side'; }

function clearFold() {
  for (const el of [scenarioCard, scenarioHead, scenarioZone, handZone]) el.removeAttribute('style');
  scenarioCard.querySelector('canvas')?.removeAttribute('style');
  scenarioZone.classList.remove('is-pinned');
}

function measureFold() {
  if (scenarioZone.hidden) return;
  const bar = playToolbar && getComputedStyle(playToolbar).position === 'sticky'
    ? parseFloat(getComputedStyle(playToolbar).top) + playToolbar.offsetHeight : 0;
  const pin = Math.round(Math.max(siteHeader ? siteHeader.getBoundingClientRect().bottom : 0, bar) + 10);
  gameTable.style.setProperty('--pin-top', pin + 'px');
  scenarioHead.style.height = '';
  scenarioHead.style.marginBottom = '';
  scenarioZone.style.paddingTop = scenarioZone.style.paddingBottom = '';
  fold.headH = scenarioHead.offsetHeight;
  fold.headGap = parseFloat(getComputedStyle(scenarioHead).marginBottom) || 0;
  fold.padY = parseFloat(getComputedStyle(scenarioZone).paddingTop) || 0;
  fold.pin = pin;
}

function renderFold() {
  fold.frame = 0;
  const canvas = scenarioCard.querySelector('canvas');
  if (scenarioZone.hidden || scenarioBeside() || !canvas) { clearFold(); return; }
  const zone = getComputedStyle(scenarioZone);
  const W = Math.min(520, scenarioZone.clientWidth - parseFloat(zone.paddingLeft) - parseFloat(zone.paddingRight));
  const H = W / 1.4;
  const [t, b, l, r] = (scenarioCard.dataset.band || '.12,.31,.07,.93').split(',').map(Number);
  const cardHeight = p => H * (1 - p * (t + 1 - b));
  fold.fall = H * (t + 1 - b);
  // The heading, and some of the box's padding, fold away too, so the pinned strip stays slim.
  const slim = Math.max(0, fold.padY - 8);
  const head = fold.headH + fold.headGap + slim * 2;
  // Fold only as far as the scroll has gone past the pin line; the layout below stays put.
  const range = head + cardHeight(fold.base) - cardHeight(1);
  const tableTop = gameTable.getBoundingClientRect().top;
  const scrolled = range > 0 ? Math.min(1, Math.max(0, (fold.pin - tableTop) / range)) : 0;
  const p = Math.max(fold.base, scrolled);
  const cut = { top: p * t * H, left: p * l * W, right: p * (1 - r) * W };
  Object.assign(scenarioCard.style, { width: `${W - cut.left - cut.right}px`, height: `${cardHeight(p)}px`, aspectRatio: 'auto' });
  Object.assign(canvas.style, { position: 'absolute', width: `${W}px`, height: `${H}px`, maxWidth: 'none', left: `${-cut.left}px`, top: `${-cut.top}px` });
  scenarioZone.style.paddingTop = scenarioZone.style.paddingBottom = `${fold.padY - slim * scrolled}px`;
  Object.assign(scenarioHead.style, { height: `${fold.headH * (1 - scrolled)}px`, marginBottom: `${fold.headGap * (1 - scrolled)}px`, opacity: String(Math.max(0, 1 - scrolled * 1.6)), visibility: scrolled > .98 ? 'hidden' : '' });
  handZone.style.marginTop = `${head * scrolled + cardHeight(fold.base) - cardHeight(p)}px`;
  scenarioZone.classList.toggle('is-pinned', scrolled > .001);
  fold.scrolled = scrolled;
}

function requestFold() {
  if (!fold.frame && !scenarioZone.hidden) fold.frame = requestAnimationFrame(renderFold);
}

function setFoldMode(mode, chosen) {
  fold.mode = mode;
  if (chosen) fold.chosen = true;
  foldButton.textContent = mode === 'collapsed' ? 'Full card' : 'Title only';
  const target = mode === 'collapsed' ? 1 : 0, from = fold.base, start = performance.now();
  // If you are already down in your cards, the page moves with the fold so the verse you are
  // reading stays where it is.
  const keepHand = fold.scrolled > 0;
  const moveTo = base => {
    if (keepHand && fold.fall && !scenarioZone.hidden) scrollBy({ top: (fold.base - base) * fold.fall, behavior: 'instant' });
    fold.base = base;
  };
  cancelAnimationFrame(fold.anim);
  // The browser's own scroll anchoring would correct the page a second time.
  const anchoring = on => { for (const el of [document.documentElement, document.body]) el.style.overflowAnchor = on ? '' : 'none'; };
  anchoring(false);
  if (reduceMotion.matches) { moveTo(target); renderFold(); requestAnimationFrame(() => anchoring(true)); return; }
  const step = now => {
    const k = Math.min(1, (now - start) / 600), eased = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    moveTo(from + (target - from) * eased);
    renderFold();
    if (k < 1) fold.anim = requestAnimationFrame(step); else anchoring(true);
  };
  fold.anim = requestAnimationFrame(step);
}

function placeScenario() {
  scenarioZone.hidden = !showScenario.checked;
  besideToggle.disabled = scenarioZone.hidden;
  if (showScenario.checked && besideToggle.checked) gameTable.dataset.scenario = 'side';
  else delete gameTable.dataset.scenario;
  clearFold();
  measureFold();
  requestFold();
}

const firstMove = () => {
  if (fold.armed) return;
  fold.armed = true;
  for (const type of ['scroll', 'pointerdown', 'keydown', 'wheel', 'touchstart']) removeEventListener(type, firstMove, true);
  const autoFold = () => {
    if (fold.chosen || fold.mode !== 'expanded' || scenarioZone.hidden || scenarioBeside()) return;
    if (dialog.open) dialog.addEventListener('close', autoFold, { once: true });
    else setFoldMode('collapsed', false);
  };
  setTimeout(autoFold, 10000);
};
for (const type of ['scroll', 'pointerdown', 'keydown', 'wheel', 'touchstart']) addEventListener(type, firstMove, { capture: true, passive: true });

try {
  showScenario.checked = localStorage.getItem('swcg_play_show_scenario') !== 'false';
  besideToggle.checked = localStorage.getItem('swcg_play_scenario_beside') === 'true';
} catch (_) {}
placeScenario();
foldButton.addEventListener('click', () => setFoldMode(fold.mode === 'collapsed' ? 'expanded' : 'collapsed', true));
showScenario.addEventListener('change', () => {
  placeScenario();
  playSettings.open = false;
  playSettings.querySelector('summary').focus({ preventScroll: true });
  try { localStorage.setItem('swcg_play_show_scenario', showScenario.checked); } catch (_) {}
});
besideToggle.addEventListener('change', () => {
  placeScenario();
  playSettings.open = false;
  try { localStorage.setItem('swcg_play_scenario_beside', besideToggle.checked); } catch (_) {}
});
document.getElementById('scenario-info').addEventListener('click', event => {
  event.currentTarget.focus({ preventScroll: true });
});
addEventListener('scroll', requestFold, { passive: true });
addEventListener('resize', () => { measureFold(); requestFold(); });

// Close Settings on a tap elsewhere (pointerdown, because iOS sends no click
// for taps on plain page areas) or on Escape.
document.addEventListener('pointerdown', event => {
  if (playSettings.open && !playSettings.contains(event.target)) playSettings.open = false;
});
playSettings.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !playSettings.open) return;
  playSettings.open = false;
  playSettings.querySelector('summary').focus();
});

document.getElementById('quick-instructions-link').addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  // Scroll without replacing an edition fragment such as #CUV.
  event.preventDefault();
  const heading = document.getElementById('quick-instructions');
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ block: 'start' });
});

const query = new URLSearchParams(location.search);
const queryMode = query.get('mode');
// #CSB is what goes on a poster; ?edition=modern is the older form. Both work.
const queryEdition = resolveEdition(location.hash.slice(1)) || resolveEdition(query.get('edition'));
try {
  const savedEdition = localStorage.getItem('swcg_play_edition');
  const savedMode = localStorage.getItem('swcg_play_mode');
  if (savedEdition && EDITIONS[savedEdition]) state.edition = savedEdition;
  if (savedMode === 'day' || savedMode === 'night') state.mode = savedMode;
} catch (_) {}
if (queryEdition) state.edition = queryEdition;
if (queryMode === 'day' || queryMode === 'night') state.mode = queryMode;
editionSelect.value = state.edition;
updateTranslationCredits();

fetch('Digital/Translations/checksums.json', { cache: 'no-cache' })
  .then(response => response.ok ? response.json() : null)
  .then(packages => {
    translationPackages = packages;
    updateTranslationDownload();
  })
  .catch(() => {});

editionSelect.addEventListener('change', event => {
  selectEdition(event.target.value);
  // Keep the address shareable without adding an entry to browser history.
  try {
    const code = Object.keys(EDITION_ALIASES).find(
      key => EDITION_ALIASES[key] === state.edition && key.toUpperCase() === key
    ) || state.edition;
    history.replaceState(null, '', '#' + code);
  } catch (_) {}
});

// Let visitors change editions by editing the fragment in the address bar.
window.addEventListener('hashchange', () => {
  const wanted = resolveEdition(location.hash.slice(1));
  if (wanted && wanted !== state.edition) selectEdition(wanted);
});

if (!window.pdfjsLib) {
  setStatus('PDF rendering could not start. Check your connection, or use the downloads on the Translations page.', true);
} else {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';

  document.getElementById('day-mode').addEventListener('click', () => selectMode('day'));
  document.getElementById('night-mode').addEventListener('click', () => selectMode('night'));
  document.getElementById('new-round').addEventListener('click', newRound);
  document.getElementById('replace-scenario').addEventListener('click', () => drawCard(scenarioCard, 'scenario'));
  document.getElementById('replace-hand').addEventListener('click', drawHand);

  scenarioCard.addEventListener('click', () => enlarge(scenarioCard));
  scriptureCards.forEach(card => {
    card.querySelector('.card-open').addEventListener('click', () => enlarge(card));
    card.querySelector('.card-action').addEventListener('click', () => drawCard(card, 'scripture'));
  });
  replaceEnlarged.addEventListener('click', () => closeCardDialog(true));
  dialog.querySelector('.dialog-close').addEventListener('click', () => closeCardDialog());
  dialog.addEventListener('click', event => {
    if (!event.target.closest('.dialog-actions')) closeCardDialog();
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeCardDialog();
  });

  ['day', 'night'].forEach(value => {
    const active = value === state.mode;
    document.getElementById(`${value}-mode`).classList.toggle('active', active);
    document.getElementById(`${value}-mode`).setAttribute('aria-pressed', String(active));
  });
  syncGameTheme();
  restoreDeckOrDeal();
}
