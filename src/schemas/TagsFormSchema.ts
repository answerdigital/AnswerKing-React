import * as yup from 'yup';

export const tagsFormSchema = yup.object({
  name: yup.string().required('Tag name is required'),
  description: yup.string().required(),
  products: yup.array().of(yup.number()).optional(),
});

export type TagsFormSchema = yup.InferType<typeof tagsFormSchema>;
