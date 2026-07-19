# 🎉 Site Compagnon de Mariage — Yoane & Marie-Aude

**Expérience digitale interactive pour le mariage du 08 août 2026**

## 🌅 Vue d'ensemble

Ce site est une **mini-application web de mariage** conçue comme guide interactif pour les invités.

**Thème** : Tropical Sunset — Jardin tropical élégant à Menara Garden, Yopougon

### ✨ Caractéristiques principales

✅ **Écran d'accueil type application** — Splash screen immersif avec navigation fluide  
✅ **Recherche de placement** — Trouvez votre table et vos voisins (avec correction intelligente)  
✅ **Menu interactif** — Saveurs traditionnelles ivoiriennes  
✅ **Galerie collaborative** — Partagez vos photos (compression automatique)  
✅ **Album officiel** — Photos du photographe  
✅ **Livre d'or** — Messages des invités  
✅ **Optimisé mobile** — Design mobile-first, connexion faible supportée  
✅ **Synchronisation Google Sheets** — Mise à jour automatique des invités et placements  

---

## 🎨 Direction artistique

**Palette Tropical Sunset** :
- Blanc, ivoire, pêche, corail, orange sunset
- Touches dorées fines
- Rose poudré, vert profond
- Textures naturelles et lumière chaude

**Design** :
- Premium & chaleureux
- Romantique & naturel
- Animations douces (réduites sur connexion faible)
- Évite le kitsch et l'artificiel

---

## 📱 Expérience utilisateur

### Navigation en 1-2 clics

1. **Splash Screen** → "Entrer dans notre univers"
2. **Home** → 6 cartes interactives :
   - 🪑 Trouver ma place
   - 🍽️ Les saveurs
   - 🎁 Cadeaux
   - 📸 Partager mes photos
   - 🖼️ Album officiel
   - 💌 Livre d'or

### Optimisations mobiles

- **Chargement rapide** : images compressées, lazy loading
- **Connexion faible** : animations réduites, données minimalistes
- **Batterie** : dark mode support, CSS léger
- **Touch-friendly** : espacements généreux, boutons adaptés
- **Safe area** : notch/encoche supportés

---

## 🚀 Quick Start

### Local

```bash
# Cloner et lancer un serveur local
cd KONANDRI-S-Weeding-
python -m http.server 8000
# Ouvrir http://localhost:8000
```

### GitHub Pages

Le site est déployé automatiquement sur :
```
https://marieaudeakissikouame-star.github.io/KONANDRI-S-Weeding-/
```

---

## 🔧 Configuration

### Google Sheets (Synchronisation invités)

1. Créez un Google Sheet avec deux onglets :
   - **Réponses au formulaire 1** : Prénoms + Confirmations
   - **Table des invités** : Noms + Tables + Places

2. Rendez le sheet **public en lecture**

3. Copiez l'ID du sheet dans `js/app.js` :
   ```javascript
   const SHEET_ID = 'votre_id_ici';
   ```

4. Le site synchronisera automatiquement ✓

---

## 📂 Structure

```
.
├── index.html           # HTML principal (7 écrans)
├── css/
│   └── styles.css       # Thème Tropical Sunset (17KB optimisé)
├── js/
│   └── app.js           # Logique (navigation, recherche, photos)
└── README.md            # Documentation
```

---

## 🎯 Fonctionnalités détaillées

### Trouver ma place

- Recherche intelligente (accents, tirets, majuscules)
- Affichage personnalisé : table, place, voisins
- Autocomplétion basée sur Levenshtein

### Photos

- Upload multiple
- Compression automatique (JPEG 70%, max 1000px)
- Galerie mosaïque responsive
- Lazy loading des images

### Guestbook

- Formulaire simple
- Messages stockés localement (localStorage)
- Affichage en cartes élégantes
- Date automatique

### Menu

- Présentation des saveurs (mets ivoiriens)
- Catégories : Entrée, Plats, Douceur, Boissons
- Typographie premium

---

## 🔐 Stockage

- **LocalStorage** : Photos partagées, livre d'or
- **Google Sheets** : Liste invités (lecture)
- **Firebase** (optionnel) : Pour synchronisation en temps réel

---

## 📊 Performance

- **Bundle CSS** : 17KB (minifié)
- **JS vanilla** : Aucune dépendance
- **Lazy loading** : Images chargées à la demande
- **Images compressées** : JPEG 70%, dimensions optimales
- **Mobile-first** : Media queries optimisées

---

## 🌐 Compatibilité

✅ Tous les navigateurs modernes (mobile & desktop)  
✅ iOS 12+ (PWA support)  
✅ Android 5+ (Chrome, Firefox, Samsung Internet)  
✅ Connexion lente (3G/4G Côte d'Ivoire)

---

## 🎁 Éléments clés

### Verset biblique

> « Par-dessus tout, revêtez-vous de l'amour, qui est le lien de la perfection. »
> 
> **Colossiens 3:14**

Intégré discrètement sur la splash screen.

### Cadeaux

Section élégante et discrète :
- Valorise la présence
- Mention des espèces (facilité au retour à Dakar)
- Pas de QR code, Wave ou paiement mobile

---

## 🛠️ Développement

### Ajouter une photo officielle

```javascript
const PHOTOS_OFFICIEL = [
  'url-photo-1.jpeg',
  'url-photo-2.jpeg',
  'url-photo-3.jpeg'
];
```

### Personnaliser les couleurs

Editez `:root` dans `css/styles.css` :

```css
:root {
  --coral: #E8734A;
  --sunset: #D9572E;
  --rose: #EAC0BC;
  /* ... etc */
}
```

---

## 📝 Notes techniques

- **Pas de dépendances externes** (vanilla JS)
- **HTML sémantique** pour accessibilité
- **CSS variables** pour maintenabilité
- **Animations réduites** sur `prefers-reduced-motion`
- **Dark mode** supporté automatiquement

---

## 🚢 Déploiement

```bash
# Tout est prêt sur GitHub Pages !
# Juste vérifier :
# 1. Settings → Pages → Source = main branch
# 2. Fichiers dans la racine du dépôt
```

Le site est live à :
```
https://marieaudeakissikouame-star.github.io/KONANDRI-S-Weeding-/
```

---

## 💡 Améliorations futures (optionnel)

- Firebase Firestore (temps réel)
- Authentication (admin moderation)
- PWA (offline support)
- Widget plan interactif du jardin
- Galerie Google Drive intégrée

---

## 📞 Support

Si vous avez des questions ou besoin de modifications, consultez les fichiers du dépôt ou demandez une mise à jour.

---

**Créé avec ❤️ pour Yoane & Marie-Aude**  
*08 août 2026 · Tropical Sunset · Menara Garden*
