import * as yup from 'yup';

export const discountValidationSchema = yup.object().shape({
  name: yup.string().required(),
  percentage: yup.number().integer().required(),
  restaurant_id: yup.string().nullable().required(),
});
