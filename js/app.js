// ====================================
// APPLICATION - SITE COMPAGNON MARIAGE
// Yoane & Marie-Aude - Tropical Sunset
// ====================================

// === DONNÉES ===

const SHEET_ID = '1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU';
const TAB_RSVP = 'Réponses au formulaire 1';
const TAB_TABLES = 'Table des invités';

let GUESTS = [];
let firebaseAvailable = false;

const PHOTOS_OFFICIEL = [
  '49e207ec-66f1-4088-a475-57c1adf96f73.jpeg',
  'b5b84b7e-2a33-4d6e-94a9-8eda4bb8cad9.jpeg',
  '2958871d-0a36-4fbe-921e-ffd9b93db0f9.jpeg'
];

// === UTILITIES ===

function normalize(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[-']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) =>
    Array(n + 1).fill(0).map((_, j) => (i === 0 ? j : (j === 0 ? i : 0)))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return d[m][n];
}

function matchGuestExact(query) {
  const q = normalize(query);
  if (!q) return null;

  let best = null, bestScore = 1e9;

  for (const g of GUESTS) {
    const norm = normalize(g.fullName);
    const first = norm.split(' ')[0];

    if (norm.includes(q) || q.includes(first)) {
      const score = levenshtein(q, norm);
      if (score < bestScore) {
        bestScore = score;
        best = g;
      }
    }
  }

  return bestScore <= 2 ? best : null;
}

async function safeGetLocal(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

async function safeSetLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
}

// === NAVIGATION ===

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(name);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === INIT ===

document.addEventListener('DOMContentLoaded', async () => {
  // Charger données invités
  GUESTS = [
    { fullName: 'Assagou Josaphat Sosthene', companion: 'Guéla Marie Désirée', table: 1, place: 1 },
    { fullName: 'Koné Ismaël', companion: null, table: 1, place: 2 },
    { fullName: 'Bosson Mickael', companion: null, table: 2, place: 1 },
    { fullName: 'Marie Aude', companion: 'Yoane', table: 3, place: 1 }
  ];

  // Navigation - Splash to Home
  document.querySelector('.btn-enter').addEventListener('click', () => showScreen('home'));

  // Navigation - Cards & Buttons
  document.querySelectorAll('[data-screen]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const screen = btn.getAttribute('data-screen');
      if (screen) showScreen(screen);
    });
  });

  // Seat Search
  document.getElementById('seat-validate').addEventListener('click', doSearch);
  document.getElementById('seat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });

  // Photo Upload
  document.getElementById('upload-input').addEventListener('change', handleUpload);

  // Guestbook
  document.getElementById('gb-form').addEventListener('submit', async e => {
    e.preventDefault();
    await submitGuestbook();
  });

  // Initial render
  renderPhotosOfficial();
  await loadSharedPhotos();
  renderSharedPhotos();
  await loadGuestbook();
  
  // Sync Google Sheets
  syncFromGoogleSheets();
});

// === SEAT SEARCH ===

function renderSeat(g) {
  const box = document.getElementById('seat-result');
  const noresult = document.getElementById('seat-noresult');

  if (!g) {
    noresult.classList.remove('hidden');
    box.classList.add('hidden');
    return;
  }

  noresult.classList.add('hidden');
  box.classList.remove('hidden');

  const welcome = document.getElementById('result-welcome');
  const table = document.getElementById('result-table');
  const companions = document.getElementById('result-companions');

  welcome.innerHTML = `Bonjour ${g.fullName},<br>Nous sommes heureux de vous accueillir !`;
  
  table.innerHTML = `
    <div style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px;">
      🌿 Table ${g.table} · Place ${g.place}
    </div>
  `;

  if (g.companion) {
    companions.innerHTML = `
      <h4>Vous serez aux côtés de :</h4>
      <ul>
        <li>${g.companion}</li>
      </ul>
    `;
  } else {
    companions.innerHTML = `<p style="opacity: 0.9;">À très bientôt !</p>`;
  }
}

function doSearch() {
  const q = document.getElementById('seat-input').value.trim();
  if (!q) {
    alert('Veuillez saisir votre nom');
    return;
  }
  const found = matchGuestExact(q);
  if (found) {
    renderSeat(found);
  } else {
    renderSeat(null);
  }
}

// === GOOGLE SHEETS SYNC ===

function sheetCsvUrl(tab) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n' || c === '\r') {
        if (field || row.length > 0) {
          row.push(field);
          rows.push(row);
          row = [];
          field = '';
        }
        if (c === '\r' && next === '\n') i++;
      } else {
        field += c;
      }
    }
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

