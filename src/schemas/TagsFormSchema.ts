import * as yup from 'yup';

export const tagsFormSchema = yup.object({
  name: yup.string().required('Tags Require a Name').max(120, 'Name cannot be longer than 120 characters'),
  description: yup.string().max(500, 'Description cannot be longer than 500 characters'),
  products: yup.array().of(yup.boolean()),
});

export type TagsFormSchema = yup.InferType<typeof tagsFormSchema>;
