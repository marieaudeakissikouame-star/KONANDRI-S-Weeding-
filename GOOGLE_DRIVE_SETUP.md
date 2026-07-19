# 🚀 Configuration Google Drive - Guide Complet

## Étape 1 : Créer le dossier Google Drive

1. Allez sur [Google Drive](https://drive.google.com)
2. Cliquez **Nouveau** → **Dossier**
3. Nommez : `Mariage Yoane & Marie-Aude - Photos`
4. **Partagez** :
   - Clic droit sur le dossier → **Partager**
   - Changez à **Accès public** → **Lecteur**
   - Copiez le lien

5. **Récupérez l'ID du dossier** :
   ```
   https://drive.google.com/drive/folders/FOLDER_ID_ICI
                                        ↑ Copiez ceci
   ```

---

## Étape 2 : Activer Google Drive API

### 2.1 Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. En haut à gauche, cliquez sur **Sélectionner un projet**
3. Cliquez **Nouveau projet**
4. Nommez : `Mariage Photos` → **Créer**
5. Attendez que le projet soit créé (2-3 secondes)

### 2.2 Activer Google Drive API

1. Dans la barre de recherche, tapez : `Google Drive API`
2. Cliquez sur **Google Drive API** (résultat officiel)
3. Cliquez **ACTIVER**
4. Attendez quelques secondes

### 2.3 Créer une clé API

1. Dans le menu gauche, allez dans **Identifiants**
2. Cliquez **Créer identifiant** → **Clé API**
3. Une clé est générée : **Copiez-la**
4. Optionnel : Limitez la clé à Google Drive
   - Cliquez sur votre clé
   - **Restriction API** → Sélectionnez **Google Drive API**
   - **Enregistrer**

---

## Étape 3 : Configurer le site

Editez `js/app.js` et remplacez :

```javascript
const GOOGLE_DRIVE_FOLDER_ID = 'VOTRE_ID_FOLDER_ICI';    // Étape 1
const GOOGLE_DRIVE_API_KEY = 'VOTRE_API_KEY_ICI';        // Étape 2
```

OU créez un fichier `.env` (voir `.env.example`).

---

## Étape 4 : Tester

### 4.1 Télécharger des photos

1. Allez sur votre dossier Drive
2. Téléchargez 3-5 photos JPG/PNG
3. Attendez que le téléchargement soit terminé

### 4.2 Tester le site

1. Actualisez le site
2. Allez dans **Partager mes photos**
3. Vous devriez voir les photos du Drive ✓
4. Cliquez sur une photo pour la voir en grand

---

## 🔐 Sécurité

✅ **La clé API est sûre car** :
- Limitée à Google Drive API
- Clé publique ("unrestricted" est acceptable)
- Lecture seule (pas d'accès en écriture)
- Dossier partagé publiquement

⚠️ **À faire** :
- Ne pas commiter `.env` avec clés réelles
- Utiliser `.env.example` comme template
- Ajouter `.env` à `.gitignore` ✓

---

## 📋 Checklist finale

- [ ] Dossier Drive créé
- [ ] Dossier Drive partagé public
- [ ] FOLDER_ID copié
- [ ] Google Drive API activée
- [ ] Clé API générée
- [ ] API_KEY copié
- [ ] `js/app.js` configuré
- [ ] Photos téléchargées sur Drive
- [ ] Site testé localement ✓
- [ ] Tout fonctionne ! 🎉

---

## 🆘 Dépannage

### Photos ne s'affichent pas

1. Vérifiez l'API KEY dans `js/app.js`
2. Vérifiez le FOLDER_ID
3. Ouvrez la console (F12) et regardez les erreurs
4. Vérifiez que le dossier est partagé public

### Erreur "Unauthorized"

- La clé API est incorrecte
- L'API n'est pas activée
- Attendez 1-2 minutes après l'activation

### Erreur CORS

- Normal si testé en local
- Fonctionne sur GitHub Pages

---

## 📸 Format des photos

✅ Acceptés :
- JPG / JPEG
- PNG
- WebP
- GIF

✅ Taille :
- Minimum : 100x100px
- Recommandé : 1000-2000px
- Maximum : Sans limite (compression auto)

---

## 🎯 URLs utiles

- [Google Cloud Console](https://console.cloud.google.com)
- [Google Drive](https://drive.google.com)
- [Documentation API](https://developers.google.com/drive/api/guides/about-sdk)

Vous êtes prêt ! 🌅
