import {BiShow as icon} from 'react-icons/bi'

export default {
  name: 'exhibition',
  title: 'Exhibitions',
  type: 'document',
  icon,
  fields: [
    {
      name: 'exhibitionTitle',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'exhibitionSubTitle',
      title: 'Undertittel',
      type: 'string',
    },
    {
      title: 'Åpning',
      name: 'openingDate',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YY',
        calendarTodayLabel: 'Today'
      }
    },
    {
      title: 'Avslutning',
      name: 'closingDate',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YY',
        calendarTodayLabel: 'Today'
      }
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'exhibitionTitle',
        maxLength: 100,
      },
      description: 'URLen som kommer etter www.galleriopdahl.no/exhibition/ i addressefeltet. Klikk "Generate" for å generere denne automatisk.',
    },
    {
      name: 'exhibitionImages',
      title: 'Bilder',
      type: 'array',
      of: [{type: 'exhibitionImage'}],
      description: 'Bilder av utstillingen',
    },
    {
      name: 'exhibitionText',
      title: 'Tekst',
      type: 'blockContent',
    },
  ],
  orderings: [
    {
      title: 'Opening Date (newest to oldest)',
      name: 'openingDateDesc',
      by: [
        {field: 'openingDate', direction: 'desc'}
      ]
    },
    {
      title: 'Opening Date (oldest to newest)',
      name: 'openingDateAsc',
      by: [
        {field: 'openingDate', direction: 'asc'}
      ]
    },
    {
      title: 'Artist name',
      name: 'artistName',
      by: [
        {field: 'exhibitionTitle', direction: 'asc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'exhibitionTitle',
      subtitle: 'exhibitionSubTitle',
      date: 'openingDate',
    },
    prepare(selection){
      const {title, subtitle, date} = selection
      return{
        title: title + " - " + subtitle,
        subtitle: date
      }
    }
  },
}