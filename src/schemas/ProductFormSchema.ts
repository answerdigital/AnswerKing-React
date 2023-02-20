import * as yup from 'yup';

export const productFormSchema = yup.object({
  name: yup.string().required('Name is required').max(120, 'Name cannot be longer than 120 characters'),
  description: yup.string().optional().max(500, 'Description cannot be longer than 500 characters'),
  price: yup.number().required('Price is required').min(0, 'Price must be positive'),
  categoryId: yup.number().optional(),
  stock: yup.number().required('Stock number is required').min(0).integer(),
  tagsIds: yup.array().of(yup.number()),
});

export type ProductFormSchema = yup.InferType<typeof productFormSchema>;
