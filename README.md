# Next Theme Provider

Un projet d'apprentissage pour explorer **React** et **Next.js** en implémentant un système de thème (light/dark/système).

## À quoi ça sert ?

Combine un provider React Context avec Tailwind CSS pour gérer les thèmes dans une app Next.js 16. C'est une base pour comprendre :
- React Context + useReducer
- Client components ("use client")
- Tailwind et dark mode
- Gestion de `prefers-color-scheme`

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

## Structure

```
src/
  app/
    page.tsx           Page d'accueil
    layout.tsx         Root layout avec ThemeProvider
  lib/
    ui/
      theme-provider.tsx    Context + hooks
      theme-switcher.tsx    Boutons light/dark/system
```

## Comment ça marche

1. **ThemeProvider** (contexte React) : gère l'état du thème
2. **useTheme** (hook) : retourne l'état et les fonctions pour changer de thème
3. **ThemeSwitcher** : composant avec 3 boutons (☀️ 🌙 ⚙️)
4. **Tailwind** : `dark:` pour les styles mode sombre

## Stack

- **Next.js 16** + React 19
- **TypeScript**
- **Tailwind CSS 4**
- **Biome** (lint/format)

## Scripts

```bash
npm run dev       # Dev server
npm run build     # Build prod
npm run start     # Run prod
npm run lint      # Vérifier code
npm run format    # Formater code
```

---

**Note** : C'est un exercice d'apprentissage. Pas pour la production.
