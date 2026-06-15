export interface Category {
  slug: string
  name: string
  image: string
  description: string
}

export interface Product {
  id: number
  name: string
  image: string
  description: string
  shortDescription: string
  price: number
  category: string
}

export const categories: Array<Category> = [
  {
    slug: 'capispalla-giacche',
    name: 'Capispalla e Giacche',
    image: '/resources/products1.png',
    description: 'Giacche, cappotti e capispalla per affrontare ogni stagione con stile.',
  },
  {
    slug: 'accessori',
    name: 'Accessori',
    image: '/resources/products2.png',
    description: 'Accessori per completare e personalizzare il tuo look in ogni occasione.',
  },
  {
    slug: 'scarpe-borse',
    name: 'Scarpe e Borse',
    image: '/resources/products3.png',
    description: 'Scarpe e borse selezionate per unire comfort, qualità ed eleganza.',
  },
  {
    slug: 'casa-tempo-libero',
    name: 'Casa e Tempo Libero',
    image: '/resources/products4.png',
    description: 'Altri accessori e idee per la casa e i tuoi momenti di tempo libero.',
  },
]

const products: Array<Product> = [
  // Capispalla e Giacche
  {
    id: 1,
    name: 'Giacca in Lana Cammello',
    image: '/resources/products1.png',
    description:
      'Giacca monopetto in pura lana cammello, taglio sartoriale e fodera interna in raso. Calda, leggera ed elegante, perfetta per le mezze stagioni.',
    shortDescription: 'Giacca monopetto in pura lana, taglio sartoriale.',
    price: 189,
    category: 'capispalla-giacche',
  },
  {
    id: 2,
    name: 'Trench Impermeabile Classico',
    image: '/resources/products1.png',
    description:
      'Trench impermeabile in cotone gabardine con cintura in vita, doppia abbottonatura e martingala posteriore. Un intramontabile per i giorni di pioggia.',
    shortDescription: 'Trench impermeabile in gabardine con cintura.',
    price: 159,
    category: 'capispalla-giacche',
  },
  {
    id: 3,
    name: 'Bomber Imbottito',
    image: '/resources/products1.png',
    description:
      'Bomber imbottito antivento con colletto a coste, tasche con zip e interno trapuntato. Stile casual e calore per le giornate più fredde.',
    shortDescription: 'Bomber imbottito antivento, stile casual.',
    price: 119,
    category: 'capispalla-giacche',
  },
  {
    id: 4,
    name: 'Cappotto Doppiopetto',
    image: '/resources/products1.png',
    description:
      'Cappotto lungo doppiopetto in misto lana, linea avvolgente e bottoni a contrasto. Eleganza senza tempo per la stagione invernale.',
    shortDescription: 'Cappotto lungo doppiopetto in misto lana.',
    price: 229,
    category: 'capispalla-giacche',
  },

  // Accessori
  {
    id: 5,
    name: 'Sciarpa in Cashmere',
    image: '/resources/products2.png',
    description:
      'Sciarpa morbidissima in puro cashmere, dalle tonalità neutre e versatili. Leggera ma calda, si abbina facilmente a ogni outfit.',
    shortDescription: 'Sciarpa in puro cashmere, morbida e calda.',
    price: 69,
    category: 'accessori',
  },
  {
    id: 6,
    name: 'Cintura in Pelle',
    image: '/resources/products2.png',
    description:
      'Cintura in vera pelle pieno fiore con fibbia in metallo spazzolato. Lavorazione artigianale e finiture curate nei minimi dettagli.',
    shortDescription: 'Cintura in vera pelle con fibbia in metallo.',
    price: 49,
    category: 'accessori',
  },
  {
    id: 7,
    name: 'Occhiali da Sole Polarizzati',
    image: '/resources/products2.png',
    description:
      'Occhiali da sole con lenti polarizzate e protezione UV400, montatura leggera e resistente. Custodia rigida e panno inclusi.',
    shortDescription: 'Occhiali polarizzati con protezione UV400.',
    price: 89,
    category: 'accessori',
  },
  {
    id: 8,
    name: 'Cappello in Feltro',
    image: '/resources/products2.png',
    description:
      'Cappello a tesa larga in feltro di lana con nastro grosgrain. Un accessorio raffinato che dona carattere a ogni look.',
    shortDescription: 'Cappello a tesa larga in feltro di lana.',
    price: 55,
    category: 'accessori',
  },

  // Scarpe e Borse
  {
    id: 9,
    name: 'Sneakers in Pelle',
    image: '/resources/products3.png',
    description:
      'Sneakers basse in pelle bianca con suola in gomma flessibile e soletta imbottita. Comfort quotidiano e stile minimalista.',
    shortDescription: 'Sneakers basse in pelle con suola flessibile.',
    price: 99,
    category: 'scarpe-borse',
  },
  {
    id: 10,
    name: 'Stivaletti Chelsea',
    image: '/resources/products3.png',
    description:
      'Stivaletti Chelsea in pelle scamosciata con elastici laterali e linguetta posteriore. Eleganti e facili da indossare in ogni stagione.',
    shortDescription: 'Stivaletti Chelsea in pelle scamosciata.',
    price: 139,
    category: 'scarpe-borse',
  },
  {
    id: 11,
    name: 'Borsa a Tracolla',
    image: '/resources/products3.png',
    description:
      'Borsa a tracolla in pelle saffiano con tracolla regolabile e scomparto interno con zip. Compatta e capiente per ogni giornata.',
    shortDescription: 'Borsa a tracolla in pelle con tracolla regolabile.',
    price: 129,
    category: 'scarpe-borse',
  },
  {
    id: 12,
    name: 'Zaino Urbano',
    image: '/resources/products3.png',
    description:
      'Zaino urbano in tessuto idrorepellente con scomparto imbottito per laptop, tasche organizer e spallacci ergonomici. Pratico per lavoro e viaggio.',
    shortDescription: 'Zaino urbano idrorepellente con scomparto laptop.',
    price: 79,
    category: 'scarpe-borse',
  },

  // Casa e Tempo Libero
  {
    id: 13,
    name: 'Plaid in Lana',
    image: '/resources/products4.png',
    description:
      'Plaid in morbida lana con frange rifinite a mano. Avvolgente e decorativo, ideale per il divano nelle serate più fredde.',
    shortDescription: 'Plaid in morbida lana con frange a mano.',
    price: 59,
    category: 'casa-tempo-libero',
  },
  {
    id: 14,
    name: 'Set di Candele Profumate',
    image: '/resources/products4.png',
    description:
      'Set di 3 candele profumate in cera di soia con fragranze naturali. Lunga durata e atmosfera calda per ogni ambiente della casa.',
    shortDescription: 'Set di 3 candele profumate in cera di soia.',
    price: 34,
    category: 'casa-tempo-libero',
  },
  {
    id: 15,
    name: 'Tazza in Ceramica Artigianale',
    image: '/resources/products4.png',
    description:
      'Tazza in ceramica smaltata realizzata e decorata a mano. Ogni pezzo è unico, perfetto per il caffè del mattino o una tisana serale.',
    shortDescription: 'Tazza in ceramica smaltata fatta a mano.',
    price: 24,
    category: 'casa-tempo-libero',
  },
  {
    id: 16,
    name: 'Borraccia Termica',
    image: '/resources/products4.png',
    description:
      'Borraccia termica in acciaio inox a doppia parete, mantiene le bevande calde o fredde per ore. Tappo ermetico e design compatto da portare ovunque.',
    shortDescription: 'Borraccia termica in acciaio inox a doppia parete.',
    price: 29,
    category: 'casa-tempo-libero',
  },
]

export default products
