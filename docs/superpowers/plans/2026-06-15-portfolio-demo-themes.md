# Portfolio multi-demo (Classic + Nature) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trasformare il sito in un portfolio unico con home-vetrina `/` e due demo a temi/contenuti distinti sotto `/demo/classic` (esistente) e `/demo/nature` (nuova bottega bio).

**Architecture:** Sottoalberi di route per demo (Approccio A). `__root.tsx` minimale; ogni demo ha un *layout route* che monta Header/Footer/DemoBar e imposta `data-demo` per i token di tema (CSS variables). Classic resta visivamente invariato (mantiene le sue classi hardcoded); Nature usa la palette via token. Home portfolio neutra a griglia.

**Tech Stack:** TanStack Start, TanStack Router (file-based, router-plugin), React 19, Tailwind CSS 4, TypeScript strict, Netlify.

**Verifica (no test framework):** ogni task si chiude con `npx tsc --noEmit` (exit 0) e check runtime via `curl` sul dev server (`pnpm run dev`, porta 3000). Build finale con `pnpm run build`.

**Refinement pragmatico vs spec:** per tenere il Classic *pixel-identico* e ridurre il rischio, i componenti Classic NON vengono ritematizzati (restano con le classi attuali). I token di tema servono a Nature, alla DemoBar e a temi futuri. La Home di Nature usa un hero proprio (non il `Carousel` condiviso).

---

## Convenzioni dev server (usate in ogni verifica)

Avvio dev server in background e attesa "ready", poi curl. Pattern:
```bash
pnpm run dev >/tmp/dev.log 2>&1 &
DEV=$!
for i in $(seq 1 30); do grep -q "ready in" /tmp/dev.log 2>/dev/null && break; sleep 1; done
# ... curl checks ...
kill $DEV 2>/dev/null; pkill -f "vite dev" 2>/dev/null
```
`tr -d '\0'` sull'output di curl per evitare warning su null bytes.

---

## Phase 1 — Fondamenta tema + primitivi condivisi

### Task 1: Token di tema + componenti condivisi (DemoBar, Button)

**Files:**
- Modify: `src/styles.css`
- Create: `src/components/portfolio/DemoBar.tsx`
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Aggiungere i token di tema in `src/styles.css`**

Sostituire l'intero contenuto di `src/styles.css` con:
```css
@import "tailwindcss" source("../");

:root {
  --bg: #ffffff;
  --surface: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --primary: #2563eb;
  --primary-contrast: #ffffff;
  --accent: #2563eb;
  --border: #e5e7eb;
  --radius: 0.75rem;
  --font-head: system-ui, -apple-system, sans-serif;
  --font-body: system-ui, -apple-system, sans-serif;
}

[data-demo="classic"] {
  --bg: #ffffff;
  --surface: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --primary: #2563eb;
  --primary-contrast: #ffffff;
  --accent: #2563eb;
  --border: #e5e7eb;
  --radius: 0.75rem;
  --font-head: system-ui, -apple-system, sans-serif;
  --font-body: system-ui, -apple-system, sans-serif;
}

[data-demo="nature"] {
  --bg: #f3f1e7;
  --surface: #ffffff;
  --text: #2f3a2e;
  --muted: #5a6b50;
  --primary: #2f5d3a;
  --primary-contrast: #f3f1e7;
  --accent: #85a86a;
  --border: #d9d3bf;
  --radius: 14px;
  --font-head: Georgia, 'Times New Roman', serif;
  --font-body: system-ui, -apple-system, sans-serif;
}

[data-demo] {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
}

[data-demo="nature"] h1,
[data-demo="nature"] h2,
[data-demo="nature"] h3 {
  font-family: var(--font-head);
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

code {
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}
```

- [ ] **Step 2: Creare `src/components/ui/Button.tsx`** (CTA che legge i token; usato da Nature e portfolio)

```tsx
import type { ReactNode } from 'react'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  external?: boolean
  className?: string
}

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  external = false,
  className = '',
}: ButtonLinkProps) {
  const base =
    'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-[var(--radius)] transition-colors'
  const styles =
    variant === 'solid'
      ? 'bg-[var(--primary)] text-[var(--primary-contrast)] hover:opacity-90'
      : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]'
  const extra = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...extra}>
      {children}
    </a>
  )
}
```

- [ ] **Step 3: Creare `src/components/portfolio/DemoBar.tsx`** (barra sottile presente in ogni demo)

