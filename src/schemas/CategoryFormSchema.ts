import * as yup from 'yup';

export const categoryFormSchema = yup.object({
  name: yup.string().required('Category name is required'),
  desc: yup.string().optional(),
  products: yup.array().of(yup.number()).optional(),
});

export type CategoryFormSchema = yup.InferType<typeof categoryFormSchema>;
