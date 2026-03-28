import { type SchemaTypeDefinition } from 'sanity'
import { homepageType } from '../schemaTypes/homepage' // (Assuming this exists)
import { publicationType } from '../schemaTypes/publication'
import { teamMemberType } from '../schemaTypes/teamMember'
import { studyType } from '../schemaTypes/study'
import { mediaItemType } from '../schemaTypes/mediaItem'
import { blogPostType } from '../schemaTypes/blogPost'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepageType, publicationType, teamMemberType, studyType, mediaItemType, blogPostType],
}