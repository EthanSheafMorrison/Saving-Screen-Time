import { defineField, defineType } from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'string',
      initialValue: 'Alex Beattie'
    }),
    defineField({
      name: 'year',
      title: 'Year of Publication',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'A link to the journal or article (e.g., https://journals.sagepub.com/...)'
    }),
    defineField({
      name: 'description',
      title: 'Optional Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
    },
  },
})