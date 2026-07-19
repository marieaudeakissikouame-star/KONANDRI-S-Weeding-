# 💻 Installation & Déploiement

## Pré-requis

- Git
- Un navigateur moderne
- (Optionnel) Python pour tester localement

---

## 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/marieaudeakissikouame-star/KONANDRI-S-Weeding-.git
cd KONANDRI-S-Weeding-
```

---

## 2️⃣ Configurer Google Drive + Sheets

### Google Drive (Galerie photos)

Lire : **GOOGLE_DRIVE_SETUP.md**

1. Créer dossier Drive
2. Activer API
3. Récupérer FOLDER_ID et API_KEY
4. Éditer `js/app.js` :

```javascript
const GOOGLE_DRIVE_FOLDER_ID = 'VOTRE_FOLDER_ID';
const GOOGLE_DRIVE_API_KEY = 'VOTRE_API_KEY';
```

### Google Sheets (Invités)

Lire : **GOOGLE_SHEETS_SETUP.md**

1. Créer 2 onglets
2. Remplir données
3. Récupérer SHEET_ID
4. Éditer `js/app.js` :

```javascript
const SHEET_ID = 'VOTRE_SHEET_ID';
```

---

## 3️⃣ Tester localement

```bash
# Python 3
python -m http.server 8000

# Ouvrir dans navigateur
http://localhost:8000
```

---

## 4️⃣ Déployer sur GitHub Pages

### Option A : Automatic (Recommandé)

1. Allez sur GitHub → **Settings** → **Pages**
2. Source : **main branch** (ou votre branche)
3. Attendez 1-2 minutes
4. Votre site est live ! 🎉

### Option B : Manuel

```bash
# Commit et push sur main
git add .
git commit -m "Deploy: Site companion mariage"
git push origin main

# Site sera disponible à :
# https://marieaudeakissikouame-star.github.io/KONANDRI-S-Weeding-/
```

---

## 5️⃣ Vérifier le déploiement

1. Allez sur : `https://marieaudeakissikouame-star.github.io/KONANDRI-S-Weeding-/`
2. Testez les fonctionnalités :
   - ✅ Recherche invité
   - ✅ Upload photo
   - ✅ Livre d'or
   - ✅ Galerie Drive

---

## 📋 Checklist finale

- [ ] Repo cloné
- [ ] Google Drive configuré (FOLDER_ID + API_KEY)
- [ ] Google Sheets configuré (SHEET_ID)
- [ ] `js/app.js` mis à jour
- [ ] Testé localement
- [ ] Déployé sur GitHub Pages
- [ ] Site live et fonctionnel ✓

---

## 🆘 Problèmes courants

### Les photos Drive ne s'affichent pas

→ Lire `GOOGLE_DRIVE_SETUP.md` étape 4

### Les invités ne se trouvent pas

→ Lire `GOOGLE_SHEETS_SETUP.md` étape 6

### CORS error en local

→ C'est normal. Fonctionne sur GitHub Pages.

### Site ne s'affiche pas sur GitHub Pages

→ Vérifier Settings → Pages → Source

---

## 📞 Support

Consultez :
- `README.md` - Vue d'ensemble
- `SETUP.md` - Quick start
- `CONFIG.md` - Configuration rapide
- `GOOGLE_DRIVE_SETUP.md` - Google Drive détaillé
- `GOOGLE_SHEETS_SETUP.md` - Google Sheets détaillé

---

**Vous êtes prêt ! 🌅**
