// App logic: Firebase-enabled when js/firebase-config.js is present
import { initFirebase, uploadPhotoToFirebase, listPhotosFromFirebase, submitGuestbookToFirebase, listGuestbookFromFirebase } from './firebase-init.js';

const TABLE_INFO = {
  1:{name:"Coral", hex:"#E8734A"},
  2:{name:"Blush", hex:"#EAC0BC"},
  3:{name:"Amber", hex:"#E8A33D"},
  4:{name:"Terracotta", hex:"#C1613C"},
  5:{name:"Champagne", hex:"#E4CE9C"},
  6:{name:"Gold", hex:"#C9A24B"}
};

let GUESTS = [];
let firebaseAvailable = false;

const PHOTOS_OFFICIEL = [
  '49e207ec-66f1-4088-a475-57c1adf96f73.jpeg',
  'b5b84b7e-2a33-4d6e-94a9-8eda4bb8cad9.jpeg',
  '2958871d-0a36-4fbe-921e-ffd9b93db0f9.jpeg'
];

function normalize(s){return (s||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace(/[-']/g,' ').replace(/\s+/g,' ').trim();}
function levenshtein(a,b){const m=a.length,n=b.length;const d=Array.from({length:m+1},(_,i)=>Array(n+1).fill(0).map((_,j)=> i===0?j:(j===0?i:0)));
 for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));}return d[m][n];}
function matchGuestExact(query){const q=normalize(query);if(!q) return null;let best=null,bestScore=1e9;for(const g of GUESTS){const norm=normalize(g.fullName);const first=norm.split(' ')[0];if(norm===q) return g;const candidates=[norm,first,norm.split(' ').reverse().join(' ')];for(const c of candidates){const s=levenshtein(c,q);if(s<bestScore){bestScore=s;best=g}}}return bestScore<=3?best:null}

async function safeGetLocal(key){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):[];}catch(e){return []}}
async function safeSetLocal(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch(e){console.error(e)}}

// Init
document.addEventListener('DOMContentLoaded', async ()=>{
  const fb = await initFirebase();
  firebaseAvailable = fb.available;

  // inject photos
  const hero = document.getElementById('hero-gallery');
  PHOTOS_OFFICIEL.forEach(p=>{const img=document.createElement('img');img.src=p;img.alt='Photo officielle';hero.appendChild(img)});
  const photog = document.getElementById('photographer-row');PHOTOS_OFFICIEL.forEach(p=>{const i=document.createElement('img');i.src=p;i.alt='Photo';photog.appendChild(i)});

  // guest fallback
  GUESTS = [
    {fullName:'Assagou Josaphat Sosthene', companion:'Guéla Marie Désirée', table:1},
    {fullName:'Koné Ismaël', companion:null, table:1},
    {fullName:'Bosson Mickael', companion:null, table:null}
  ];

  // tabs
  document.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');showScreen(b.dataset.screen);}));
  document.querySelectorAll('[data-screen="seat"]').forEach(b=>b.addEventListener('click',()=>showScreen('seat')));

  // seat
  document.getElementById('seat-validate').addEventListener('click',doSearch);
  document.getElementById('seat-input').addEventListener('keydown',e=>{if(e.key==='Enter') doSearch();});

  // uploads
  document.getElementById('upload-input').addEventListener('change',handleUpload);

  // guestbook
  document.getElementById('gb-form').addEventListener('submit',async e=>{e.preventDefault();await submitGuestbook();});

  // initial render
  if(firebaseAvailable){renderSharedPhotosFromFirebase();loadGuestbookFromFirebase();}else{await loadSharedPhotosLocal();renderSharedPhotosLocal();loadGuestbookLocal();}

  // sync sheets
  syncFromGoogleSheets();
});

function showScreen(name){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const el=document.getElementById(name);if(el)el.classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}

// Rendering seat
function renderSeat(g){const box=document.getElementById('seat-result');if(!g){document.getElementById('seat-noresult').style.display='block';box.style.display='none';return}document.getElementById('seat-noresult').style.display='none';const first=g.fullName.split(' ')[0];const html=`<div class="greet">Bonjour ${first},</div><div class="tlabel">🌿 Votre table</div><div class="table-name" style="font-weight:700;margin:8px 0;color:#fff;background:${TABLE_INFO[g.table||1].hex};padding:10px;border-radius:10px">${g.table?TABLE_INFO[g.table].name:'A attribuer'}</div><div class="mates" style="color:#fff">${g.companion? 'Avec '+g.companion : ''}</div>`;box.innerHTML=html;box.style.display='block'}
function doSearch(){const q=document.getElementById('seat-input').value.trim();if(!q){alert('Veuillez saisir votre nom');return}const found=matchGuestExact(q);if(found) renderSeat(found); else renderSeat(null)}

