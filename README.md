# AyAltı: The Ephemeral Anonymous Sharing Platform

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](#)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-red?logo=vercel&logoColor=white)](#)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](#)

## 📖 Abstract

**AyAltı** is a hyper-optimized, frictionless, and ephemeral anonymous sharing ecosystem. Built with a robust **monorepo architecture** and leveraging the bleeding edge of modern web development, it provides a highly resilient, visually engaging, and decentralized-feeling platform for users to broadcast their thoughts without the overhead of traditional authentication mechanisms. 

The application utilizes a sophisticated local-storage-based identity synthesis paradigm, completely decoupling user interaction from PII (Personally Identifiable Information) while flawlessly preserving session continuity and user-specific data aggregation via a powerful **Supabase** backend. 

## ✨ Key Features

- **Frictionless Ephemeral Onboarding:** Bypasses traditional OAuth and JWT-based authentication flows. Identities are cryptographically synthesized on the client via persistent local storage heuristics, ensuring absolute anonymity while maintaining relational integrity.
- **Isomorphic Rendering Engine:** Powered by Next.js App Router, the platform heavily utilizes React Server Components (RSC) and highly-performant Client Components to deliver an optimal Time-to-Interactive (TTI) metric.
- **Dynamic Masonry Layout:** The feed employs a complex, responsive masonry algorithm that organically fluidifies the content consumption experience across varied viewport breakpoints.
- **Real-time Optimistic UI:** Implements robust optimistic updates for granular engagement vectors (likes, comments, and deep-nested sub-threads), drastically reducing perceived latency.
- **Component-Driven Design System:** Underpinned by **shadcn/ui** and **Tailwind CSS**, the UI comprises atomic, strictly-typed, and highly accessible React components decoupled into an isolated workspace package.

## 🏗 Architectural Topology

This repository is orchestrated natively as a **Turborepo** monorepo, aggressively utilizing remote caching mechanisms and parallelized execution pipelines to ensure a stellar Developer Experience (DX).

```bash
.
├── apps
│   └── web            # The core Next.js frontend application (App Router)
├── packages
│   ├── ui             # Headless & styled internal UI library (shadcn/ui + Tailwind v4)
│   ├── eslint-config  # Shared baseline linting paradigms
│   └── typescript     # Abstracted strictly-typed TS configs
└── sql                # Supabase PostgreSQL schema migrations and RLS mandates
```

## 🛠 Tech Stack

- **Core Framework:** Next.js (App Router), React 19
- **Bundler / Compiler:** Turbopack (dev) & Webpack/SWC (build)
- **Monorepo Orchestrator:** Turborepo, npm Workspaces
- **Styling Paradigm:** Tailwind CSS v4, Lucide Icons, shadcn/ui
- **Type Safety:** TypeScript (Strict mode enabled)
- **Backend-as-a-Service (BaaS):** Supabase (PostgreSQL, Row Level Security, Edge Functions)

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher (Strict engine enforcement).
- **npm**: `10.x` or higher.
- A **Supabase** instance and its environment variables.

### Bootstrapping the Environment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ayalti.git
   cd ayalti
   ```

2. **Hydrate dependencies:**
   Execute a workspace-aware dependency resolution via npm.
   ```bash
   npm install
   ```

3. **Inject Environment Variables:**
   Duplicate the template environment file across your local scope.
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   # Populate NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

4. **Ignite the Dev Server:**
   Launch the development environment utilizing Turbopack's high-octane caching layer.
   ```bash
   npm run dev
   ```

The application will be synchronously bound to `http://localhost:3000`.

## 📜 Database Schema Briefing

The schema heavily leverages PostgreSQL triggers and Row Level Security (RLS) for data integrity.
- `posts`: Aggregates the unstructured text payloads.
- `comments`: Relational mapping connecting anonymous hash-identities to `posts`.
- `comment_likes`: Multi-tenant pivot table ensuring one-like-per-entity validation.

## 🛡 License

This project is proprietary. All rights reserved.
