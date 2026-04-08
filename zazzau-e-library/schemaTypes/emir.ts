export default {
  name: 'emir',
  title: 'Emir of Zazzau',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'reignStart',
      title: 'Reign Start (Year)',
      type: 'number',
    },
    {
      name: 'reignEnd',
      title: 'Reign End (Year)',
      type: 'number',
      description: 'Leave empty if currently reigning',
    },

    // ✨ Blog-like Biography Field
    {
      name: 'bio',
      title: 'Biography (Full Blog)',
      type: 'array',
      of: [
        // 🧾 Rich text blocks
        {
          type: 'block',
          title: 'Rich Text',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', title: 'URL', type: 'url' },
                  {
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },

        // 🖼️ Image block with captions
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },

        // 🎥 Video embeds
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          fields: [
            {
              name: 'url',
              title: 'Video URL (YouTube, Vimeo, etc.)',
              type: 'url',
              validation: (Rule: { uri: (arg0: { scheme: string[]; }) => any; }) => Rule.uri({ scheme: ['http', 'https'] }),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },

        // 💬 Callout / Highlight section
        {
          type: 'object',
          name: 'callout',
          title: 'Callout / Highlight Box',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'body', title: 'Body', type: 'text' },
            {
              name: 'tone',
              title: 'Tone',
              type: 'string',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                ],
                layout: 'radio',
              },
              initialValue: 'info',
            },
          ],
        },

        // 🧩 Custom HTML
        {
          type: 'object',
          name: 'htmlBlock',
          title: 'Custom HTML',
          fields: [
            {
              name: 'html',
              title: 'HTML Content',
              type: 'text',
              description:
                'Insert custom HTML. Avoid scripts — sanitize before rendering.',
            },
          ],
        },
      ],
    },
  ],
};
