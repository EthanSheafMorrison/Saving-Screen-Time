import { defineField, defineType } from 'sanity'

// Content for /tools/cosy-charger. The page reads the first document of this
// type, so only one is needed. Every field is optional: anything left empty
// falls back to the placeholder text and photos built into the page.
export const cosyChargerType = defineType({
  name: 'cosyCharger',
  title: 'Cosy Charger Page',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Intro Line',
      type: 'text',
      rows: 2,
      description: 'One or two sentences shown under the big "Cosy Charger" heading',
    }),
    defineField({
      name: 'quote',
      title: 'Pull Quote',
      type: 'string',
      description: 'The large italic line beside the main text',
    }),
    defineField({
      name: 'body',
      title: 'Main Text',
      type: 'array',
      description: 'What the cosy charger is and why it matters. A few paragraphs, e.g. adapted from the blog post',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'blogPost',
      title: 'Blog Post (optional)',
      type: 'reference',
      to: [{ type: 'blogPost' }],
      description: 'Pick the cosy charger blog post to add a "Read the blog" link under the main text',
    }),
    defineField({
      name: 'gallery',
      title: 'Photos',
      type: 'array',
      description: 'Photos of cosy chargers. Drag to reorder. Portrait photos work best',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Describe the photo for people who can\'t see it',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'e.g. what it\'s made from and who made it',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'zineIntro',
      title: 'DIY Zine Text',
      type: 'text',
      rows: 3,
      description: 'A short paragraph shown above the zine download button',
    }),
    defineField({
      name: 'zine',
      title: 'DIY Zine (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Upload the DIY instructions zine. Until there is a file here the page shows "Zine coming soon". To update it, replace the file and Publish.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Cosy Charger Page' }),
  },
})
