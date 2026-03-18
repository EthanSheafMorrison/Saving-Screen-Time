import { type SchemaTypeDefinition } from 'sanity'
import { homepageType } from '../schemaTypes/homepage' // (Assuming this exists)
import { publicationType } from '../schemaTypes/publication'
import { teamMemberType } from '../schemaTypes/teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepageType, publicationType, teamMemberType],
}