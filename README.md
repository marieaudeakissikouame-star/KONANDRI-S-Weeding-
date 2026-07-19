# KONANDRI-S-Weeding-

Site statique pour le mariage de Yoane & Marie-Aude — thème "Tropical Sunset".

Ce dépôt contient une single-page app en HTML/CSS/JS permettant :
- Recherche de la place (synchronisation possible avec Google Sheets)
- Album photos du photographe (accueil)
- Galerie partagée par les invités (upload & téléchargement)
- Livre d'or (messages publiés immédiatement)

Nouveau : option de partage en temps réel via Firebase (Firestore + Storage).

---

Quick start (local)

1. Clone le dépôt et lance un serveur local depuis la racine :
   - Python 3 : `python -m http.server 8000`
   - Node (serve) : `npx serve . -l 8000`
2. Ouvre `http://localhost:8000/index.html`

Firebase (optionnel mais recommandé pour partage réel)

Si tu veux que les photos et messages soient réellement partagés entre tous les invités (et pas seulement stockés dans le navigateur de chaque visiteur), suis ces étapes :

1. Crée un projet Firebase (https://console.firebase.google.com/).
2. Active Firestore (mode production ou test selon ton confort) et Firebase Storage.
3. Dans la console, va dans "Project settings" → "Your apps" → ajoute une app Web et copie la configuration fournie.
4. Crée un fichier `js/firebase-config.js` dans le dépôt à la racine `js/` en collant la configuration de Firebase comme dans `js/firebase-config.example.js`.

Sécurité (règles simples)

Pour rendre le projet immédiatement partageable sans authentification (pratique mais ouvert) :

Firestore (exemple de règles pour tests)
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
Storage (règles tests)
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
Remarque : ces règles ouvrent totalement l'accès ; pour la production, restreins-les (par ex. validation du format, taille max des images). Je peux t'aider à écrire des règles plus sûres.

Google Sheets sync

Le script peut lire deux onglets CSV : `Réponses au formulaire 1` et `Table des invités`. Pour que la lecture fonctionne, rends le Google Sheet public en lecture : "Toute personne disposant du lien -> Lecteur".

Déploiement (GitHub Pages)

1. Dans les paramètres du dépôt, active GitHub Pages (branche `main`, dossier `/`).
2. Le site sera servi en `https://<ton-user>.github.io/KONANDRI-S-Weeding-/`.

---

Fichiers clés

- `index.html` — page principale
- `css/styles.css` — styles
- `js/app.js` — logique principale (recherche, upload, livre d'or)
- `js/firebase-init.js` — gestion optionnelle Firebase
- `js/firebase-config.example.js` — exemple de configuration Firebase à copier en `js/firebase-config.js`

Si tu veux, je peux :
- Configurer et pousser `js/firebase-config.js` si tu me fournis ta config (ou le JSON) — ne partage pas les clés en public si tu ne veux pas.
- Déployer sur GitHub Pages pour rendre le site accessible.
- Rendre les règles Firebase plus strictes (ex. limiter la taille des images, vérifier le type mime, limiter le texte du livre d'or).

