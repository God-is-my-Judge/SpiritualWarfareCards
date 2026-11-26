'use strict';

// The same table runs from the website and from an extracted download.
const DeckShuffleGame = (() => {
  const root = new URL('.', document.currentScript.src);
  const worker = new URL('vendor/pdfjs/pdf.worker.min.js', root).href;
  const config = JSON.parse(document.getElementById('deckshuffle-game-config').textContent);
  const offline = location.protocol === 'file:';

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Could not load ' + url));
      document.head.append(script);
    });
  }

  async function prepare() {
    if (!window.pdfjsLib) return;
    pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
    if (offline) {
      // PDF.js uses this local script as its worker on file URLs. It avoids
      // browsers' restrictions on starting a worker from another file.
      await loadScript(worker);
    }
  }

  function defaultGroups(makeGroup) {
    return (config.decks || []).map((deck, index) => ({
      ...makeGroup(),
      pdfName: deck.name,
      pagesInput: `${deck.firstPage}:${deck.firstPage + deck.pages - 1}`,
      pages: Array.from({length: deck.pages}, (_, page) => page + deck.firstPage),
      numToDisplay: deck.draw,
      bundledDeck: index,
      firstCardPage: deck.firstPage,
    }));
  }

  function restoreGroup(group) {
    const deck = config.decks?.[group.bundledDeck];
    if (!deck) return;
    group.pdfName = deck.name;
    const offset = deck.firstPage - (group.firstCardPage ?? 1);
    if (!offset) return;
    // Keep the same cards and order when a bundled deck's starting page moves.
    group.pages = group.pages.map(page => page + offset);
    group.pagesInput = group.pages.join(', ');
    group.firstCardPage = deck.firstPage;
  }

  async function loadPDF(index) {
    const deck = config.decks?.[index];
    if (!deck) return null;
    if (offline) {
      // Classic scripts load from disk without the Fetch API's file URL
      // restriction. Decode only when the table needs this PDF.
      const bytes = window.deckShufflePDFs?.[deck.pdfIndex ?? index];
      if (!bytes) throw new Error('Extract the complete DeckShuffle download before opening it.');
      return Uint8Array.from(atob(bytes), character => character.charCodeAt(0));
    }
    const response = await fetch(deck.url, {cache: 'no-cache'});
    if (!response.ok) throw new Error('Could not load ' + deck.name);
    return response.arrayBuffer();
  }

  return {
    prepare,
    defaultGroups,
    restoreGroup,
    loadPDF,
    label: group => config.decks?.[group.bundledDeck]?.label,
    storageSuffix: config.edition ? ':' + config.edition : '',
  };
})();
