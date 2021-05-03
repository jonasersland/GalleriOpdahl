import {BiWine as icon} from 'react-icons/bi'

export default {
  name: 'event',
  title: 'News',
  type: 'document',
  icon,
  fields: [
    {
      name: 'eventTitle',
      title: 'Tittel',
      type: 'string',
    },
    {
      title: 'Start',
      name: 'openingDate',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YY',
        calendarTodayLabel: 'Today'
      }
    },
    {
      title: 'Slutt',
      name: 'closingDate',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YY',
        calendarTodayLabel: 'Today'
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'eventTitle',
        maxLength: 100,
      },
    },
    {
      name: 'previewImage',
      title: 'Hovedbilde',
      type: 'image',
      description: 'Enkeltbilde som representerer innlegget',
    },
    {
      name: 'vimeoEmbed',
      title: 'Vimeo video URL',
      type: 'url',
      description: 'Lim inn addressen til vimeo-filmen. Eksempel: "https://vimeo.com/183807595"',
    },
    {
      name: 'previewImageCaption',
      title: 'Bildetekst',
      type: 'blockContent',
      description: 'Bildetekst til hovedbilde eller -video',
    },
    {
      name: 'eventImages',
      title: 'Bilder',
      type: 'array',
        of: [{type: 'eventImage'}],
      description: 'Liste av relevante bilder',
    },
    {
      name: 'eventText',
      title: 'Tekst',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {title: 'eventTitle', subtitle: 'openingDate'},
  },
}
