import * as yup from 'yup';

export const tagsFormSchema = yup.object({
  name: yup.string().required('Tag name is required'),
  desc: yup.string().optional(),
  products: yup.array().of(yup.number()).optional(),
});

export type TagsFormSchema = yup.InferType<typeof tagsFormSchema>;
