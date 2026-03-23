import { defineField, defineType } from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true, // Allows Alex to crop the image inside Sanity
      }
    }),
    defineField({
      name: 'link',
      title: 'Professional Link (Optional)',
      type: 'url',
      description: 'A link to a personal website, LinkedIn, or other professional profile.'
    }),
  ],
})