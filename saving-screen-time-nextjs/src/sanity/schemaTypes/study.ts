import { defineField, defineType } from 'sanity'

export const studyType = defineType({
  name: 'study',
  title: 'Current Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Study Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Active', 'Recruiting', 'Completed', 'Upcoming'],
      },
      initialValue: 'Active'
    }),
    defineField({
      name: 'description',
      title: 'Study Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Study Image',
      type: 'image',
      options: { hotspot: true } // Allows cropping inside Sanity Studio
    }),
    defineField({
      name: 'link',
      title: 'Learn More Link (Optional)',
      type: 'url',
    }),
  ],
})