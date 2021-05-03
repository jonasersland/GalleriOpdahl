// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import eventImage from './eventImage'
import exhibitionImage from './exhibitionImage'
import workImage from './workImage'
import vimeo from './vimeo'
import frontpage from './frontpage'
import about from './about'
import artist from './artist'
import exhibition from './exhibition'
import event from './event'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([

    frontpage,
    about,
    artist,
    exhibition,
    event,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    workImage,
    exhibitionImage,
    eventImage,
    blockContent,
    vimeo,
  ]),
})
