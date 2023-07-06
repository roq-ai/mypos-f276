import * as yup from 'yup';

export const variantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  food_item_id: yup.string().nullable().required(),
});
