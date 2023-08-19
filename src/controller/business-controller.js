import businessServices from '../services/business-services.js'

const addUserBusiness = async (req, res, next) => {
  try {
    const result = await businessServices.createBusiness(req.body)
    res.status(201).json({
      data: {
        status: true,
        message: 'Berhasil menambahkan data bisnis',
        business: result,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getUserBusiness = async (req, res, next) => {
  try {
    const result = await businessServices.getUserBusiness(req.user)
    res.status(201).json({
      data: {
        status: true,
        message: 'Berhasil mengambil data bisnis',
        business: result,
      },
    })
  } catch (error) {
    next(error)
  }
}

const editUserBusiness = async (req, res, next) => {
  try {
    const result = await businessServices.upsertBusiness(req.body)
    res.status(201).json({
      data: {
        status: true,
        message: 'Berhasil mengubah data bisnis',
        business: result,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default {
  addUserBusiness,
  getUserBusiness,
  editUserBusiness,
}
