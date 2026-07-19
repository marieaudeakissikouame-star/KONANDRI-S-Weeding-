# 📊 Configuration Google Sheets - Guide Complet

## Étape 1 : Créer le Google Sheet

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Cliquez **Créer** → **Feuille de calcul vierge**
3. Nommez : `Mariage Yoane & Marie-Aude - Invités`
4. **Partagez** :
   - Clic **Partager** (en haut à droite)
   - Changez à **Accès public** → **Lecteur**

---

## Étape 2 : Onglet 1 - Réponses au formulaire

### 2.1 Renommer l'onglet

1. En bas, clic droit sur "Feuille 1" → **Renommer**
2. Tapez exactement : `Réponses au formulaire 1`

### 2.2 Créer les colonnes

Ligne 1 (en-têtes) :
```
| A (Timestamp) | B (Prénom Nom)  | C (Accompagnant?) |
|---------------|-----------------|-------------------|
```

### 2.3 Ajouter les données

```
Timestamp | Prénom Nom        | Accompagnant?
----------|-------------------|---------------
10:00 AM  | Marie Aude        | Oui
10:05 AM  | Yoane Kouakou     | Non
10:10 AM  | Assagou Josaphat  | Oui
10:15 AM  | Koné Ismaël       | Non
```

**Important** :
- Colonne B : Prénom + Nom complet
- Colonne C : "Oui" ou "Non" (sensible à la casse)

---

## Étape 3 : Onglet 2 - Table des invités

### 3.1 Créer un nouvel onglet

1. En bas, clic **+** (bouton ajouter)
2. Nommez exactement : `Table des invités`

### 3.2 Créer les colonnes

Ligne 1 (en-têtes) :
```
| A (Nom)     | B (Table) | C (Place) |
|-------------|-----------|----------|
```

### 3.3 Ajouter les données

```
Nom               | Table | Place
------------------|-------|-------
Marie Aude        | 1     | 1
Yoane Kouakou     | 1     | 2
Assagou Josaphat  | 1     | 3
Koné Ismaël       | 2     | 1
Bosson Mickael    | 2     | 2
```

**Important** :
- Colonne A : Nom complet (DOIT matcher Onglet 1, Colonne B)
- Colonne B : Numéro de table (nombre)
- Colonne C : Numéro de place (nombre)

---

## Étape 4 : Récupérer l'ID du Sheet

1. Regardez l'URL du sheet :
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_ICI/edit
                                        ↑ Copiez ceci
   ```

2. Copiez l'ID entre `/d/` et `/edit`

---

## Étape 5 : Configurer le site

Editez `js/app.js` et remplacez :

```javascript
const SHEET_ID = 'VOTRE_SHEET_ID_ICI';        // Étape 4
const TAB_RSVP = 'Réponses au formulaire 1';  // Nom exact onglet 1
const TAB_TABLES = 'Table des invités';       // Nom exact onglet 2
```

---

## Étape 6 : Tester

### 6.1 Tester la synchronisation

1. Actualisez le site
2. Attendez 3-5 secondes
3. Allez dans **Trouver ma place**
4. Recherchez un nom (ex: "Marie")
5. Vous devriez voir sa table et place ✓

### 6.2 Tester la mise à jour

1. Modifiez un nom dans Google Sheets
2. Attendez 5 secondes
3. Actualisez le site
4. Recherchez le nouveau nom ✓

---

## 📋 Checklist finale

- [ ] Google Sheet créé
- [ ] Sheet partagé public (lecteur)
- [ ] Onglet 1 nommé exactement : `Réponses au formulaire 1`
- [ ] Onglet 1 avec colonnes : Timestamp | Prénom Nom | Accompagnant?
- [ ] Onglet 2 nommé exactement : `Table des invités`
- [ ] Onglet 2 avec colonnes : Nom | Table | Place
- [ ] Données de test ajoutées
- [ ] SHEET_ID copié
- [ ] `js/app.js` configuré
- [ ] Site testé ✓

---

## 🆘 Dépannage

### Erreur "Synchronisation échouée"

1. Vérifiez l'SHEET_ID dans `js/app.js`
2. Vérifiez les noms d'onglets (sensibles à la casse)
3. Vérifiez que le Sheet est partagé public
4. Ouvrez la console (F12) pour voir l'erreur

### Noms ne se trouvent pas

1. Vérifiez que les noms matchent entre Onglet 1 et Onglet 2
2. Utilisez exactement les mêmes accents
3. Pas d'espaces inutiles

### Données ne se mettent pas à jour

1. Attendez 5-10 secondes après modification
2. Actualisez le site (F5)
3. Vérifiez la console pour les erreurs

---

## 📝 Format attendu

### Onglet 1 : Réponses
```
Timestamp      | Prénom Nom  | Accompagnant?
10:00 AM       | Marie Aude  | Oui
```

- Timestamp : Date/heure (any format)
- Prénom Nom : Text
- Accompagnant? : "Oui" ou "Non" (sensible casse)

### Onglet 2 : Tables
```
Nom        | Table | Place
Marie Aude | 1     | 1
```

- Nom : Text (doit matcher Onglet 1)
- Table : Number
- Place : Number

---

## 🎯 URLs utiles

- [Google Sheets](https://sheets.google.com)
- [Google Sheets API Docs](https://developers.google.com/sheets/api)

Vous êtes prêt ! 🎉
