import { prismaClient } from '../config/database.js'
import { validate } from '../utils/validation/validation.js'
import { ResponseError } from '../utils/ResponseError.js'
import { createProductValidation } from '../utils/validation/product-validation.js'

const addProduct = async (request, credential) => {
  const product = await validate(createProductValidation, request)

  const business = await prismaClient.business.findUnique({
    where: {
      userEmail: credential.email,
    },
    select: {
      id: true,
    },
  })

  const productExist = await prismaClient.product.findFirst({
    where: {
      businessId: business.id,
      name: product.name,
    },
  })

  if (productExist) {
    throw new ResponseError(400, 'Produk sudah ada')
  }

  if (!business) {
    throw new ResponseError(404, 'Bisnis tidak ditemukan')
  }

  if (!product.cost?.materials?.length) {
    const result = await prismaClient.product.create({
      data: {
        businessId: business.id,
        name: product.name,
        description: product.description,
        image: product.image,
        cost: {
          create: {
            cost_threshold: product.cost.cost_threshold,
            average_cost: product.cost.average_cost,
            profit: product.cost.profit,
            selling_price: product.cost.selling_price,
          },
        },
      },
      include: {
        cost: true,
      },
    })

    if (!result) {
      throw new ResponseError(500, 'Gagal menambahkan produk')
    }

    return result
  } else {
    const new_product = await prismaClient.product.create({
      data: {
        businessId: business.id,
        name: product.name,
        description: product.description,
        image: product.image,
        cost: {
          create: {
            cost_threshold: product.cost.cost_threshold,
            average_cost: product.cost.average_cost,
            profit: product.cost.profit,
            selling_price: product.cost.selling_price,
            materials: {
              createMany: {
                data: product.cost.materials,
              },
            },
          },
        },
      },
      include: {
        cost: {
          include: {
            materials: true,
          },
        },
      },
    })

    return new_product
  }
}

export default {
  addProduct,
}
