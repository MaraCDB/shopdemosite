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
