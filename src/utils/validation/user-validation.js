import * as yup from 'yup'

export const registerUserValidation = yup.object({
  name: yup
    .string()
    .min(3, 'Minimal nama 3 karakter')
    .max(50, 'Maksimal nama 50 karakter')
    .required(),

  email: yup
    .string()
    .email('Email tidak valid')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Email tidak valid')
    .required(),

  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Nomor telepon tidak valid')
    .min(9, 'Minimal nomor telepon 9 karakter')
    .max(15, 'Maksimal nomor telepon 15 karakter')
    .required(),

  password: yup
    .string()
    .min(8, 'Minimal password 8 karakter')
    .max(50, 'Maksimal password 50 karakter')
    .required(),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password tidak sama')
    .required('Konfirmasi password harus diisi'),
})

export const resendActivationEmailValidation = yup.object({
  email: yup
    .string()
    .email('Email tidak valid')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Email tidak valid')
    .required(),
})

export const loginUserValidation = yup.object({
  email: yup

    .string()
    .email('Email tidak valid')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Email tidak valid')
    .required(),

  password: yup
    .string()
    .min(8, 'Minimal password 8 karakter')
    .max(50, 'Maksimal password 50 karakter')
    .required(),
})

export const getUserByIdValidation = yup.object({
  id: yup.string().uuid('ID tidak valid').required(),
})

export const addUserAddressValidation = yup.object({
  userId: yup.number().required(),
  bussinessId: yup.number(),
  country: yup.string().required(),
  province: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  postalCode: yup.string(),
  latitude: yup.string(),
  longitude: yup.string(),
})

export const updateUserAddressValidation = yup.object({
  country: yup.string().required(),
  province: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  postalCode: yup.string(),
  latitude: yup.string(),
  longitude: yup.string(),
})

export const updateUserProfileValidation = yup.object({
  name: yup
    .string()
    .min(3, 'Minimal nama 3 karakter')
    .max(50, 'Maksimal nama 50 karakter'),

  email: yup
    .string()
    .email('Email tidak valid')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Email tidak valid'),

  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Nomor telepon tidak valid')
    .min(9, 'Minimal nomor telepon 9 karakter')
    .max(15, 'Maksimal nomor telepon 15 karakter'),

  avatar: yup.string(),
})
