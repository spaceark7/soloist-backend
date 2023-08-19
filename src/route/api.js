import userController from '../controller/user-controller.js'
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import businessController from '../controller/business-controller.js'
import productController from '../controller/product-controller.js'

const protectedRouter = new express.Router()
protectedRouter.use(authMiddleware)

// @desc   get user profile
// @route  GET /api/users
// @access protected
protectedRouter.get('/api/users', userController.getUserById)

// @desc   update user profile
// @route  PUT /api/users
// @access protected
protectedRouter.put('/api/users', userController.updateUserProfile)

// @desc   add user address
// @route  POST /api/users/address
// @access protected
protectedRouter.post('/api/users/address', userController.addUserAddress)

// @desc   create business
// @route  POST /api/users/business
// @access protected
protectedRouter.post('/api/users/business', businessController.addUserBusiness)

// @desc   get business
// @route  GET /api/users/business
// @access protected

protectedRouter.get('/api/users/business', businessController.getUserBusiness)

// @desc   edit business
// @route  PUT /api/users/business
// @access protected
protectedRouter.put('/api/users/business', businessController.editUserBusiness)

// @desc   add product
// @route  POST /api/users/business/product
// @access protected
protectedRouter.post(
  '/api/users/business/product',
  productController.addProduct
)

export { protectedRouter }
