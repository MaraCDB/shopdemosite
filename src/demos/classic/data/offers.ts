export interface Offer {
  id: number
  title: string
  description: string
  image: string
  startDate: string
  expiryDate: string
  discountLabel?: string
  voucherCode?: string
}

const offers: Array<Offer> = [
  {
    id: 1,
    title: 'Saldi di Primavera – 20% su Tutto',
    description:
      'Festeggia la nuova stagione con il 20% di sconto su tutti i prodotti, in negozio e online. Non perdere questa offerta a tempo limitato!',
    image: '/resources/offerta.png',
    startDate: '2026-03-15',
    expiryDate: '2027-12-31',
    discountLabel: '-20%',
    voucherCode: 'SPRING20',
  },
  {
    id: 2,
    title: 'Prendi 3 Paghi 2',
    description:
      'Acquista due prodotti e ricevi il terzo completamente gratis. Combina come vuoi tra tutto il nostro catalogo.',
    image: '/resources/offerta.png',
    startDate: '2026-03-20',
    expiryDate: '2027-12-31',
    discountLabel: '3x2',
    voucherCode: 'B2G1FREE',
  },
  {
    id: 3,
    title: 'Anteprima Nuovi Arrivi',
    description:
      'Sii tra i primi a scoprire i nostri nuovi prodotti. Accesso esclusivo in anteprima per i clienti affezionati, con uno sconto speciale di benvenuto del 10%.',
    image: '/resources/offerta.png',
    startDate: '2026-04-01',
    expiryDate: '2026-04-30',
    discountLabel: '-10%',
    voucherCode: 'NEWTEN',
  },
]

export default offers
