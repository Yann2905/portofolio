import type { Project, Skill } from "./types";

export const profile = {
  name: "Yann Aristide Telessie",
  shortName: "Yann Telessie",
  role: "Développeur Web & Mobile",
  company: "DALNOVA",
  title: "Directeur Général de DALNOVA",
  location: "Daloa, Côte d'Ivoire",
  email: "contact@dalnova.ci",
  tagline: "Je transforme des idées en produits digitaux performants.",
  bio: `Développeur web & mobile, entrepreneur et Directeur Général de DALNOVA.
Basé à Daloa, je conçois des applications performantes, innovantes et alignées sur les standards internationaux.
À travers DALNOVA, je dirige une équipe qui accompagne entreprises et particuliers dans la conception, le développement et la mise en production de plateformes web et mobiles sur mesure.`,
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  stats: [
    { label: "Projets livrés", value: "40+" },
    { label: "Années d'exp.", value: "6+" },
    { label: "Clients", value: "25+" },
  ],
};

export const projects: Project[] = [
  {
    id: "dalnova-platform",
    title: "DALNOVA Platform",
    tagline: "Plateforme SaaS de gestion client & projets",
    description:
      "Suite SaaS complète développée pour DALNOVA : gestion de clients, suivi de projets, facturation automatisée et tableau de bord analytique. Architecture modulaire, API REST sécurisée et interface utilisateur inspirée des apps mobiles premium.",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80",
    ],
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
    demoUrl: "#",
    codeUrl: "#",
    year: 2025,
    role: "Lead Developer & Product Owner",
  },
  {
    id: "fintech-mobile",
    title: "Kora Pay",
    tagline: "App fintech mobile de paiement P2P",
    description:
      "Application mobile de paiement pair-à-pair pour le marché ouest-africain. Transferts instantanés, QR code, historique intelligent et sécurité biométrique. Pensée mobile-first avec interactions haptiques et animations fluides.",
    cover:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80",
    ],
    tags: ["React Native", "Node.js", "PostgreSQL", "Stripe"],
    demoUrl: "#",
    year: 2024,
    role: "Fullstack Mobile Engineer",
  },
  {
    id: "ecommerce-ci",
    title: "MarketCI",
    tagline: "Marketplace e-commerce nouvelle génération",
    description:
      "Marketplace multi-vendeurs pour artisans et commerçants de Côte d'Ivoire. Catalogue dynamique, paiement mobile money, livraison géolocalisée et dashboard vendeur complet.",
    cover:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1200&q=80",
    ],
    tags: ["Next.js", "Prisma", "Stripe", "Cloudinary"],
    demoUrl: "#",
    codeUrl: "#",
    year: 2024,
    role: "Fullstack Developer",
  },
  {
    id: "edu-platform",
    title: "EduFlow",
    tagline: "Plateforme e-learning interactive",
    description:
      "Plateforme d'apprentissage en ligne avec parcours personnalisés, suivi de progression gamifié, quiz interactifs et espace formateur. Expérience utilisateur pensée comme une app mobile immersive.",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    ],
    tags: ["Next.js", "MongoDB", "Framer Motion"],
    year: 2023,
    role: "Lead Frontend Engineer",
  },
];

export const skills: Skill[] = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "Framer Motion", level: 85, category: "Frontend" },
  { name: "React Native", level: 85, category: "Mobile" },
  { name: "Flutter", level: 70, category: "Mobile" },
  { name: "Node.js / Express", level: 90, category: "Backend" },
  { name: "MongoDB / Prisma", level: 85, category: "Backend" },
  { name: "PostgreSQL", level: 80, category: "Backend" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "Vercel / CI-CD", level: 85, category: "DevOps" },
  { name: "UI / UX Design", level: 80, category: "Design" },
];
