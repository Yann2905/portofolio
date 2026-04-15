# Portfolio — Yann Aristide Telessie

Portfolio interactif conçu comme une application mobile premium, avec dashboard admin et persistance MongoDB.

**Stack** : Next.js 14 (App Router) · React · TypeScript · Tailwind · Framer Motion · Zustand · Zod · Sonner · Mongoose · NextAuth · Cloudinary

---

## 🚀 Démarrage rapide

```bash
cd portfolio
npm install
cp .env.example .env.local
# remplir .env.local (voir ci-dessous)
npm run dev
```

Ouvrir http://localhost:3000 — le portfolio fonctionne immédiatement avec les données seed, même sans MongoDB.

---

## ⚙️ Configuration `.env.local`

### 1. MongoDB

Créez un cluster gratuit sur [MongoDB Atlas](https://www.mongodb.com/atlas), puis :

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/portfolio
```

### 2. NextAuth

```bash
# Générer un secret aléatoire
openssl rand -base64 32
```

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<collez-le-secret>
```

### 3. Compte admin (credentials)

```bash
# Générer le hash de votre mot de passe
npm run hash -- "MonMotDePasseFort123"
```

Copier la ligne affichée dans `.env.local` :

```
ADMIN_EMAIL=votre@email.com
ADMIN_PASSWORD_HASH=$2a$10$...
```

### 4. Cloudinary (upload d'images)

1. Créez un compte sur [Cloudinary](https://cloudinary.com)
2. **Settings → Upload → Upload presets** : créez un preset en mode `Unsigned`
3. Renseignez :

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=nom-du-preset
```

---

## 🌱 Seed initial

Pour peupler la base avec les 4 projets d'exemple :

```bash
npm run seed
```

---

## 🔐 Accès admin

1. Allez sur http://localhost:3000/admin/login
2. Connectez-vous avec `ADMIN_EMAIL` + mot de passe (celui que vous avez hashé)
3. Vous accédez au dashboard : stats, CRUD projets, messages

### Fonctionnalités admin

- ➕ **Créer / modifier / supprimer** un projet
- 🖼️ **Upload d'images** (couverture + galerie) via Cloudinary
- 🏷️ **Gestion des tags** (technos) avec ajout/suppression
- ⭐ **Featured** + **ordre d'affichage**
- 📨 **Messages** : lus/non lus, réponse email, suppression

---

## 🗂️ Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── contact/route.ts
│   │   ├── messages/route.ts
│   │   ├── messages/[id]/route.ts
│   │   ├── projects/route.ts
│   │   └── projects/[id]/route.ts
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── page.tsx
│   │   ├── messages/page.tsx
│   │   └── projects/
│   │       ├── page.tsx
│   │       ├── new/page.tsx
│   │       └── [id]/edit/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # server component, fetch DB
├── components/
│   ├── admin/             # Sidebar, ProjectForm, MessagesList, …
│   ├── screens/           # HomeScreen, ProjectsScreen, SkillsScreen, ContactScreen
│   ├── Avatar.tsx
│   ├── BottomNav.tsx
│   ├── DesktopDecor.tsx
│   ├── PhoneShell.tsx
│   └── StatusBar.tsx
├── lib/
│   ├── models/            # Mongoose: Project, Message
│   ├── auth.ts            # NextAuth config
│   ├── data.ts            # fallback seed
│   ├── data-service.ts    # getProjects() DB + fallback
│   ├── db.ts              # connexion mongoose cached
│   ├── store.ts           # Zustand
│   ├── types.ts
│   ├── utils.ts
│   └── validation.ts      # Zod schemas
├── scripts/
│   ├── hash-password.ts
│   └── seed.ts
├── public/
│   └── yann.jpg           # votre photo (à déposer ici)
├── types/next-auth.d.ts
├── middleware.ts          # protège /admin/*
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## 🛡️ Sécurité

- **Middleware** NextAuth protégeant `/admin/*` (hors `/admin/login`)
- **API routes admin** protégées par `getServerSession` + vérification `role === "admin"`
- **Validation Zod** à l'entrée de chaque POST/PATCH
- **Passwords** hashés avec bcrypt (jamais stockés en clair)
- **Pas de collection User** : compte admin unique via env vars → surface d'attaque minimale
- **`.env.local`** dans `.gitignore` — ne jamais committer

---

## 🚢 Déploiement Vercel

1. Push sur GitHub
2. Importer le repo sur [Vercel](https://vercel.com)
3. Renseigner toutes les variables `.env.example` dans Vercel → Settings → Environment Variables
4. ⚠️ Pour `NEXTAUTH_URL` en prod : utilisez votre domaine (ex: `https://yann-telessie.vercel.app`)
5. Déployer

---

## 📸 Photo de profil

Déposez votre photo dans `public/yann.jpg` (carré, 400×400 min). Sans photo, un fallback "YT" s'affiche.

---

## 📝 Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm start` | Lancer le build |
| `npm run hash -- "motdepasse"` | Générer un hash bcrypt |
| `npm run seed` | Peupler la DB avec les projets seed |

---

© 2025 DALNOVA — Daloa, Côte d'Ivoire
