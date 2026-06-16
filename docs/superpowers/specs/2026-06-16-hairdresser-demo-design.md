# Demo "New Style Hairdresser" — Design

**Data:** 2026-06-16
**Stato:** approvato in brainstorming, in attesa di review dello spec

## Contesto

Il sito è un portfolio di demo (`/`) che oggi espone due storefront e-commerce:
`classic` e `nature`. Aggiungiamo un terzo archetipo: il **sito vetrina per
attività di servizi locali**, a partire dalla parrucchiera. La scuola di danza
seguirà in uno spec separato.

Logo disponibile: `public/resources/004_hairdresser.png` ("New Style Hairdresser",
palette **oro + grigio antracite**, look da salone premium).

## Obiettivo

Una demo **vetrina curata + una feature interattiva** (mini-prenotazione
appuntamento), coerente con l'architettura esistente, senza backend reale.
Contenuti in italiano. Nessun e-commerce (no prodotti/carrello).

## Architettura (riuso del pattern esistente)

Identica a `classic`/`nature`:

- **Codice demo:** `src/demos/hair/` con `components/` (Header, Footer) e
  `data/*.ts` (dati statici tipizzati).
- **Route:** `src/routes/demo/hair.tsx` (layout) + `src/routes/demo/hair/*`
  (pagine). Layout = `DemoBar` + header **sticky** + `<Outlet/>` + Footer,
  con `data-demo="hair"` sul wrapper.
- **Theming:** variabili CSS scoping su `[data-demo="hair"]` in
  `src/styles.css` (oro `--primary`, antracite testo/superfici), stesso
  meccanismo usato per `nature`.
- **Gallery:** componente condiviso `src/components/ui/Carousel.tsx`.
- **Form contatti/prenotazione:** Netlify Forms in JSX
  (`data-netlify="true"` + hidden `form-name`), come `nature/contatti`.
  Setup secondo la skill `netlify-forms-ts`.
- **Portfolio:** nuova card in `src/routes/index.tsx` (immagine = logo o un
  asset salone, accent oro).

### Unità e responsabilità

| Unità | Cosa fa | Dipendenze |
|-------|---------|-----------|
| `data/services.ts` | Listino servizi (categoria, nome, durata, prezzo) | — |
| `data/team.ts` | Staff (nome, ruolo, specialità) | — |
| `data/booking.ts` | Slot/orari disponibili statici per la mini-prenotazione | — |
| `components/Header.tsx` | Nav sticky della demo | Router |
| `components/Footer.tsx` | Footer demo | Router |
| `components/BookingForm.tsx` | Feature-firma: form guidato multi-step | data/services, data/team, data/booking |
| route pages | Compongono le unità sopra | tutte |

## Pagine

1. **Home** (`/demo/hair`) — hero (logo + claim "New Style Hairdresser"),
   sezioni: servizi in evidenza, perché sceglierci, CTA "Prenota", anteprima
   gallery, orari/indirizzo.
2. **Servizi & Listino** (`/demo/hair/servizi`) — listino raggruppato per
   categoria (Taglio, Colore, Trattamenti, Sposa/Eventi) con durata e prezzo.
3. **Gallery** (`/demo/hair/gallery`) — `Carousel` + griglia di scatti
   (placeholder/asset disponibili).
4. **Team** (`/demo/hair/team`) — schede staff.
5. **Contatti & Prenota** (`/demo/hair/contatti`) — indirizzo/orari/mappa
   (iframe OSM) + **BookingForm** + form messaggio libero.

## Feature-firma: mini-prenotazione

Form **client-side** guidato, nessun calendario reale:

1. **Servizio** — select popolata da `data/services.ts`.
2. **Operatore** — select da `data/team.ts` (opzione "indifferente").
3. **Giorno & orario** — scelta tra slot statici da `data/booking.ts`
   (es. giorni Mar–Sab, fasce orarie); gli slot sono fissi, non calcolati.
4. **Dati cliente** — nome, telefono/email.
5. **Invio** — i campi compongono un **riepilogo leggibile**; submit via
   Netlify Forms (form dedicato, es. `name="prenotazione-hair"`), con
   conferma a schermo ("Richiesta inviata, ti ricontattiamo per confermare").

Stato gestito con `useState` locale (nessuno store globale necessario).
Validazione minima: campi obbligatori prima dell'invio.

## Error handling

- Route inesistenti sotto `/demo/hair/*`: `notFound()` come in `classic`.
- Immagini mancanti: `onError` → nascondi (pattern già usato negli Header).
- Form: validazione `required`; nessun errore server da gestire (Netlify).

## Testing / verifica

Coerente con le altre demo (nessun test runner nel progetto per le demo):
verifica manuale con dev server —

- tutte le route `/demo/hair/*` rispondono 200;
- la card compare in `/` e linka correttamente;
- `DemoBar` visibile e "Tutte le demo" torna a `/`;
- BookingForm: compilazione → riepilogo corretto → submit senza errori JS;
- build di produzione (`vite build`) senza errori TS.

## Fuori scope (YAGNI)

- E-commerce, carrello, pagamenti.
- Calendario/disponibilità reali o backend di prenotazione.
- Login/area clienti.
- AI assistant.
- La demo **scuola di danza** (spec separato, da fare dopo).