async function syncFromGoogleSheets() {
  const status = document.getElementById('sync-status');
  status.textContent = '🔄 Synchronisation...';

  try {
    const [rsvpText, tableText] = await Promise.all([
      fetch(sheetCsvUrl(TAB_RSVP)).then(r => r.text()),
      fetch(sheetCsvUrl(TAB_TABLES)).then(r => r.text())
    ]);

    const rsvpRows = parseCSV(rsvpText);
    const tableRows = parseCSV(tableText);

    // Fusionner les données
    const rsvpList = rsvpRows.slice(1).map(cells => ({
      fullName: (cells[1] || '').trim(),
      companion: (cells[2] || '').trim().toLowerCase().startsWith('oui') ? 'Accompagnant' : null
    })).filter(r => r.fullName);

    const tableList = tableRows.slice(1).map(cells => ({
      fullName: (cells[0] || '').trim(),
      table: parseInt(cells[1]) || null,
      place: parseInt(cells[2]) || null
    })).filter(r => r.fullName);

    GUESTS = rsvpList.map(r => {
      const t = tableList.find(tl => normalize(tl.fullName) === normalize(r.fullName));
      return {
        fullName: r.fullName,
        companion: r.companion,
        table: t?.table || null,
        place: t?.place || null
      };
    });

    status.textContent = '✓ Synchronisé';
    setTimeout(() => (status.textContent = ''), 2000);
  } catch (err) {
    console.error('Sync error:', err);
    status.textContent = '✗ Erreur de synchronisation';
  }
}

// === PHOTOS ===

function renderPhotosOfficial() {
  const hero = document.getElementById('hero-gallery');
  const gallery = document.getElementById('official-gallery');

  if (hero) {
    hero.innerHTML = '';
    PHOTOS_OFFICIEL.forEach(p => {
      const img = document.createElement('img');
      img.src = p;
      img.alt = 'Photo officielle';
      img.loading = 'lazy';
      hero.appendChild(img);
    });
  }

  if (gallery) {
    gallery.innerHTML = '';
    PHOTOS_OFFICIEL.forEach(p => {
      const img = document.createElement('img');
      img.src = p;
      img.alt = 'Photo officielle';
      img.loading = 'lazy';
      gallery.appendChild(img);
    });
  }
}

async function handleUpload(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const by = document.getElementById('upload-name').value.trim() || 'Invité';
  const progress = document.getElementById('upload-progress');

  for (let i = 0; i < files.length; i++) {
    progress.textContent = `Envoi ${i + 1}/${files.length}...`;
    try {
      const dataUrl = await compressImage(files[i]);
      const photos = await safeGetLocal('wedding-shared');
      photos.push({ src: dataUrl, by, ts: Date.now() });
      await safeSetLocal('wedding-shared', photos);
    } catch (err) {
      console.error(err);
    }
  }

  progress.textContent = 'Merci pour votre partage 🌸';
  await renderSharedPhotos();
  e.target.value = '';
  setTimeout(() => (progress.textContent = ''), 2000);
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const maxW = 1000;
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function loadSharedPhotos() {
  const p = await safeGetLocal('wedding-shared');
  if (!p || p.length === 0) await safeSetLocal('wedding-shared', []);
}

async function renderSharedPhotos() {
  const photos = await safeGetLocal('wedding-shared');
  const grid = document.getElementById('shared-grid');
  const empty = document.getElementById('shared-empty');

  if (!photos || photos.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = '';

  photos.forEach(p => {
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = `Photo partagée par ${p.by}`;
    img.loading = 'lazy';
    grid.appendChild(img);
  });
}

// === GUESTBOOK ===

async function submitGuestbook() {
  const name = document.getElementById('gb-name').value.trim();
  const message = document.getElementById('gb-message').value.trim();

  if (!name || !message) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  const msgs = await safeGetLocal('wedding-gb');
  msgs.push({ name, message, ts: Date.now() });
  await safeSetLocal('wedding-gb', msgs);

  document.getElementById('gb-name').value = '';
  document.getElementById('gb-message').value = '';
  alert('Merci ! Votre message a bien été enregistré 💌');

  await loadGuestbook();
}

async function loadGuestbook() {
  const msgs = await safeGetLocal('wedding-gb');
  const list = document.getElementById('guestbook-list');
  const empty = document.getElementById('guestbook-empty');

  if (!msgs || msgs.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  list.innerHTML = '';

  msgs.forEach(m => {
    const div = document.createElement('div');
    div.className = 'guestbook-message';
    const date = new Date(m.ts).toLocaleDateString('fr-FR');
    div.innerHTML = `
      <div class="message-author">${m.name}</div>
      <div class="message-text">${m.message}</div>
      <div class="message-date">${date}</div>
    `;
    list.appendChild(div);
  });
}

// === EVENT DELEGATIONS ===

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-screen]')) {
    const screen = e.target.closest('[data-screen]').getAttribute('data-screen');
    if (screen) showScreen(screen);
  }
});
