import * as yup from 'yup';

export const foodItemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  sub_category_id: yup.string().nullable().required(),
});
