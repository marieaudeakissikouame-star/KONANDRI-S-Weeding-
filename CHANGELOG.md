# Changelog — Site Compagnon Mariage

## [2.0.0] — 2026-07-19

### ✨ Nouvelles fonctionnalités

- **Mini-app mobile** : Écran d'accueil type application avec splash screen
- **Thème Tropical Sunset cohérent** : Design premium avec palette harmonisée
- **Optimisation connexion faible** : Animations réduites, lazy loading, compression d'images
- **Navigation fluide** : 6 cartes interactives, 1-2 clics pour tout accès
- **Recherche intelligente** : Correction d'accents, tirets, majuscules (Levenshtein)
- **Galerie responsive** : Mosaïque adaptée mobile et desktop
- **Sécurité améliorée** : localStorage pour photos/guestbook

### 🎨 Changements visuels

- Refonte CSS complète : variables, flexbox, CSS Grid
- Palette cohérente : coral, sunset, rose, gold
- Typographie premium : Fraunces (serif) + Outfit (sans-serif)
- Animations souples : transitions 0.3s ease
- Safe area support : notch/encoche sur iOS

### 📱 Optimisations mobiles

- Breakpoints : 480px pour mobile
- Touches : tap-highlight-color transparent
- Images : lazy loading, compression JPEG 70%
- Batterie : dark mode, réduction motion support
- Débit : stockage local prioritaire

### 🔧 Technique

- Vanilla JS (zéro dépendance)
- CSS moderne (variables, gradients, grid)
- Responsive design mobile-first
- Google Sheets sync intégrée
- Firebase ready (optionnel)

### 📊 Performance

- CSS : 17KB minifié
- JS : 12KB vanilla
- Images : compression automatique
- Chargement : progressive enhancement
- Connexion faible : 3G/4G supportée

## [1.0.0] — 2026-07-19

### Initiale

- Structure HTML/CSS/JS de base
- Recherche de place
- Upload photos
- Livre d'or
- Google Sheets sync
