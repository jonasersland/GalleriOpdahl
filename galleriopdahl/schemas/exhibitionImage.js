export default {
    name: 'exhibitionImage',
    title: 'Bilde av utstillingen',
    type: 'object',
    fields: [
        {
        name: 'image',
        title: 'Bildefil',
        type: 'image',
        },
      {
        name: 'caption',
        title: 'Bildetekst',
        type: 'blockContent',
      },
    ],
    preview: {
      select: {
        media: 'image',
        title: 'caption',
      },
    },
  }
  