export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'book',
      title: 'Book',
      type: 'reference',
      to: [{ type: 'book' }],
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'reviewerEmail',
      title: 'Reviewer Email',
      type: 'string',
      validation: (Rule: { email: () => any; }) => Rule.email(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'content',
      title: 'Review Content',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      initialValue: () => new Date().toISOString(),
    },
  ],
};
