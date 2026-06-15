# Portfolio multi-demo (Classic + Nature) — Design

**Data:** 2026-06-15
**Stato:** approvato (in attesa di review dello spec scritto)

## Obiettivo

Trasformare il sito attuale (un singolo storefront demo) in un **sito-portfolio unico** che mostra più versioni demo dello stesso "tipo" di sito, con grafica e contenuti diversi. È il portfolio di Mara (sviluppatrice di siti): il suo sito personale `mara-melchiori.netlify.app` rimanderà a questa pagina.

- Un solo repo, un solo sito Netlify, un solo URL.
- Home `/` = vetrina (galleria a griglia) delle demo.
- Ogni demo ha un proprio URL: `/demo/classic`, `/demo/nature`.
- Le demo possono differire in **stile, layout, pagine e contenuti**.

Non in scope (YAGNI): carrello, autenticazione, e-commerce reale, framework di test nuovo, demo oltre a Classic e Nature.

## Le due demo

### Classic (esistente)
Storefront generico di una piccola impresa (catalogo, categorie, offerte, contatti, download). Resta **invariato nell'aspetto**; viene solo spostato sotto `/demo/classic` e agganciato al sistema di temi con i suoi colori attuali.

Pagine: Home, Prodotti (categorie + dettaglio), Offerte, Contatti, Download.

### Nature (nuova)
Bottega di **cibo curato, biologico e del territorio**. Stile **"Botanico elegante"**: crema + verde bosco, titoli serif, hero foto con card in overlap, blocchi asimmetrici, angoli morbidi. Poche pagine mirate.

Pagine:
- **Home** — hero a tema + sezioni editoriali.
- **I nostri prodotti** — selezione curata (~6-8 prodotti del territorio) + dettaglio prodotto semplice.
- **I nostri marchi / partner** — produttori locali (logo, zona, descrizione).
- **La nostra storia** — pagina narrativa (origine, valori, filiera corta).
- **Contatti** — indirizzo, mappa, form, a tema.

Logo Nature: `public/resources/002_green_logo.png` (servito come `/resources/002_green_logo.png`).

## Architettura (Approccio A: sottoalberi di route per demo + temi via CSS variables)

### Mappa route (file-based TanStack Router)
```
src/routes/
  __root.tsx              shell minimale (HeadContent, Scripts, Outlet); niente header/footer globali
  index.tsx               HOME PORTFOLIO (griglia demo + credito Mara + link al sito personale)
  demo/
    classic.tsx           layout Classic: ClassicHeader + ClassicFooter + DemoBar + data-demo="classic"
    classic/
      index.tsx
      products/index.tsx
      products/category/$category.tsx
      products/$productId.tsx
      offers.tsx
      contact.tsx
      download.tsx
    nature.tsx            layout Nature: NatureHeader + NatureFooter + DemoBar + data-demo="nature"
    nature/
      index.tsx
      prodotti.tsx
      prodotti.$id.tsx      (dettaglio prodotto semplice)
      marchi.tsx
      storia.tsx
      contatti.tsx
```
URL: `/`, `/demo/classic/...`, `/demo/nature/...`.

I file `demo/classic.tsx` e `demo/nature.tsx` sono **layout route** (con `<Outlet/>`) che avvolgono i figli con header/footer/tema della demo.

### Sistema di temi (CSS variables)
In `styles.css`, set di token applicati dall'attributo `data-demo` posto sul wrapper del layout:

- `[data-demo="classic"]`: token che replicano i grigi/blu attuali → nessun cambiamento visivo.
- `[data-demo="nature"]`: `--bg:#f3f1e7`, `--surface:#ffffff`, `--text:#2f3a2e`, `--muted:#5a6b50`, `--primary:#2f5d3a`, `--accent:#85a86a`, `--border:#d9d3bf`, `--radius:14px`, `--font-head:Georgia, serif`, `--font-body:system-ui`.

I componenti **condivisi** leggono i token (`bg-[var(--surface)]`, `text-[var(--text)]`, `rounded-[var(--radius)]`, font heading via variabile). Aggiungere un tema futuro = un nuovo blocco di token.

### Organizzazione cartelle
```
src/components/ui/         primitivi condivisi (Card, Carousel, Button, Badge, Field)
src/components/portfolio/  componenti della home portfolio (DemoCard) + DemoBar
src/demos/classic/         components/ (Header, Footer, sezioni home) + data/ (products.ts, offers.ts)
src/demos/nature/          components/ (Header, Footer, hero, blocchi) + data/ (products.ts, partners.ts, story.ts)
src/styles.css
```
Le route restano file sottili che compongono questi pezzi. Riuso dove utile (Carousel, Card); `OfferCard` resta solo Classic.

### Modello dati Nature
- `products.ts`: `{ id, name, image, shortDescription, description, price, producer }` (~6-8 voci: miele, formaggi, conserve, olio, pasta, vino…). `producer` collega a un partner.
- `partners.ts`: `{ id, name, logo, area, description }`.
- `story.ts`: contenuto editoriale in sezioni `{ heading, body }[]` + intro.
- Immagini prodotto: placeholder finché Mara non fornisce le sue (stessa convenzione `/resources/...`).

### Home portfolio (`/`)
Vetrina neutra: intestazione leggera, griglia di `DemoCard` (Classic, Nature) con anteprima + descrizione + link. In fondo credito + pulsanti **"Visita il mio sito"** / **"Contattami"** (riuso). Link "← torna al mio sito" verso `mara-melchiori.netlify.app`.

### Demo bar + footer in-character
Ogni demo ha header/footer **in carattere** (sembrano siti veri, senza credito Mara). In cima a ogni demo una **barra sottile** (`DemoBar`): "Demo di Mara · ← Tutte le demo" che torna a `/`. Il credito personale vive solo sulla home portfolio.

### Migrazione Classic
Spostare gli attuali file route sotto `demo/classic/`; aggiornare i `Link`/path interni (`/products` → `/demo/classic/products`, ecc.). `routeTree.gen.ts` si rigenera. Spostare Header/Footer/Carousel/OfferCard in `src/demos/classic/components` o `src/components/ui`. Il credito "Demo Studio Site / Mara" lascia il footer Classic e va sulla home portfolio.

### Netlify / vecchi URL
Aggiungere redirect in `netlify.toml` (o `_redirects`) dai vecchi path ai nuovi:
`/products/* → /demo/classic/products/:splat`, `/offers → /demo/classic/offers`, `/contact → /demo/classic/contact`, `/download → /demo/classic/download`. La `/` diventa la home portfolio.

## Verifica

Il progetto non ha framework di test. Per ogni fase:
- `npx tsc --noEmit` pulito;
- `npm run build` (build di produzione) ok;
- check runtime su dev server via `curl` per ogni route (HTTP 200 + stringhe chiave / asset 200), come da prassi della sessione.

## Decisioni prese durante il brainstorming
- Portfolio unico (no repo/siti separati).
- Navigazione **URL per tema**.
- Le varianti differiscono anche per layout **e** contenuti/pagine.
- Home portfolio: layout **galleria a griglia**, taglio **neutro** (il sito personale rimanda qui).
- Nature: concept **bottega bio del territorio**, stile **Botanico elegante**, pagine Home/Prodotti/Marchi/Storia/Contatti.
- **Demo bar** per tornare alla vetrina.
