import { defineField, defineType } from 'sanity'
import { foldOptions } from '../../lib/folds'

// One PDF download button. Shared by the "Downloads" lists on talks and the
// Cosy Charger page. The name stays "download" so existing talk downloads,
// stored with _type "download", keep working.
export const downloadType = defineType({
  name: 'download',
  title: 'PDF',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Button Label',
      type: 'string',
      description: 'e.g. Project Brochure',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (Rule) => Rule.required().assetRequired()
    }),
    defineField({
      name: 'fold',
      title: 'Folding Instructions (optional)',
      type: 'string',
      description: 'If this PDF is a folded brochure, pick its fold to show printing and folding instructions on the talk page',
      options: { list: foldOptions },
      // Only talk pages show folding guides
      hidden: ({ document }) => document?._type !== 'talk',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'file.asset.originalFilename',
    },
  },
})