// Google Sheets sync (same as before)
const SHEET_ID='1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU';const TAB_RSVP='Réponses au formulaire 1';const TAB_TABLES='Table des invités';
function sheetCsvUrl(tab){return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`} 
function parseCSV(text){const rows=[];let row=[];let field='';let inQuotes=false;for(let i=0;i<text.length;i++){const c=text[i],next=text[i+1];if(inQuotes){if(c==='"'&&next==='"'){field+='"';i++;}else if(c==='"') inQuotes=false;else field+=c;}else{if(c==='"') inQuotes=true;else if(c===','){row.push(field);field='';}else if(c==='\n'||c==='\r'){if(c==='\r'&&next==='\n') i++;row.push(field);field='';rows.push(row);row=[];}else field+=c;}}if(field.length||row.length){row.push(field);rows.push(row);}return rows.filter(r=>r.some(c=>c&&c.trim()!==''));}
function isTableCell(c){return /^table\s*\d+/i.test((c||'').trim())}
function tableNumFrom(c){const m=(c||'').match(/\d+/);return m?parseInt(m[0],10):null}
function buildGuestsFromSheets(rsvpRows, tableRows){const rsvpList=rsvpRows.slice(1).map(cells=>{const fullName=(cells[1]||'').trim();const accompanied=(cells[2]||'').trim().toLowerCase().startsWith('oui');const companion=accompanied?((cells[3]||'').trim()||null):null;return fullName?{fullName,companion,norm:normalize(fullName)}:null}).filter(Boolean);const rsvpByNorm=new Map(rsvpList.map(r=>[r.norm,r]));const assigned=new Map();const extras=[];tableRows.forEach(cells=>{cells=cells.map(c=>(c||'').trim());const name=cells[0];if(!name||isTableCell(name)) return;const tableIdx=cells.findIndex((c,i)=>i>0&&isTableCell(c));if(tableIdx===-1) return;const tableNum=tableNumFrom(cells[tableIdx]);const extraName=cells.slice(1,tableIdx).find(c=>c)||null;const rsvp=rsvpByNorm.get(normalize(name));let companion=null;if(rsvp&&rsvp.companion){companion=rsvp.companion}else if(extraName){extras.push({fullName:extraName,companion:null,table:tableNum})}assigned.set(normalize(name),{fullName:name,companion,table:tableNum});});rsvpList.forEach(r=>{if(!assigned.has(r.norm)){assigned.set(r.norm,{fullName:r.fullName,companion:r.companion,table:null})}});extras.forEach(e=>{const key=normalize(e.fullName);if(!assigned.has(key)) assigned.set(key,e)});const result=Array.from(assigned.values());return result.length?result:null}
async function syncFromGoogleSheets(){const status=document.getElementById('sync-status');status.textContent='🔄 Synchronisation...';try{const [rsvpText,tableText]=await Promise.all([fetch(sheetCsvUrl(TAB_RSVP)).then(r=>{if(!r.ok) throw new Error('rsvp');return r.text()}),fetch(sheetCsvUrl(TAB_TABLES)).then(r=>{if(!r.ok) throw new Error('tables');return r.text()})]);const rsvpRows=parseCSV(rsvpText);const tableRows=parseCSV(tableText);const fresh=buildGuestsFromSheets(rsvpRows,tableRows);if(fresh&&fresh.length){GUESTS=fresh;status.textContent='✅ Synchronisé';}else{status.textContent='⚠️ Feuilles vides — utilisation des données locales'}}catch(e){status.textContent='⚠️ Hors-ligne — données locales utilisées'}}

// PHOTOS
async function handleUpload(e){const files=Array.from(e.target.files);if(files.length===0) return;const by=document.getElementById('upload-name').value.trim()||'Invité';const progress=document.getElementById('upload-progress');
 for(let i=0;i<files.length;i++){progress.textContent=`Envoi ${i+1}/${files.length}...`;try{const dataUrl=await compressImage(files[i]);
    if(firebaseAvailable){const filename=`${Date.now()}-${files[i].name.replace(/[^a-z0-9.]/gi,'')}`;await uploadPhotoToFirebase(dataUrl, filename);await renderSharedPhotosFromFirebase();}else{let photos=await safeGetLocal('wedding-shared');photos.push({src:dataUrl,by,ts:Date.now()});await safeSetLocal('wedding-shared',photos);renderSharedPhotosLocal();}
 }catch(err){console.error(err)}}progress.textContent='Merci pour votre partage 🌸';setTimeout(()=>progress.textContent='',2000)}

function compressImage(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=e=>{const img=new Image();img.onload=()=>{const maxW=1000;const scale=Math.min(1,maxW/img.width);const canvas=document.createElement('canvas');canvas.width=img.width*scale;canvas.height=img.height*scale;canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/jpeg',0.75))};img.onerror=reject;img.src=e.target.result};reader.onerror=reject;reader.readAsDataURL(file)})}

// Local photos
async function loadSharedPhotosLocal(){const p=await safeGetLocal('wedding-shared');if(!p||p.length===0) await safeSetLocal('wedding-shared',[])}
async function renderSharedPhotosLocal(){const photos=await safeGetLocal('wedding-shared');const grid=document.getElementById('shared-grid');grid.innerHTML='';if(!photos||photos.length===0){grid.innerHTML='<div class="empty">Aucune photo partagée — soyez le premier !</div>';return}photos.slice().reverse().forEach(p=>{const img=document.createElement('img');img.src=p.src;img.alt=`Photo de ${p.by}`;img.title='Cliquer pour télécharger';img.style.cursor='pointer';img.addEventListener('click',()=>{const a=document.createElement('a');a.href=p.src;a.download=`photo-${p.ts}.jpg`;document.body.appendChild(a);a.click();a.remove();});grid.appendChild(img)})}

// Firebase photos
async function renderSharedPhotosFromFirebase(){try{const data = await listPhotosFromFirebase();const grid=document.getElementById('shared-grid');grid.innerHTML='';if(!data||data.length===0){grid.innerHTML='<div class="empty">Aucune photo partagée — soyez le premier !</div>';return}data.forEach(p=>{const img=document.createElement('img');img.src=p.url;img.alt=p.filename || 'Photo';img.title='Cliquer pour télécharger';img.style.cursor='pointer';img.addEventListener('click',()=>{const a=document.createElement('a');a.href=p.url;a.download=p.filename || `photo-${p.ts}.jpg`;document.body.appendChild(a);a.click();a.remove();});grid.appendChild(img)})}catch(e){console.error(e);renderSharedPhotosLocal()}}

// GUESTBOOK: local vs firebase
async function loadGuestbookLocal(){const msgs=await safeGetLocal('wedding-gb');const list=document.getElementById('guestbook-list');if(!msgs||msgs.length===0){list.innerHTML='<div class="empty">Soyez le premier à laisser un mot 💌</div>';return}list.innerHTML=msgs.slice().reverse().map(m=>`<div class="gb-item"><strong>${m.name}</strong><p>${m.message}</p></div>`).join('')}
async function submitGuestbook(){const name=document.getElementById('gb-name').value.trim();const message=document.getElementById('gb-message').value.trim();if(!name||!message){alert('Veuillez remplir votre nom et message');return}
 if(firebaseAvailable){await submitGuestbookToFirebase(name,message);document.getElementById('gb-name').value='';document.getElementById('gb-message').value='';alert('Merci ! Votre message a bien été publié.');loadGuestbookFromFirebase();}
 else{const msgs=await safeGetLocal('wedding-gb');msgs.push({name,message,ts:Date.now()});await safeSetLocal('wedding-gb',msgs);document.getElementById('gb-name').value='';document.getElementById('gb-message').value='';alert('Merci ! Votre message a bien été publié.');loadGuestbookLocal()}}

async function loadGuestbookFromFirebase(){try{const data = await listGuestbookFromFirebase();const list=document.getElementById('guestbook-list');if(!data||data.length===0){list.innerHTML='<div class="empty">Soyez le premier à laisser un mot 💌</div>';return}list.innerHTML = data.map(m=>`<div class="gb-item"><strong>${m.name}</strong><p>${m.message}</p></div>`).join('')}catch(e){console.error(e);loadGuestbookLocal()}}

// initial local guestbook load
async function loadGuestbookLocal(){await loadGuestbookLocal();}
