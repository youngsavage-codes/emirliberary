export default {
  name: 'artifact',
  title: 'Cultural Artifact',
  type: 'document',
  fields: [
    { name: 'name', title: 'Artifact Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'origin', title: 'Origin / Period', type: 'string' },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'location', title: 'Current Location (Museum, Palace)', type: 'string' },
  ],
};
