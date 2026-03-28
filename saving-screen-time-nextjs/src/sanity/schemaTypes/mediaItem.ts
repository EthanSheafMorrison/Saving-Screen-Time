import { defineField, defineType } from 'sanity'

export const mediaItemType = defineType({
  name: 'mediaItem',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'outlet',
      title: 'Outlet / Source',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'Article' },
          { title: 'Interview', value: 'Interview' },
          { title: 'Podcast', value: 'Podcast' },
          { title: 'Video', value: 'Video' },
          { title: 'Press Release', value: 'Press Release' },
          { title: 'Other', value: 'Other' },
        ]
      }
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
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
      subtitle: 'outlet',
    },
  },
})
