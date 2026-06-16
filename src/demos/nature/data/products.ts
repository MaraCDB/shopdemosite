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
