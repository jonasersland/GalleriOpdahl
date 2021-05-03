export default {
    name: 'eventImage',
    title: 'Event-bilde',
    type: 'object',
    fields: [
        {
        name: 'image',
        title: 'Bilde',
        type: 'image',
        },
      {
        name: 'title',
        title: 'Tittel',
        type: 'string',
      },
      {
        name: 'subTitle',
        title: 'Undertittel',
        type: 'string',
      },
    ],
    preview: {
      select: {
        media: 'image',
        title: 'title',
        subtitle: 'subTitle',
      },
    },
  }
  