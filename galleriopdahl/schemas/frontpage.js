import UserIcon from 'part:@sanity/base/user-icon'

export default {
  name: 'frontpage',
  id:'frontpage',
  title: 'Front page',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
        title: 'Forside-innlegg',
        name: 'frontpageItem',
        type: 'reference',
        to: [
          {type: 'exhibition'},
          {type: 'event'},
        ],
        description: 'Innlegget som representeres på forsiden. Dette kan være enten en utstilling eller et nyhetsinnlegg.',
      },
  ],
  preview: {
    select: {title: 'name'},
  },
}

// {
//   title: 'Frontpage event or exhibition',
//   name: 'frontpageItem',
//   type: 'array',
//   of: [
//     {
//       type: 'reference',
//       to: [
//         {type: 'exhibition'}
//       ],
//     }
//   ],
//   validation: Rule => Rule.required().min(1).max(1)
// },