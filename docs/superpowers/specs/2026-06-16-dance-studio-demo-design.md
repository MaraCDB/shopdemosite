# Demo "Dance Studio — Art in Motion" — Design

**Data:** 2026-06-16
**Stato:** approvato in brainstorming, sviluppo previsto il 2026-06-17

## Contesto

Secondo demo del nuovo archetipo "sito vetrina per attività di servizi locali"
(vedi [hairdresser](2026-06-16-hairdresser-demo-design.md)). Il portfolio (`/`)
espone oggi `classic`, `nature` e — in arrivo — `hair`; aggiungiamo `dance`.

Asset disponibili:
- Logo `public/resources/003_danza_logo.png` ("Dance Studio — Art in Motion",
  **line-art monocromatico bianco/nero**, elegante e minimale).
- `public/dance1.jpg`, `public/dance2.jpg` — foto.
- `public/bambini.mp4` — video per l'hero.

## Obiettivo

Demo **vetrina curata + una feature interattiva** (orario lezioni filtrabile),
coerente con l'architettura esistente, senza backend reale. Contenuti in
italiano. Estetica monocromatica, editoriale, molto "movimento".

## Architettura (riuso del pattern esistente)

Identica a `classic`/`nature`/`hair`:

- **Codice demo:** `src/demos/dance/` con `components/` (Header, Footer) e
  `data/*.ts` (dati statici tipizzati).
- **Route:** `src/routes/demo/dance.tsx` (layout) + `src/routes/demo/dance/*`
  (pagine). Layout = `DemoBar` + header **sticky** + `<Outlet/>` + Footer,
  con `data-demo="dance"` sul wrapper.
- **Theming:** variabili CSS scoping su `[data-demo="dance"]` in
  `src/styles.css` (monocromatico: nero/bianco/grigi, accent nero), stesso
  meccanismo di `nature`.
- **Gallery:** componente condiviso `src/components/ui/Carousel.tsx`.
- **Form contatti:** Netlify Forms in JSX (`data-netlify="true"` + hidden
  `form-name`), come `nature/contatti`. Setup secondo `netlify-forms-ts`.
- **Portfolio:** nuova card in `src/routes/index.tsx` (immagine = logo o
  `dance1.jpg`, accent nero/monocromo).

### Unità e responsabilità

| Unità | Cosa fa | Dipendenze |
|-------|---------|-----------|
| `data/courses.ts` | Corsi/discipline (nome, descrizione, livello, fascia d'età) | — |
| `data/schedule.ts` | Lezioni settimanali (giorno, ora, corso, livello, sala, insegnante) | data/courses |
| `data/instructors.ts` | Insegnanti (nome, discipline, bio breve) | — |
| `components/Header.tsx` | Nav sticky della demo | Router |
| `components/Footer.tsx` | Footer demo | Router |
| `components/Timetable.tsx` | Feature-firma: griglia orari con filtri | data/schedule, data/courses |
| route pages | Compongono le unità sopra | tutte |

## Pagine

1. **Home** (`/demo/dance`) — hero con video `bambini.mp4` (loop, muted) +
   claim "Art in Motion"; sezioni: discipline in evidenza, perché noi,
   CTA "Prova gratuita", anteprima gallery, orari/indirizzo.
2. **Corsi / Discipline** (`/demo/dance/corsi`) — schede per disciplina
   (es. Classica, Moderna, Hip-Hop, Contemporanea, Baby Dance) con livello e
   fascia d'età.
3. **Orario** (`/demo/dance/orario`) — **Timetable** filtrabile (feature-firma).
4. **Insegnanti** (`/demo/dance/insegnanti`) — schede staff.
5. **Gallery** (`/demo/dance/gallery`) — `Carousel` + griglia (dance1/dance2 +
   placeholder).
6. **Contatti** (`/demo/dance/contatti`) — indirizzo/orari/mappa (iframe OSM)
   + form messaggio/"Prenota prova gratuita".

## Feature-firma: orario lezioni filtrabile

Griglia settimanale **client-side** dei corsi, con filtri combinabili:

1. **Giorno** — Lun…Sab (o "tutti").
2. **Livello** — Principianti / Intermedio / Avanzato (o "tutti").
3. **Disciplina** — elenco da `data/courses.ts` (o "tutte").

Comportamento:
- I dati vengono da `data/schedule.ts` (statici); il filtraggio è in memoria
  con `useState` (nessuno store globale).
- Ogni cella lezione mostra orario, corso, livello, sala, insegnante.
- Pulsante **"Prenota prova gratuita"** su ciascuna lezione → naviga a
  `/demo/dance/contatti` precompilando il corso scelto (via search param,
  con `@tanstack/react-router` typesafe, oppure stato locale se più semplice).
- Empty state quando i filtri non producono risultati.

## Error handling

- Route inesistenti sotto `/demo/dance/*`: `notFound()` come in `classic`.
- Immagini mancanti: `onError` → nascondi (pattern degli Header).
- Video hero: `poster` di fallback (es. `dance1.jpg`) se il video non parte.
- Form: validazione `required`; nessun errore server (Netlify).

## Testing / verifica

Verifica manuale con dev server —

- tutte le route `/demo/dance/*` rispondono 200;
- la card compare in `/` e linka correttamente;
- `DemoBar` visibile e "Tutte le demo" torna a `/`;
- Timetable: i filtri (giorno/livello/disciplina, combinati) producono il
  sottoinsieme corretto; empty state quando vuoto;
- "Prenota prova gratuita" porta a Contatti col corso precompilato;
- build di produzione (`vite build`) senza errori TS.

## Fuori scope (YAGNI)

- E-commerce, carrello, pagamenti.
- Iscrizioni/calendario reali o backend.
- Login/area allievi.
- AI assistant.
