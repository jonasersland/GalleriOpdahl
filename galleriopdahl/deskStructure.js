import {BiHomeAlt as homeIcon} from 'react-icons/bi'
import {BiGlasses as aboutIcon} from 'react-icons/bi'
import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Front page')
        .icon(homeIcon)
        .child(
          S.document()
            .title('Front page')
            .schemaType('frontpage')
            .documentId('frontpage')
        ),
    //...S.documentTypeListItems().filter(listItem => !['frontpage'].includes(listItem.getId())),
      S.listItem()
        .title('About')
        .icon(aboutIcon)
        .child(
          S.document()
            .title('About')
            .schemaType('about')
            .documentId('about')
        ),
        ...S.documentTypeListItems().filter(
            listItem =>
              !['frontpage', 'about'].includes(
                listItem.getId()
              )
          )
    ])