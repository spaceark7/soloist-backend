import * as yup from 'yup'

export const createBusinessValidation = yup.object({
  userId: yup.number().required(),
  business_name: yup
    .string()
    .min(3, 'Minimal nama 3 karakter')
    .max(150, 'Maksimal nama 150 karakter')
    .required(),
  business_phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Nomor telepon tidak valid')
    .min(9, 'Minimal nomor telepon 9 karakter')
    .max(15, 'Maksimal nomor telepon 15 karakter'),
  business_email: yup
    .string()
    .email('Email tidak valid')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Email tidak valid'),
  business_description: yup
    .string()
    .min(3, 'Minimal nama 3 karakter')
    .max(200, 'Maksimal nama 200 karakter')
    .required(),
})
