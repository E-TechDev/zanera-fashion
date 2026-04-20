export default {
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'string',
      description: 'e.g. "50% OFF", "Buy 1 Get 1 Free"',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers appear first',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      discount: 'discount',
      isActive: 'isActive'
    },
    prepare(selection: any) {
      const { title, discount, isActive } = selection
      return {
        title: `${title} - ${discount}`,
        subtitle: isActive ? 'Active' : 'Inactive'
      }
    }
  }
}
