import productServices from '../services/product-services.js'

const addProduct = async (req, res, next) => {
  try {
    const result = await productServices.addProduct(req.body, req.user)
    res.status(201).json({
      data: {
        status: true,
        message: 'Berhasil menambahkan data produk',
        product: result,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default {
  addProduct,
}
