import * as yup from 'yup';

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  restaurant_id: yup.string().nullable().required(),
});
