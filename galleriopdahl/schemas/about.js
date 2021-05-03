import UserIcon from 'part:@sanity/base/user-icon'

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      hidden:true,
    },
    {
      name: 'previewImage',
      title: 'Bilde',
      type: 'image',
      },
      {
        name: 'previewImageText',
        title: 'Bildetekst',
        type: 'blockContent',
      },
    {
      name: 'aboutText',
      title: 'Tekst om galleriet',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {title: 'title'},
  },
}
