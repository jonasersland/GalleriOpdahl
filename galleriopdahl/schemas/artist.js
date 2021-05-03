import {BiIdCard as icon} from 'react-icons/bi';

function myAsyncSlugifier(input, type) {
  return `${input.firstName}-${input.lastName}`
}

export default {
  name: 'artist',
  title: 'Artists',
  type: 'document',
  icon,
  fields: [
    {
      name: 'firstName',
      title: 'Fornavn',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Etternavn',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: myAsyncSlugifier,
      },
      description: 'URLen som kommer etter www.galleriopdahl.no/artists i addressefeltet. For eksempel "www.galleriopdahl.no/artist/rebecca-ackroyd". Klikk "Generate" for å generere denne automatisk.',
    },
    {
      name: 'workImages',
      title: 'Bilder',
      type: 'array',
      of: [{type: 'workImage'}],
      description: 'Verk av kunstneren.',
    },
    {
      name: 'artistBio',
      title: 'Kunstner-bio',
      type: 'blockContent',
    },
    {
      name: 'press',
      title: 'Presseoppslag',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'lastName', 
      subtitle: 'firstName',
      media: 'workImages',
    },
    prepare(selection) {
      const {title, subtitle,media} = selection
      return {
        title: title + ", " + subtitle,
        media:media
      }
    }
  },
}