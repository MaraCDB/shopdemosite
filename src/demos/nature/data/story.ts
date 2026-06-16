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
