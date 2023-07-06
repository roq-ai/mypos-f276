import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  shopping_cart_id: yup.string().nullable().required(),
  discount_id: yup.string().nullable(),
});
