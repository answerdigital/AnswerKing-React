import * as yup from 'yup';

export const productFormSchema = yup.object({
  name: yup.string().required('Products Require a Name').max(120, 'Name cannot be longer than 120 characters'),
  description: yup.string().required('Products Require a Description').max(500, 'Description cannot be longer than 500 characters'),
  price: yup.number().required('Products Require a Price').min(0, 'Price must be positive'),
  categoryId: yup.number().required('Products Require a Category'),
  stock: yup.number().required('Products Require a Stock number').min(0).integer(),
  tagsIds: yup.array().of(yup.boolean()),
});

export type ProductFormSchema = yup.InferType<typeof productFormSchema>;
