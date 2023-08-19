import { validate } from '../utils/validation/validation.js'
import {
  addUserAddressValidation,
  loginUserValidation,
  registerUserValidation,
  resendActivationEmailValidation,
  updateUserAddressValidation,
  updateUserProfileValidation,
} from '../utils/validation/user-validation.js'
import { prismaClient } from '../config/database.js'
import { ResponseError } from '../utils/ResponseError.js'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import sendActivationMail from './mail-services.js'
import jwt from 'jsonwebtoken'
import e from 'express'

const register = async (request) => {
  const user = await validate(registerUserValidation, request)

  const alreadyExist = await prismaClient.user.count({
    where: {
      AND: {
        OR: [
          {
            email: user.email,
          },
          {
            phone: user.phone,
          },
        ],
      },
    },
  })

  if (alreadyExist) {
    console.log('alreadyExist:', alreadyExist)
    throw new ResponseError(400, `Email atau no.telepon sudah terdaftar`)
  }

  user.password = await bcrypt.hash(user.password, 10)

  const activationToken = uuid().toString()

  const result = await prismaClient.user.create({
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      activationToken,
      password: user.password,
    },

    select: {
      name: true,
      email: true,
      phone: true,
      activationToken: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Gagal mendaftar user')
  }

  sendActivationMail(result)

  return result
}

const getUserById = async (request) => {
  const { id } = request

  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      address: true,
      isActivated: true,
      business: true,
    },
  })

  console.log('user:', user)

  if (!user) {
    throw new ResponseError(400, 'User tidak ditemukan')
  }

  return user
}

const updateUserProfile = async (request, credential) => {
  const user = await validate(updateUserProfileValidation, request)
  let address = null

  if (request.address) {
    address = await validate(updateUserAddressValidation, request.address)
  }

  const isUserExist = await prismaClient.user.count({
    where: {
      id: credential.id,
    },
  })

  if (!isUserExist) {
    throw new ResponseError(400, 'User tidak ditemukan')
  }

  if (address) {
    const result = await prismaClient.user.update({
      where: {
        id: credential.id,
      },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        address: {
          upsert: {
            create: {
              street: address.street,
              city: address.city,
              province: address.province,
              country: address.country,
              postalCode: address.postalCode ? address.postalCode : null,
              latitude: address.latitude ? address.latitude : null,
              longitude: address.longitude ? address.longitude : null,
            },
            update: {
              street: address.street,
              city: address.city,
              province: address.province,
              country: address.country,
              postalCode: address.postalCode ? address.postalCode : null,
              latitude: address.latitude ? address.latitude : null,
              longitude: address.longitude ? address.longitude : null,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        address: true,
      },
    })

    if (!result) {
      throw new ResponseError(500, 'Gagal mengubah data user')
    }

    return result
  } else {
    const result = await prismaClient.user.update({
      where: {
        id: credential.id,
      },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        address: true,
      },
    })

    if (!result) {
      throw new ResponseError(500, 'Gagal mengubah data user')
    }

    return result
  }
}

const resendActivationEmail = async (request) => {
  const { email } = await validate(resendActivationEmailValidation, request)

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      activationToken: true,
      isActivated: true,
    },
  })

  if (!user) {
    throw new ResponseError(400, 'Email tidak ditemukan')
  }

  if (user?.isActivated) {
    throw new ResponseError(400, 'Akun sudah aktif')
  }

  sendActivationMail(user)

  return user
}

const activateAccount = async (activationToken) => {
  const user = await prismaClient.user.findFirst({
    where: {
      activationToken,
    },
  })

  if (!user) {
    throw new ResponseError(400, 'Token tidak valid')
  }

  if (user.isActivated) {
    throw new ResponseError(400, 'Akun sudah aktif')
  }

  const result = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      isActivated: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Gagal mengaktifkan akun')
  }

  return result
}

const login = async (request) => {
  const { email, password } = await validate(loginUserValidation, request)

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new ResponseError(400, 'Akun tidak ditemukan')
  }

  if (!user.isActivated) {
    throw new ResponseError(403, 'Akun belum aktif')
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new ResponseError(400, 'Password salah')
  }

  const access_token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10s',
    }
  )

  if (!user.refreshToken) {
    const refresh_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    )

    const result = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refresh_token,
      },
    })

    if (!result) {
      throw new ResponseError(500, 'Gagal Login token tidak bisa digenerate')
    }
    return access_token
  } else {
    return access_token
  }
}

const addUserAddress = async (request) => {
  const address = await validate(addUserAddressValidation, request)
  console.log('address:', address)
  const user = await prismaClient.user.findUnique({
    where: {
      id: address.userId,
    },
    select: {
      id: true,
      address: true,
    },
  })

  if (!user) {
    throw new ResponseError(400, 'User tidak ditemukan')
  }

  const result = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      address: {
        upsert: {
          create: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            businessId: address.businessId ? address.businessId : null,
            postalCode: address.postalCode ? address.postalCode : null,
            latitude: address.latitude ? address.latitude : null,
            longitude: address.longitude ? address.longitude : null,
          },
          update: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            businessId: address.businessId ? address.businessId : null,
            postalCode: address.postalCode ? address.postalCode : null,
            latitude: address.latitude ? address.latitude : null,
            longitude: address.longitude ? address.longitude : null,
          },
        },
      },
    },
    select: {
      address: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Gagal menambahkan alamat')
  }

  return result.address
}

export default {
  register,
  resendActivationEmail,
  activateAccount,
  login,
  getUserById,
  addUserAddress,
  updateUserProfile,
}