```tsx
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export function DemoBar() {
  return (
    <div className="w-full bg-gray-900 text-gray-200 text-xs">
      <div className="max-w-6xl mx-auto px-4 h-9 flex items-center justify-between">
        <span className="text-gray-400">Demo realizzata da Mara</span>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Tutte le demo
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0 (i nuovi componenti non sono ancora usati, ma devono compilare).

- [ ] **Step 5: Commit**

```bash
git add src/styles.css src/components/ui/Button.tsx src/components/portfolio/DemoBar.tsx
git commit -m "feat: theme tokens + shared DemoBar/Button primitives"
```

---

## Phase 2 — Migrazione Classic sotto /demo/classic

### Task 2: `__root` minimale + layout route Classic

**Files:**
- Modify: `src/routes/__root.tsx`
- Create: `src/routes/demo/classic.tsx`

- [ ] **Step 1: Rendere `__root.tsx` minimale** (rimuove Header/Footer globali)

Sostituire l'intero `src/routes/__root.tsx` con:
```tsx
import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Mara · Siti demo' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export { Outlet }
```
(Nota: `Outlet` non serve qui; il root usa `children`. Non re-esportare se causa lint — rimuovere l'ultima riga se inutile.)

Versione definitiva senza export inutile:
```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Mara · Siti demo' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Creare il layout route Classic `src/routes/demo/classic.tsx`**

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/demos/classic/components/Header'
import { Footer } from '@/demos/classic/components/Footer'
import { DemoBar } from '@/components/portfolio/DemoBar'

export const Route = createFileRoute('/demo/classic')({
  component: ClassicLayout,
})

