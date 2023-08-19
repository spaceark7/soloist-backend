import { createBusinessValidation } from '../utils/validation/business-validation.js'
import { prismaClient } from '../config/database.js'
import { validate } from '../utils/validation/validation.js'
import { ResponseError } from '../utils/ResponseError.js'

const createBusiness = async (request) => {
  const business = await validate(createBusinessValidation, request)
  const user = await prismaClient.user.findUnique({
    where: {
      id: business.userId,
    },
    select: {
      email: true,
      id: true,
      business: true,
      address: true,
    },
  })

  if (!user) {
    throw new ResponseError(404, 'User tidak ditemukan')
  }

  if (user.business) {
    throw new ResponseError(400, 'User sudah memiliki bisnis')
  } else {
    const result = await prismaClient.business.create({
      data: {
        userEmail: user.email,
        business_name: business.business_name,
        address: business.use_user_address
          ? {
              connectOrCreate: {
                where: {
                  userId: user.id,
                },
                create: {
                  userId: user.id,
                  street: business.address
                    ? business.address.street
                    : user.address.street,
                  city: business.address
                    ? business.address.city
                    : user.address.city,
                  province: business.address
                    ? business.address.province
                    : user.address.province,
                  country: business.address
                    ? business.address.country
                    : user.address.country,
                  postalCode: business.address
                    ? business.address.postalCode
                    : user.address.postalCode,
                },
              },
            }
          : {
              create: {
                city: business.address.city,
                country: business.address.country,
                postalCode: business.address.postalCode,
                province: business.address.province,
                street: business.address.street,
              },
            },
        business_phone: business.business_phone
          ? business.business_phone
          : null,
        business_email: business.business_email
          ? business.business_email
          : null,
        business_description: business.business_description,
      },
      include: {
        address: true,
      },
    })

    if (!result) {
      throw new ResponseError(500, 'Gagal menambahkan data bisnis')
    }

    return result
  }
}

const getUserBusiness = async (credential) => {
  const result = await prismaClient.business.findUnique({
    where: {
      userEmail: credential.email,
    },
    include: {
      address: true,
    },
  })

  if (!result) {
    throw new ResponseError(404, 'Bisnis tidak ditemukan')
  }

  return result
}

const upsertBusiness = async (request) => {
  const business = await validate(createBusinessValidation, request)

  const user = await prismaClient.user.findUnique({
    where: {
      id: business.userId,
    },
    select: {
      id: true,
      email: true,
      business: true,
      address: true,
    },
  })

  if (!user) {
    throw new ResponseError(404, 'User tidak ditemukan')
  }

  const result = await prismaClient.business.update({
    where: {
      id: user.business.id,
    },
    data: {
      business_name: business.business_name,
      business_phone: business.business_phone ? business.business_phone : null,
      business_email: business.business_email ? business.business_email : null,
      business_description: business.business_description,
      address: business.use_user_address
        ? {
            connect: {
              userId: user.id,
            },
          }
        : {
            upsert: {
              create: {
                city: business.address
                  ? business.address.city
                  : user.address.city,
                province: business.address
                  ? business.address.province
                  : user.address.province,
                country: business.address
                  ? business.address.country
                  : user.address.country,
                postalCode: business.address
                  ? business.address.postalCode
                  : user.address.postalCode,
                street: business.address
                  ? business.address.street
                  : user.address.street,
              },
              update: {
                city: business.address
                  ? business.address.city
                  : user.address.city,
                province: business.address
                  ? business.address.province
                  : user.address.province,
                country: business.address
                  ? business.address.country
                  : user.address.country,
                postalCode: business.address
                  ? business.address.postalCode
                  : user.address.postalCode,
                street: business.address
                  ? business.address.street
                  : user.address.street,
              },
            },
          },
      // address: {
      //   upsert: {
      //     create: {
      //       country: business.address
      //         ? business.address.country
      //         : user.address.country,
      //       city: business.address ? business.address.city : user.address.city,
      //       province: business.address
      //         ? business.address.province
      //         : user.address.province,
      //       street: business.address
      //         ? business.address.street
      //         : user.address.street,
      //     },
      //     update: {
      //       street: business.address
      //         ? business.address.street
      //         : user.address.street,
      //       city: business.address ? business.address.city : user.address.city,
      //       province: business.address
      //         ? business.address.province
      //         : user.address.province,
      //       country: business.address
      //         ? business.address.country
      //         : user.address.country,
      //       postalCode: business.address
      //         ? business.address.postalCode
      //         : user.address.postalCode,
      //     },
      //   },
      // },
    },
    include: {
      address: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Gagal menambahkan data bisnis')
  }

  return result
}

export default {
  createBusiness,
  upsertBusiness,
  getUserBusiness,
}
