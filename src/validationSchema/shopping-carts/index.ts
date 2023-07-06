import * as yup from 'yup';

export const shoppingCartValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
});
