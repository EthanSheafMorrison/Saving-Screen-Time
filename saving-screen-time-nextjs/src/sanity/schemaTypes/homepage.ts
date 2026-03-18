// sanity/schemaTypes/homepage.ts
import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({ name: 'heroLabel', title: 'Hero Label', type: 'string', initialValue: 'a research project by Alex Beattie' }),
    defineField({ name: 'heroIntro', title: 'Hero Introduction Text', type: 'text' }),
    defineField({ name: 'yellowBody', title: 'Yellow Section Body Text', type: 'text' }),
    defineField({ name: 'neonBoxHeading', title: 'Neon Box Heading', type: 'string', initialValue: 'Crip Time' }),
    defineField({ name: 'neonBoxBody', title: 'Neon Box Body Text', type: 'text' }),
    defineField({ name: 'blackMainText', title: 'Black Section Main Text', type: 'text' }),
    defineField({ name: 'stripeBlueText', title: 'Blue Stripe Giant Text', type: 'string', initialValue: 'DISCONNECT' }),
    defineField({ name: 'stripeYellowText', title: 'Yellow Stripe Body Text', type: 'text' }),
    defineField({ name: 'contactText', title: 'Contact Button Text', type: 'string', initialValue: 'CONTACT THE RESEARCHER ↗' }),
    defineField({ name: 'contactEmail', title: 'Contact Email Address', type: 'string', initialValue: 'alex.beattie@vuw.ac.nz' }),
  ],
})