function ClassicLayout() {
  return (
    <div data-demo="classic" className="flex flex-col min-h-screen">
      <DemoBar />
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```
(Header di Classic è `fixed`; `pt-16` sul main compensa come prima. La DemoBar sta sopra e scorre via — accettabile.)

- [ ] **Step 3: Verifica typecheck (atteso FAIL temporaneo)**

Run: `npx tsc --noEmit`
Expected: errori "Cannot find module '@/demos/classic/components/Header'" — verranno risolti nel Task 3. Non committare ancora.

---

### Task 3: Spostare componenti, dati e route di Classic

**Files:**
- Move: `src/components/Header.tsx` → `src/demos/classic/components/Header.tsx`
- Move: `src/components/Footer.tsx` → `src/demos/classic/components/Footer.tsx`
- Move: `src/components/Carousel.tsx` → `src/components/ui/Carousel.tsx` (condiviso: usato da Classic e Nature)
- Move: `src/components/OfferCard.tsx` → `src/demos/classic/components/OfferCard.tsx`
- Move: `src/data/products.ts` → `src/demos/classic/data/products.ts`
- Move: `src/data/offers.ts` → `src/demos/classic/data/offers.ts`
- Move route files: `src/routes/index.tsx` → `src/routes/demo/classic/index.tsx`; `src/routes/offers.tsx` → `src/routes/demo/classic/offers.tsx`; `src/routes/contact.tsx` → `src/routes/demo/classic/contact.tsx`; `src/routes/download.tsx` → `src/routes/demo/classic/download.tsx`; `src/routes/products/` → `src/routes/demo/classic/products/`

- [ ] **Step 1: Eseguire gli spostamenti file (git mv)**

```bash
mkdir -p src/demos/classic/components src/demos/classic/data src/routes/demo/classic
git mv src/components/Header.tsx src/demos/classic/components/Header.tsx
git mv src/components/Footer.tsx src/demos/classic/components/Footer.tsx
git mv src/components/Carousel.tsx src/components/ui/Carousel.tsx
git mv src/components/OfferCard.tsx src/demos/classic/components/OfferCard.tsx
git mv src/data/products.ts src/demos/classic/data/products.ts
git mv src/data/offers.ts src/demos/classic/data/offers.ts
git mv src/routes/index.tsx src/routes/demo/classic/index.tsx
git mv src/routes/offers.tsx src/routes/demo/classic/offers.tsx
git mv src/routes/contact.tsx src/routes/demo/classic/contact.tsx
git mv src/routes/download.tsx src/routes/demo/classic/download.tsx
git mv src/routes/products src/routes/demo/classic/products
```

- [ ] **Step 2: Aggiornare i path di `createFileRoute` nei route file spostati**

Modifiche esatte (una stringa ciascuno):
- `src/routes/demo/classic/index.tsx`: `createFileRoute('/')` → `createFileRoute('/demo/classic/')`
- `src/routes/demo/classic/offers.tsx`: `createFileRoute('/offers')` → `createFileRoute('/demo/classic/offers')`
- `src/routes/demo/classic/contact.tsx`: `createFileRoute('/contact')` → `createFileRoute('/demo/classic/contact')`
- `src/routes/demo/classic/download.tsx`: `createFileRoute('/download')` → `createFileRoute('/demo/classic/download')`
- `src/routes/demo/classic/products/index.tsx`: `createFileRoute('/products/')` → `createFileRoute('/demo/classic/products/')`
- `src/routes/demo/classic/products/category/$category.tsx`: `createFileRoute('/products/category/$category')` → `createFileRoute('/demo/classic/products/category/$category')`
- `src/routes/demo/classic/products/$productId.tsx`: `createFileRoute('/products/$productId')` → `createFileRoute('/demo/classic/products/$productId')`

- [ ] **Step 3: Aggiornare gli import di componenti e dati**

In tutti i file che importavano i componenti/dati spostati, aggiornare i percorsi:
- Import dei dati: `@/data/products` → `@/demos/classic/data/products`; `@/data/offers` → `@/demos/classic/data/offers`. Include anche import relativi tipo `'../../data/products'` in `src/routes/demo/classic/products/$productId.tsx` → `@/demos/classic/data/products`.
- Import componenti nelle route: `@/components/Carousel` → `@/components/ui/Carousel` (condiviso); `@/components/OfferCard` → `@/demos/classic/components/OfferCard`.
- In `Carousel.tsx`/`OfferCard.tsx`/`Header.tsx`/`Footer.tsx` non c'erano import incrociati tra loro tranne tipi: `OfferCard.tsx` importa `@/data/offers` → `@/demos/classic/data/offers`.

Comando per trovare i riferimenti residui da correggere:
```bash
grep -rn "@/components/\(Header\|Footer\|Carousel\|OfferCard\)\|@/data/\|\.\./\.\./data/\|\.\./data/" src
```
Tutti i match devono puntare ai nuovi percorsi (o essere rimossi se non più validi).

- [ ] **Step 4: Aggiornare i `Link to` interni del Classic ai nuovi path**

Mappa di sostituzione (in tutti i file sotto `src/routes/demo/classic/` e `src/demos/classic/components/`):
- `to="/"` (link Home/logo nello storefront) → `to="/demo/classic"`
- `to="/products"` → `to="/demo/classic/products"`
- `to="/offers"` → `to="/demo/classic/offers"`
- `to="/contact"` → `to="/demo/classic/contact"`
- `to="/download"` → `to="/demo/classic/download"`
- `to="/products/category/$category"` → `to="/demo/classic/products/category/$category"` (params invariati)
- `to="/products/$productId"` → `to="/demo/classic/products/$productId"` (params invariati)

ATTENZIONE: nella `DemoBar` il `to="/"` deve restare `/` (porta alla vetrina) — la DemoBar è in `src/components/portfolio/`, non viene toccata da questa mappa.

Comando per trovare i link da rivedere:
```bash
grep -rn 'to="/\(products\|offers\|contact\|download\)\?"' src/routes/demo/classic src/demos/classic
```

- [ ] **Step 5: Spostare il credito "Demo Studio Site/Mara" fuori dal Footer Classic**

In `src/demos/classic/components/Footer.tsx`, nel blocco "Business Info", rimuovere il paragrafo "Demo Studio Site", la descrizione "Sito demo creato da Mara…", il paragrafo "Per informazioni e preventivi:" e il `<div>` con i due bottoni (Visita il mio sito / Contattami). Lasciare solo `<h3>Small Business</h3>` e una breve descrizione in-character, es.:
```tsx
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Small Business</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Prodotti e servizi di qualità per la nostra comunità. Qualità,
            cortesia e attenzione al cliente dal 2010.
          </p>
        </div>
```
(Il credito personale + CTA verranno messi nella Home portfolio, Task 4. L'import `ArrowUpRight` e `Mail` non più usati nel Footer vanno rimossi se restano orfani — verificare con tsc.)

- [ ] **Step 6: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0. Se restano errori, sono import/path non aggiornati: correggere.

- [ ] **Step 7: Verifica runtime delle route Classic**

Avviare dev server (vedi "Convenzioni"). Controlli:
```bash
for p in "/demo/classic" "/demo/classic/products" "/demo/classic/products/category/accessori" "/demo/classic/products/1" "/demo/classic/offers" "/demo/classic/contact" "/demo/classic/download"; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"
done
```
Expected: tutti `200`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: move classic storefront under /demo/classic with own layout"
```

---

### Task 4: Home portfolio a `/`

**Files:**
- Create: `src/components/portfolio/DemoCard.tsx`
- Create: `src/routes/index.tsx`

- [ ] **Step 1: Creare `src/components/portfolio/DemoCard.tsx`**

```tsx
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

interface DemoCardProps {
  to: string
  title: string
  description: string
  image: string
  accent: string
}

export function DemoCard({ to, title, description, image, accent }: DemoCardProps) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.visibility = 'hidden'
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: accent }}
          >
            Apri
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Creare la Home portfolio `src/routes/index.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Mail } from 'lucide-react'
import { DemoCard } from '@/components/portfolio/DemoCard'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
})

const demos = [
  {
    to: '/demo/classic',
    title: 'Classic — Negozio locale',
    description:
      'Storefront pulito e versatile per una piccola impresa: catalogo, categorie, offerte, contatti.',
    image: '/resources/shop1.png',
    accent: '#2563eb',
  },
  {
    to: '/demo/nature',
    title: 'Nature — Bottega bio',
    description:
      'Negozio di cibo curato, biologico e del territorio. Stile botanico, caldo ed editoriale.',
    image: '/resources/shop3.png',
    accent: '#2f5d3a',
  },
]

function PortfolioHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        <a
          href="https://mara-melchiori.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Torna al mio sito
        </a>
        <h1 className="text-4xl font-bold text-gray-900">Siti demo</h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          Una raccolta di siti dimostrativi che ho realizzato. Ogni demo mostra
          uno stile e un'impostazione diversa. Dai un'occhiata.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {demos.map((d) => (
            <DemoCard key={d.to} {...d} />
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Sito demo creato da Mara. Realizzo siti su misura, con pacchetti
            anche per piccole imprese.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://mara-melchiori.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              Visita il mio sito
            </a>
            <a
              href="mailto:mara.melchiori@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-500 transition-colors"
            >
              <Mail size={16} />
              Contattami
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 3: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Verifica runtime**

Avviare dev server. Controlli:
```bash
H=$(curl -s http://localhost:3000/ | tr -d '\0')
echo "landing 200: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/)"
echo "ha Classic card: $(echo "$H" | grep -c '/demo/classic')"
echo "ha Nature card: $(echo "$H" | grep -c '/demo/nature')"
echo "ha Siti demo: $(echo "$H" | grep -c 'Siti demo')"
```
Expected: 200, conteggi ≥ 1. (Il link `/demo/nature` darà 404 finché non si completa la Phase 3 — atteso.)

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/DemoCard.tsx src/routes/index.tsx
git commit -m "feat: portfolio landing page at / with demo grid"
```

---

## Phase 3 — Demo Nature (bottega bio)

### Task 5: Dati Nature (prodotti, partner, storia)

**Files:**
- Create: `src/demos/nature/data/products.ts`
- Create: `src/demos/nature/data/partners.ts`
- Create: `src/demos/nature/data/story.ts`

- [ ] **Step 1: Creare `src/demos/nature/data/partners.ts`**

```ts
export interface Partner {
  id: string
  name: string
  area: string
  description: string
  logo: string
}

export const partners: Array<Partner> = [
  {
    id: 'apicoltura-monti',
    name: 'Apicoltura dei Monti',
    area: 'Vallarsa (TN)',
    description: 'Miele di montagna e prodotti dell\'alveare da apiari di alta quota.',
    logo: '/placeholder.png',
  },
  {
    id: 'caseificio-valle',
    name: 'Caseificio della Valle',
    area: 'Lessinia (VR)',
    description: 'Formaggi di malga a latte crudo, stagionati secondo tradizione.',
    logo: '/placeholder.png',
  },
  {
    id: 'frantoio-garda',
    name: 'Frantoio del Garda',
    area: 'Alto Garda (TN)',
    description: 'Olio extravergine d\'oliva da olive del lago, spremitura a freddo.',
    logo: '/placeholder.png',
  },
  {
    id: 'orto-brenta',
    name: 'Orto sul Brenta',
    area: 'Valsugana (TN)',
    description: 'Conserve e sott\'oli da ortaggi di stagione, filiera corta.',
    logo: '/placeholder.png',
  },
]
```

- [ ] **Step 2: Creare `src/demos/nature/data/products.ts`**

```ts
export interface NatureProduct {
  id: string
  name: string
  image: string
  shortDescription: string
  description: string
  price: number
  producerId: string
}

export const natureProducts: Array<NatureProduct> = [
  {
    id: 'miele-montagna',
    name: 'Miele di Montagna',
    image: '/placeholder.png',
    shortDescription: 'Millefiori d\'alta quota, raccolto a mano.',
    description:
      'Miele millefiori di alta montagna, dal gusto delicato e floreale. Raccolto in apiari di quota e lavorato a freddo per preservarne aromi e proprietà.',
    price: 9,
    producerId: 'apicoltura-monti',
  },
  {
    id: 'formaggio-malga',
    name: 'Formaggio di Malga',
    image: '/placeholder.png',
    shortDescription: 'A latte crudo, stagionato in grotta.',
    description:
      'Formaggio di malga a latte crudo, stagionato lentamente in grotta. Pasta compatta e sapore intenso che racconta i pascoli d\'alta quota.',
    price: 14,
    producerId: 'caseificio-valle',
  },
  {
    id: 'olio-evo',
    name: 'Olio Extravergine del Garda',
    image: '/placeholder.png',
    shortDescription: 'Spremitura a freddo, fruttato leggero.',
    description:
      'Olio extravergine d\'oliva da olive dell\'Alto Garda, spremuto a freddo entro poche ore dalla raccolta. Fruttato leggero, con note di mandorla.',
    price: 16,
    producerId: 'frantoio-garda',
  },
  {
    id: 'sottolio-ortaggi',
    name: 'Verdure Sott\'Olio',
    image: '/placeholder.png',
    shortDescription: 'Ortaggi di stagione, ricetta tradizionale.',
    description:
      'Verdure di stagione conservate sott\'olio extravergine secondo ricetta tradizionale. Perfette per antipasti e taglieri.',
    price: 8,
    producerId: 'orto-brenta',
  },
  {
    id: 'confettura',
    name: 'Confettura Extra di Frutti di Bosco',
    image: '/placeholder.png',
    shortDescription: 'Frutta di bosco, poco zucchero.',
    description:
      'Confettura extra di frutti di bosco con alta percentuale di frutta e poco zucchero. Ideale a colazione o con i formaggi.',
    price: 7,
    producerId: 'orto-brenta',
  },
  {
    id: 'pasta-grani',
    name: 'Pasta di Grani Antichi',
    image: '/placeholder.png',
    shortDescription: 'Trafilata al bronzo, essiccazione lenta.',
    description:
      'Pasta artigianale di grani antichi, trafilata al bronzo ed essiccata lentamente a bassa temperatura. Ruvida al punto giusto per trattenere il sugo.',
    price: 5,
    producerId: 'orto-brenta',
  },
]
```

- [ ] **Step 3: Creare `src/demos/nature/data/story.ts`**

```ts
export interface StorySection {
  heading: string
  body: string
}

export const storyIntro =
  'Siamo una piccola bottega nata dall\'amore per il cibo buono, pulito e giusto. Selezioniamo prodotti biologici e del territorio, scegliendo ogni giorno chi li fa e come.'

export const storySections: Array<StorySection> = [
  {
    heading: 'Dalla terra alla tavola',
    body: 'Lavoriamo con piccoli produttori locali che conosciamo di persona. Filiera corta significa meno passaggi, più freschezza e un legame reale con chi coltiva e alleva.',
  },
  {
    heading: 'Biologico, davvero',
    body: 'Niente scorciatoie: prodotti certificati biologici, stagionali e selezionati per qualità e gusto. Crediamo che mangiare bene sia un gesto quotidiano di cura.',
  },
  {
    heading: 'Il territorio al centro',
    body: 'Ogni prodotto racconta una valle, un pascolo, un frutteto. Sostenere chi produce qui significa custodire i sapori e i paesaggi che amiamo.',
  },
]
```

- [ ] **Step 4: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0 (dati non ancora usati, devono compilare).

- [ ] **Step 5: Commit**

```bash
git add src/demos/nature/data
git commit -m "feat(nature): seed data — products, partners, story"
```

---

### Task 6: Layout Nature (Header, Footer, layout route)

**Files:**
- Create: `src/demos/nature/components/Header.tsx`
- Create: `src/demos/nature/components/Footer.tsx`
- Create: `src/routes/demo/nature.tsx`

- [ ] **Step 1: Creare `src/demos/nature/components/Header.tsx`**

```tsx
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const nav = [
  { to: '/demo/nature', label: 'Home' },
  { to: '/demo/nature/prodotti', label: 'Prodotti' },
  { to: '/demo/nature/marchi', label: 'Marchi' },
  { to: '/demo/nature/storia', label: 'La nostra storia' },
  { to: '/demo/nature/contatti', label: 'Contatti' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/demo/nature" className="flex items-center gap-2">
          <img
            src="/resources/002_green_logo.png"
            alt="Bottega Nature"
            className="h-12 w-auto"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] transition-colors [&.active]:text-[var(--primary)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-[var(--text)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--border)] px-4 py-4 flex flex-col gap-3 bg-[var(--bg)]">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[var(--text)] font-medium"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Creare `src/demos/nature/components/Footer.tsx`**

```tsx
import { MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-16" style={{ background: 'var(--primary)', color: 'var(--primary-contrast)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Bottega Nature</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Cibo curato, biologico e del territorio. Selezioniamo ogni giorno il
            meglio dai piccoli produttori locali.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin size={16} /> Dove siamo</h3>
          <p className="text-sm opacity-90">Stazione FS di Rovereto<br />Piazzale Orsi, 38068 Rovereto (TN)</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock size={16} /> Orari</h3>
          <ul className="text-sm opacity-90 space-y-1">
            <li>Mar – Sab: 8:30 – 19:00</li>
            <li>Domenica: 9:00 – 13:00</li>
            <li>Lunedì: Chiuso</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 text-center py-4 text-xs opacity-80">
        © {new Date().getFullYear()} Bottega Nature — demo
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Creare il layout route `src/routes/demo/nature.tsx`**

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/demos/nature/components/Header'
import { Footer } from '@/demos/nature/components/Footer'
import { DemoBar } from '@/components/portfolio/DemoBar'

export const Route = createFileRoute('/demo/nature')({
  component: NatureLayout,
})

function NatureLayout() {
  return (
    <div data-demo="nature" className="flex flex-col min-h-screen">
      <DemoBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Verifica typecheck (atteso FAIL: manca index)**

Run: `npx tsc --noEmit`
Expected: errore "Cannot find ... /demo/nature/index" o nessun child route. Procedere al Task 7 prima di committare; oppure committare dopo aver creato l'index. NON committare finché tsc non è pulito (fine Task 7).

---

### Task 7: Nature — Home

**Files:**
- Create: `src/routes/demo/nature/index.tsx`

- [ ] **Step 1: Creare `src/routes/demo/nature/index.tsx`** (carousel a tema + blocchi + banner cassa)

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { Carousel } from '@/components/ui/Carousel'
import type { CarouselSlide } from '@/components/ui/Carousel'
import { natureProducts } from '@/demos/nature/data/products'

export const Route = createFileRoute('/demo/nature/')({
  component: NatureHome,
})

const heroSlides: CarouselSlide[] = [
  {
    image: '/resources/002_green_benvenuti.png',
    alt: 'Benvenuti nella nostra bottega',
    caption: 'Buono, pulito e del territorio',
    subcaption: 'Cibo biologico selezionato dai piccoli produttori locali',
  },
  {
    image: '/resources/002_green_prodotti.png',
    alt: 'I nostri prodotti',
    caption: 'I nostri prodotti',
    subcaption: 'Una selezione curata, stagionale e a filiera corta',
    href: '/demo/nature/prodotti',
  },
  {
    image: '/resources/002_green_contattaci.png',
    alt: 'Contattaci',
    caption: 'Vieni a trovarci',
    subcaption: 'Ti aspettiamo in bottega a Rovereto',
    href: '/demo/nature/contatti',
  },
]

function NatureHome() {
  const featured = natureProducts.slice(0, 3)
  return (
    <div>
      {/* Carousel hero a tema */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <Carousel slides={heroSlides} />
      </section>

      {/* Valori — tre blocchi */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { t: 'Filiera corta', d: 'Conosciamo di persona ogni produttore con cui lavoriamo.' },
          { t: 'Biologico vero', d: 'Prodotti certificati, stagionali, selezionati per qualità.' },
          { t: 'Il territorio', d: 'Sapori che raccontano le valli e i pascoli intorno a noi.' },
        ].map((b) => (
          <div key={b.t} className="rounded-[var(--radius)] border border-[var(--border)] p-6" style={{ background: 'var(--surface)' }}>
            <h3 className="font-semibold text-lg" style={{ color: 'var(--primary)' }}>{b.t}</h3>
            <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{b.d}</p>
          </div>
        ))}
      </section>

      {/* Banner "vieni a trovarci" con immagine cassa */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <Link to="/demo/nature/contatti" className="group block relative rounded-[var(--radius)] overflow-hidden" style={{ aspectRatio: '21/8' }}>
          <img src="/resources/002_green_cassa.png" alt="Vieni a trovarci in bottega" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent flex flex-col justify-center p-6 md:p-10">
            <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow">Vieni a trovarci in bottega</h2>
            <p className="text-white/90 text-sm md:text-base mt-1 drop-shadow max-w-sm">Ti accogliamo con i sapori del territorio. Scopri dove siamo.</p>
          </div>
        </Link>
      </section>

      {/* Prodotti in evidenza — layout asimmetrico */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>In evidenza</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/demo/nature/prodotti/$id"
              params={{ id: p.id }}
              className={`group rounded-[var(--radius)] border border-[var(--border)] overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}
              style={{ background: 'var(--surface)' }}
            >
              <div className={`overflow-hidden bg-black/5 ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{p.name}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{p.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verifica typecheck (atteso FAIL: manca route prodotti/$id)**

Run: `npx tsc --noEmit`
Expected: errore sul link `/demo/nature/prodotti/$id` (route non ancora esistente). Verrà creata nel Task 8. NON committare ancora.

---

### Task 8: Nature — Prodotti (lista + dettaglio)

**Files:**
- Create: `src/routes/demo/nature/prodotti.tsx` (index lista)
- Create: `src/routes/demo/nature/prodotti.$id.tsx` (dettaglio)

- [ ] **Step 1: Creare la lista `src/routes/demo/nature/prodotti.tsx`**

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { natureProducts } from '@/demos/nature/data/products'

export const Route = createFileRoute('/demo/nature/prodotti')({
  component: NatureProducts,
})

function NatureProducts() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>I nostri prodotti</h1>
      <p className="text-[var(--muted)] mb-10 max-w-xl">
        Una selezione curata di prodotti biologici e del territorio, dai nostri produttori di fiducia.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {natureProducts.map((p) => (
          <Link
            key={p.id}
            to="/demo/nature/prodotti/$id"
            params={{ id: p.id }}
            className="group rounded-[var(--radius)] border border-[var(--border)] overflow-hidden"
            style={{ background: 'var(--surface)' }}
          >
            <div className="aspect-[4/3] overflow-hidden bg-black/5">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{p.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{p.shortDescription}</p>
              <p className="text-lg font-bold mt-2" style={{ color: 'var(--primary)' }}>{p.price.toLocaleString('it-IT')} €</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Creare il dettaglio `src/routes/demo/nature/prodotti.$id.tsx`**

```tsx
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { natureProducts } from '@/demos/nature/data/products'
import { partners } from '@/demos/nature/data/partners'

export const Route = createFileRoute('/demo/nature/prodotti/$id')({
  component: NatureProductDetail,
  loader: ({ params }) => {
    const product = natureProducts.find((p) => p.id === params.id)
    if (!product) throw notFound()
    const producer = partners.find((p) => p.id === product.producerId) ?? null
    return { product, producer }
  },
})

function NatureProductDetail() {
  const { product, producer } = Route.useLoaderData()
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/demo/nature/prodotti" className="inline-block mb-6 text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
        &larr; Torna ai prodotti
      </Link>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full rounded-[var(--radius)] object-cover" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{product.name}</h1>
          <p className="mt-4 text-[var(--text)] leading-relaxed">{product.description}</p>
          {producer && (
            <p className="mt-4 text-sm text-[var(--muted)]">
              Produttore: <strong style={{ color: 'var(--text)' }}>{producer.name}</strong> — {producer.area}
            </p>
          )}
          <p className="text-2xl font-bold mt-6" style={{ color: 'var(--primary)' }}>{product.price.toLocaleString('it-IT')} €</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0 (ora home + layout + prodotti + dettaglio compilano).

- [ ] **Step 4: Verifica runtime**

```bash
for p in "/demo/nature" "/demo/nature/prodotti" "/demo/nature/prodotti/miele-montagna"; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"
done
echo "logo nature 200: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/resources/002_green_logo.png)"
```
Expected: tutti `200`.

- [ ] **Step 5: Commit**

```bash
git add src/routes/demo/nature.tsx src/routes/demo/nature/index.tsx src/routes/demo/nature/prodotti.tsx src/routes/demo/nature/prodotti.\$id.tsx
git commit -m "feat(nature): layout, home, products list + detail"
```

---

### Task 9: Nature — Marchi / Partner

**Files:**
- Create: `src/routes/demo/nature/marchi.tsx`

- [ ] **Step 1: Creare `src/routes/demo/nature/marchi.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { partners } from '@/demos/nature/data/partners'

export const Route = createFileRoute('/demo/nature/marchi')({
  component: NaturePartners,
})

function NaturePartners() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>I nostri marchi</h1>
      <p className="text-[var(--muted)] mb-10 max-w-xl">
        I produttori del territorio con cui collaboriamo. Persone vere, di cui ci fidiamo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {partners.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-black/5 flex items-center justify-center">
              <img src={p.logo} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{p.name}</h3>
              <p className="text-xs uppercase tracking-wide text-[var(--accent)]">{p.area}</p>
              <p className="text-sm text-[var(--muted)] mt-1">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Verifica runtime**

```bash
echo "/demo/nature/marchi -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/demo/nature/marchi)"
echo "ha Apicoltura: $(curl -s http://localhost:3000/demo/nature/marchi | tr -d '\0' | grep -c 'Apicoltura dei Monti')"
```
Expected: 200, conteggio ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add src/routes/demo/nature/marchi.tsx
git commit -m "feat(nature): partners/brands page"
```

---

### Task 10: Nature — La nostra storia

**Files:**
- Create: `src/routes/demo/nature/storia.tsx`

- [ ] **Step 1: Creare `src/routes/demo/nature/storia.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { storyIntro, storySections } from '@/demos/nature/data/story'

export const Route = createFileRoute('/demo/nature/storia')({
  component: NatureStory,
})

function NatureStory() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>La nostra storia</h1>
      <p className="text-lg leading-relaxed text-[var(--text)] mb-10">{storyIntro}</p>
      <div className="space-y-10">
        {storySections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>{s.heading}</h2>
            <p className="leading-relaxed text-[var(--muted)]">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Verifica runtime**

```bash
echo "/demo/nature/storia -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/demo/nature/storia)"
echo "ha titolo: $(curl -s http://localhost:3000/demo/nature/storia | tr -d '\0' | grep -c 'La nostra storia')"
```
Expected: 200, conteggio ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add src/routes/demo/nature/storia.tsx
git commit -m "feat(nature): our story page"
```

---

### Task 11: Nature — Contatti

**Files:**
- Create: `src/routes/demo/nature/contatti.tsx`

- [ ] **Step 1: Creare `src/routes/demo/nature/contatti.tsx`** (a tema, con mappa Rovereto)

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Clock, Mail } from 'lucide-react'

export const Route = createFileRoute('/demo/nature/contatti')({
  component: NatureContact,
})

function NatureContact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Contatti</h1>
      <p className="text-[var(--muted)] mb-8 max-w-xl">Passa a trovarci in bottega o scrivici: ti aspettiamo.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <MapPin size={20} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Indirizzo</h3>
              <p className="text-sm text-[var(--muted)] mt-0.5">Stazione FS di Rovereto<br />Piazzale Orsi, 38068 Rovereto (TN)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <Clock size={20} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Orari</h3>
              <ul className="text-sm text-[var(--muted)] mt-0.5 space-y-0.5">
                <li>Mar – Sab: 8:30 – 19:00</li>
                <li>Domenica: 9:00 – 13:00</li>
                <li>Lunedì: Chiuso</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <Mail size={20} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Email</h3>
              <a href="mailto:bottega@nature.demo" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">bottega@nature.demo</a>
            </div>
          </div>
        </div>
        <div className="rounded-[var(--radius)] overflow-hidden border border-[var(--border)] min-h-[360px]">
          <iframe
            title="Stazione FS di Rovereto"
            src="https://www.openstreetmap.org/export/embed.html?bbox=11.0206%2C45.8846%2C11.0406%2C45.8946&layer=mapnik&marker=45.8896%2C11.0306"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '360px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verifica typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3: Verifica runtime**

```bash
echo "/demo/nature/contatti -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/demo/nature/contatti)"
echo "ha mappa Rovereto: $(curl -s http://localhost:3000/demo/nature/contatti | tr -d '\0' | grep -c '11.0206')"
```
Expected: 200, conteggio ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add src/routes/demo/nature/contatti.tsx
git commit -m "feat(nature): contact page with map"
```

---

## Phase 4 — Rifinitura, redirect, verifica finale

### Task 12: Redirect Netlify + verifica completa + build

**Files:**
- Modify: `netlify.toml`

- [ ] **Step 1: Aggiungere redirect dai vecchi path in `netlify.toml`**

Aggiungere in fondo a `netlify.toml`:
```toml
[[redirects]]
  from = "/products/*"
  to = "/demo/classic/products/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/offers"
  to = "/demo/classic/offers"
  status = 301
  force = true

[[redirects]]
  from = "/contact"
  to = "/demo/classic/contact"
  status = 301
  force = true

[[redirects]]
  from = "/download"
  to = "/demo/classic/download"
  status = 301
  force = true
```
(NB: NON reindirizzare `/` — è la nuova vetrina.)

- [ ] **Step 2: Typecheck + build di produzione**

Run: `npx tsc --noEmit && pnpm run build`
Expected: tsc exit 0; build completata senza errori (output in `dist/`).

- [ ] **Step 3: Verifica runtime completa di tutte le route**

Avviare dev server, poi:
```bash
for p in "/" \
  "/demo/classic" "/demo/classic/products" "/demo/classic/products/category/accessori" "/demo/classic/products/1" "/demo/classic/offers" "/demo/classic/contact" "/demo/classic/download" \
  "/demo/nature" "/demo/nature/prodotti" "/demo/nature/prodotti/olio-evo" "/demo/nature/marchi" "/demo/nature/storia" "/demo/nature/contatti"; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"
done
```
Expected: tutti `200`.

- [ ] **Step 4: Commit finale**

```bash
git add netlify.toml
git commit -m "chore: netlify redirects from legacy paths to /demo/classic"
```

- [ ] **Step 5: Push (chiedere conferma all'utente prima)**

```bash
git push origin main
```

---

## Self-Review (eseguita)

**Spec coverage:** portfolio landing (Task 4) ✓; URL per tema (route demo/classic + demo/nature) ✓; temi CSS variables (Task 1) ✓; Classic invariato e migrato (Task 2-3) ✓; Nature Home/Prodotti/Marchi/Storia/Contatti (Task 7-11) ✓; demo bar (Task 1, montata nei layout Task 2/6) ✓; dati Nature (Task 5) ✓; logo Nature `002_green_logo.png` (Task 6) ✓; redirect Netlify (Task 12) ✓; verifica tsc/build/curl ✓.

**Placeholder scan:** immagini prodotto/partner Nature usano `/placeholder.png` per scelta esplicita (in attesa delle immagini di Mara) — non è un buco di piano. Nessun "TODO/TBD" nei passi.

**Type consistency:** `NatureProduct.producerId` ↔ `Partner.id` coerenti (Task 5, usati in Task 8). `natureProducts`/`partners`/`storySections` nomi usati coerentemente. Route param `$id` coerente tra link (`params={{ id }}`) e `createFileRoute('/demo/nature/prodotti/$id')`. Path `createFileRoute` coerenti con posizione file.

**Note aperte (non bloccanti):**
- `__root.tsx` Step 1 mostra due versioni: usare la "versione definitiva senza export inutile".
- La cartella spuria `public/resources/Conservazione automatica Corel` (autosave Corel) può essere rimossa a parte; non toccata dal piano.
