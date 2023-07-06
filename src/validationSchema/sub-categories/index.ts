import * as yup from 'yup';

export const subCategoryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  category_id: yup.string().nullable().required(),
});
