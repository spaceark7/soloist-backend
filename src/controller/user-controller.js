import userServices from '../services/user-services.js'
import path from 'path'

const register = async (req, res, next) => {
  try {
    await userServices.register(req.body)
    res.status(201).json({
      data: {
        status: true,
        message: 'Berhasil daftar',
      },
    })
  } catch (error) {
    next(error)
  }
}

const resendActivationEmail = async (req, res, next) => {
  try {
    await userServices.resendActivationEmail(req.body)
    res.status(200).json({
      data: {
        status: true,
        message: 'Berhasil kirim ulang email aktivasi',
      },
    })
  } catch (error) {
    next(error)
  }
}

const activateAccount = async (req, res) => {
  const { token } = req.params
  try {
    await userServices.activateAccount(token)
    res
      .status(200)
      .sendFile(path.resolve('src', 'views', 'account-activated.html'))
  } catch (error) {
    res
      .status(400)
      .sendFile(path.resolve('src', 'views', 'account-already-activated.html'))
  }
}

const login = async (req, res, next) => {
  try {
    const result = await userServices.login(req.body)
    res.status(200).json({
      data: {
        status: true,
        message: 'Berhasil login',
        access_token: result,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const result = await userServices.getUserById(req.user)
    res.status(200).json({
      data: {
        status: true,
        message: 'Berhasil mendapatkan data user',
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

const addUserAddress = async (req, res, next) => {
  try {
    const result = await userServices.addUserAddress(req.body)
    res.status(201).json({
      data: {
        status: true,
        message: 'Berhasil menambahkan alamat',
        address: result,
      },
    })
  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async (req, res, next) => {
  console.log('req.body:', req.body)
  console.log('req.user:', req.user)
  try {
    const result = await userServices.updateUserProfile(req.body, req.user)
    res.status(200).json({
      data: {
        status: true,
        message: 'Berhasil mengubah data user',
        result,
      },
    })
  } catch (error) {
    next(error)
  }
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
