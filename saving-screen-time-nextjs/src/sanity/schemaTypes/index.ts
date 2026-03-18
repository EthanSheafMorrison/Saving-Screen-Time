import { type SchemaTypeDefinition } from 'sanity'
import { homepageType } from '../schemaTypes/homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepageType],
}