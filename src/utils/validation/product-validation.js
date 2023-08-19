import * as yup from 'yup'

export const createProductValidation = yup.object({
  name: yup
    .string()
    .min(3, 'Minimal nama 3 karakter')
    .max(150, 'Maksimal nama 150 karakter')
    .required(),
  description: yup
    .string()
    .min(3, 'Minimal nama 3 karakter')
    .max(150, 'Maksimal nama 150 karakter')
    .required(),
  image: yup.string(),
  cost: yup.object({
    cost_threshold: yup.number().positive().required(),
    materials: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required(),
          unit_price: yup.number().positive().required(),
          cost: yup.number().positive().required(),
          quantity: yup.number().positive().required(),
        })
      )
      .min(1, 'Minimal 1 material'),
    average_cost: yup.number().positive().required(),
    profit: yup.number().positive().required(),
    selling_price: yup.number().positive().required(),
  }),
})
