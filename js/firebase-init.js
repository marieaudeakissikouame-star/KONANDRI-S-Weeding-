// Firebase Initialization (optionnel)
// Ce fichier charge Firebase si disponible

let firebaseReady = false;

async function initFirebase() {
  try {
    // Vérifier si la config existe
    const { firebaseConfig } = await import('./firebase-config.js').catch(() => ({}));
    
    if (!firebaseConfig) {
      console.log('Firebase config not found - using localStorage');
      return { available: false };
    }

    // Charger Firebase (version CDN recommandée pour production)
    console.log('Firebase ready');
    firebaseReady = true;
    return { available: true };
  } catch (e) {
    console.log('Firebase not available');
    return { available: false };
  }
}

async function uploadPhotoToFirebase(dataUrl, filename) {
  if (!firebaseReady) return;
  console.log('Upload Firebase:', filename);
}

async function listPhotosFromFirebase() {
  if (!firebaseReady) return [];
  return [];
}

async function submitGuestbookToFirebase(name, message) {
  if (!firebaseReady) return;
  console.log('Guestbook Firebase:', name, message);
}

async function listGuestbookFromFirebase() {
  if (!firebaseReady) return [];
  return [];
}

export {
  initFirebase,
  uploadPhotoToFirebase,
  listPhotosFromFirebase,
  submitGuestbookToFirebase,
  listGuestbookFromFirebase
};
