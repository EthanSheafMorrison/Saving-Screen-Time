import { defineField, defineType } from 'sanity'
import { foldOptions } from '../../lib/folds'

export const talkType = defineType({
  name: 'talk',
  title: 'Talks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'D MMMM YYYY' },
      description: 'Talks move from "Upcoming" to "Past Talks" on the Talks page automatically after this date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'time',
      title: 'Time (optional)',
      type: 'string',
      description: 'e.g. 2:00–3:00pm NZST'
    }),
    defineField({
      name: 'event',
      title: 'Event / Conference',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Venue and city, or "Online"'
    }),
    defineField({
      name: 'eventLink',
      title: 'Event Link (optional)',
      type: 'url',
      description: 'The event or registration page'
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'string',
      initialValue: 'Alex Beattie'
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      description: 'A short summary shown on the Talks page'
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      description: 'Upload brochures, slides etc. as PDFs. Each one becomes a download button on the talk page. To update one, replace its file and Publish.',
      of: [
        {
          type: 'object',
          name: 'download',
          title: 'PDF',
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
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'file.asset.originalFilename',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body (optional)',
      type: 'array',
      description: 'A longer description, abstract or notes. Works like a blog post',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Talk date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})
