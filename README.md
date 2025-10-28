# 🤖 AI Chat Application

Une application de chat IA moderne et performante avec interface en temps réel et streaming de réponses.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Compétences démontrées](#compétences-démontrées)

## 🎯 Vue d'ensemble

Application full-stack de chat IA démontrant des compétences avancées en développement web moderne. L'application permet aux utilisateurs de converser avec une IA (GPT-4o-mini) via une interface intuitive avec streaming des réponses en temps réel.

### Points forts techniques

- **Architecture Monorepo** avec gestion des workspaces
- **Streaming en temps réel** des réponses de l'IA
- **Gestion d'état** sophistiquée côté client
- **API RESTful** avec Express.js
- **Interface utilisateur moderne** avec React et TailwindCSS
- **TypeScript** pour la sécurité des types
- **Optimisations de performance** avec Vite

## ✨ Fonctionnalités

- 💬 **Chat en temps réel** avec streaming des réponses
- 🔄 **Historique de conversation** maintenu par session
- 🎨 **Interface responsive** et moderne
- ⚡ **Performance optimisée** avec chargement progressif
- 🎯 **Gestion d'erreurs** robuste
- 🔒 **Variables d'environnement** pour la sécurité
- 📱 **Design adaptatif** pour mobile et desktop

## 🛠 Technologies utilisées

### Frontend

- **React 19** - Bibliothèque UI avec les dernières fonctionnalités
- **TypeScript** - Typage statique pour la robustesse du code
- **Vite** - Build tool ultra-rapide
- **TailwindCSS 4** - Framework CSS utilitaire moderne
- **Radix UI** - Composants accessibles et personnalisables
- **Lucide React** - Icônes modernes

### Backend

- **Node.js** avec **Express 5** - Serveur web performant
- **OpenAI SDK** - Intégration avec l'API OpenRouter
- **TypeScript** - Type-safety côté serveur
- **Zod** - Validation de schémas
- **Dotenv** - Gestion des variables d'environnement

### Outils de développement

- **Bun** - Runtime JavaScript rapide et package manager
- **Prettier** - Formatage automatique du code
- **ESLint** - Linting pour la qualité du code
- **Husky** - Git hooks pour automatisation
- **lint-staged** - Linting des fichiers stagés
- **Concurrently** - Exécution parallèle du client et serveur

## 🏗 Architecture

### Monorepo Structure

```
ai-app/
├── packages/
│   ├── client/          # Application React
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── chat-box.tsx      # Composant principal du chat
│   │   │   │   ├── message-list.tsx  # Affichage des messages
│   │   │   │   ├── ui/               # Composants UI réutilisables
│   │   │   │   ├── layout/           # Composants de layout
│   │   │   │   └── shared/           # Composants partagés
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   ├── lib/                  # Utilitaires
│   │   │   └── App.tsx               # Composant racine
│   │   └── package.json
│   │
│   └── server/          # API Express
│       ├── controllers/
│       │   └── chat.controller.ts    # Contrôleur de chat
│       ├── services/
│       │   └── chat.service.ts       # Logique métier
│       ├── repositories/
│       │   └── conversation.repository.ts  # Gestion des données
│       ├── routes/
│       │   └── routes.ts             # Définition des routes
│       ├── index.ts                  # Point d'entrée serveur
│       └── package.json
│
├── index.ts             # Script de démarrage concurrent
└── package.json         # Configuration du workspace racine
```

### Flux de données

1. **Client** → Envoi du message utilisateur via fetch API
2. **Server** → Réception et traitement de la requête
3. **OpenRouter API** → Appel à GPT-4o-mini avec streaming
4. **Server** → Streaming des chunks de réponse via Server-Sent Events
5. **Client** → Réception et affichage progressif de la réponse

## 📦 Installation

### Prérequis

- **Bun** >= 1.3.0 (ou Node.js >= 18)
- Clé API OpenRouter (ou OpenAI)

### Installation de Bun (si nécessaire)

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation des dépendances

```bash
# Cloner le repository
git clone https://github.com/Os-humble-man/ai-app.git
cd ai-app

# Installer toutes les dépendances (workspaces)
bun install
```

## ⚙️ Configuration

Créer un fichier `.env` à la racine du projet :

```env
# API Configuration
OPENROUTER_API_KEY=your_api_key_here

# Server Configuration
PORT=3000
```

### Obtenir une clé API

1. Créer un compte sur [OpenRouter](https://openrouter.ai/)
2. Générer une clé API dans les paramètres
3. Copier la clé dans le fichier `.env`

## 🚀 Utilisation

### Démarrage en mode développement

```bash
# Démarrer client et serveur simultanément
bun run dev
```

Cette commande lance :
- **Serveur Express** sur `http://localhost:3000`
- **Client Vite** sur `http://localhost:5173`

### Accès à l'application

Ouvrir le navigateur et naviguer vers `http://localhost:5173`

### Build de production

```bash
# Build du client
cd packages/client
bun run build

# Les fichiers de production seront dans packages/client/dist/
```

## 📜 Scripts disponibles

### Racine du projet

```bash
bun run dev      # Démarre client et serveur en mode dev
bun run format   # Formate le code avec Prettier
```

### Client (`packages/client`)

```bash
bun run dev      # Démarre le serveur de dev Vite
bun run build    # Build de production
bun run lint     # Linting avec ESLint
bun run preview  # Prévisualisation du build
```

### Serveur (`packages/server`)

```bash
bun run dev      # Démarre avec hot-reload
bun run start    # Démarre le serveur
```

## 📂 Structure du projet

```
ai-app/
├── .husky/                 # Git hooks
├── packages/
│   ├── client/
│   │   ├── public/         # Assets statiques
│   │   ├── src/
│   │   │   ├── assets/     # Images, SVG
│   │   │   ├── components/ # Composants React
│   │   │   ├── hooks/      # Custom hooks
│   │   │   ├── lib/        # Utilitaires
│   │   │   ├── App.tsx
│   │   │   ├── App.css
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── server/
│       ├── controllers/    # Contrôleurs Express
│       ├── services/       # Logique métier
│       ├── repositories/   # Couche données
│       ├── routes/         # Définition routes API
│       ├── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── .gitignore
├── .prettierrc             # Configuration Prettier
├── .lintstagedrc           # Configuration lint-staged
├── bun.lock
├── index.ts                # Point d'entrée principal
├── package.json            # Workspace configuration
├── tsconfig.json           # Configuration TypeScript racine
└── README.md
```

## 💼 Compétences démontrées

### Développement Frontend

- ✅ **React moderne** avec hooks et gestion d'état complexe
- ✅ **TypeScript avancé** avec types personnalisés et génériques
- ✅ **Architecture composants** modulaire et réutilisable
- ✅ **UI/UX design** avec TailwindCSS et composants Radix UI
- ✅ **Performance** avec optimisations React et Vite
- ✅ **Streaming temps réel** avec ReadableStream API

### Développement Backend

- ✅ **API RESTful** avec Express.js
- ✅ **Architecture en couches** (Controllers, Services, Repositories)
- ✅ **Intégration API externe** (OpenAI/OpenRouter)
- ✅ **Server-Sent Events** pour le streaming
- ✅ **Gestion d'erreurs** robuste
- ✅ **Configuration environnement** sécurisée

### DevOps et outils

- ✅ **Monorepo** avec workspaces
- ✅ **Git hooks** avec Husky
- ✅ **Code quality** avec ESLint et Prettier
- ✅ **TypeScript** full-stack
- ✅ **Outils modernes** (Bun, Vite, Concurrently)
- ✅ **Documentation** complète et professionnelle

### Bonnes pratiques

- ✅ Séparation des préoccupations (SoC)
- ✅ Code maintenable et évolutif
- ✅ Typage fort avec TypeScript
- ✅ Gestion d'erreurs appropriée
- ✅ Structure de projet claire
- ✅ Code formaté et linté automatiquement

---

## 📝 Notes de développement

### Choix techniques

- **Bun** choisi pour ses performances exceptionnelles
- **Monorepo** pour faciliter le partage de types entre client/serveur
- **Streaming** pour une meilleure expérience utilisateur
- **TailwindCSS** pour un développement UI rapide et cohérent
- **Radix UI** pour l'accessibilité et la personnalisation

### Améliorations futures possibles

- [ ] Authentification utilisateur
- [ ] Persistance des conversations en base de données
- [ ] Support de plusieurs modèles d'IA
- [ ] Mode sombre
- [ ] Export des conversations
- [ ] Tests unitaires et E2E
- [ ] Déploiement CI/CD
- [ ] Gestion des fichiers/images
- [ ] Multi-langue (i18n)

---

## 📄 Licence

Ce projet est un portfolio de démonstration de compétences en développement.

## 👤 Auteur

Créé dans le cadre d'une démonstration de compétences techniques pour recruteurs.

**Compétences clés** : React, TypeScript, Node.js, Express, API Integration, Monorepo, Modern Web Development
