// firebase-init.js
// Initializes Firebase if `js/firebase-config.js` exists. Exports helper methods for photos & guestbook.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

let firebaseAvailable = false;
let db = null;
let storage = null;

export async function initFirebase(){
  try{
    // Attempt to import user-provided config. If file absent, this will fail and we fall back.
    const cfgModule = await import('./firebase-config.js');
    const cfg = cfgModule.default || cfgModule;
    const app = initializeApp(cfg);
    db = getFirestore(app);
    storage = getStorage(app);
    firebaseAvailable = true;
    console.info('Firebase initialised');
    return { available: true };
  }catch(e){
    console.info('Firebase config not found — running in local-only mode');
    firebaseAvailable = false;
    return { available: false };
  }
}

export async function uploadPhotoToFirebase(dataUrl, filename){
  if(!firebaseAvailable) throw new Error('Firebase not initialised');
  // store the file under shared-photos/<filename>
  const storageRef = ref(storage, `shared-photos/${filename}`);
  // dataUrl is a base64 string; upload as string
  const res = await uploadString(storageRef, dataUrl, 'data_url');
  const url = await getDownloadURL(storageRef);
  // create a metadata document in Firestore
  const col = collection(db, 'shared_photos');
  const doc = await addDoc(col, {url, filename, ts: Date.now()});
  return { url };
}

export async function listPhotosFromFirebase(){
  if(!firebaseAvailable) throw new Error('Firebase not initialised');
  const col = collection(db, 'shared_photos');
  const q = query(col, orderBy('ts', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d=> ({id:d.id, ...d.data()}));
}

export async function submitGuestbookToFirebase(name, message){
  if(!firebaseAvailable) throw new Error('Firebase not initialised');
  const col = collection(db, 'guestbook');
  const doc = await addDoc(col, {name, message, ts: Date.now()});
  return { id: doc.id };
}

export async function listGuestbookFromFirebase(){
  if(!firebaseAvailable) throw new Error('Firebase not initialised');
  const col = collection(db, 'guestbook');
  const q = query(col, orderBy('ts', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d=> ({id:d.id, ...d.data()}));
}
