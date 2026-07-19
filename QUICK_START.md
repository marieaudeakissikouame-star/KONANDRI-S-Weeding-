# ⚡ Quick Start (5 minutes)

## 1. Clone

```bash
git clone https://github.com/marieaudeakissikouame-star/KONANDRI-S-Weeding-.git
cd KONANDRI-S-Weeding-
```

## 2. Google Drive Setup

### Créer dossier + API

1. [Google Drive](https://drive.google.com) → **Nouveau** → **Dossier**
2. Nommez : `Mariage Yoane & Marie-Aude - Photos`
3. **Partagez** → **Accès public** → **Lecteur**
4. Copiez l'ID : `https://drive.google.com/drive/folders/YOUR_ID`
5. [Google Cloud Console](https://console.cloud.google.com) → **Nouveau projet**
6. Cherchez **Google Drive API** → **Activer**
7. **Identifiants** → **Créer** → **Clé API**
8. Copiez la clé

### Configurer

```javascript
// js/app.js ligne 14-15
const GOOGLE_DRIVE_FOLDER_ID = 'VOTRE_ID';    // Étape 4
const GOOGLE_DRIVE_API_KEY = 'VOTRE_CLE';     // Étape 8
```

## 3. Google Sheets Setup

### Créer sheet + données

1. [Google Sheets](https://sheets.google.com) → **Créer**
2. **Partagez** → **Accès public** → **Lecteur**
3. **Onglet 1** → Renommez : `Réponses au formulaire 1`
   ```
   | Timestamp | Prénom Nom | Accompagnant? |
   |-----------|-----------|---------------|
   | 10:00 AM  | Marie Aude| Oui           |
   ```
4. **Onglet 2** → Cliquez **+** → Nommez : `Table des invités`
   ```
   | Nom       | Table | Place |
   |-----------|-------|-------|
   | Marie Aude| 1     | 1     |
   ```
5. Copiez l'ID : `https://docs.google.com/spreadsheets/d/YOUR_ID`

### Configurer

```javascript
// js/app.js ligne 9-11
const SHEET_ID = 'VOTRE_ID';                              // Étape 5
const TAB_RSVP = 'Réponses au formulaire 1';              // Exact
const TAB_TABLES = 'Table des invités';                   // Exact
```

## 4. Tester

```bash
# Local
python -m http.server 8000
# Ouvrir http://localhost:8000
```

### Tester :
- Allez dans "Trouver ma place" → Cherchez "Marie"
- Allez dans "Partager mes photos" → Vous verrez les photos Drive ✓

## 5. Deploy

```bash
git add .
git commit -m "Configuration finale"
git push origin main
```

→ Site live en 2 minutes sur GitHub Pages ! 🎉

---

**Site**: https://marieaudeakissikouame-star.github.io/KONANDRI-S-Weeding-/

Détails complets → `INSTALL.md`
