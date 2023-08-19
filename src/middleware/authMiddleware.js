import jwt from 'jsonwebtoken'
import { prismaClient } from '../config/database.js'
export const authMiddleware = async (req, res, next) => {
  const authorization = req.get('Authorization')

  if (!authorization) {
    res
      .status(401)
      .json({
        errors: {
          status: false,
          message: 'Unauthorized',
        },
      })
      .end()
  } else {
    // split token
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        const payload = jwt.decode(token)

        if (payload) {
          const user = await prismaClient.user.findUnique({
            where: {
              id: payload.id,
            },
            select: {
              refreshToken: true,
            },
          })
          if (!user) {
            res
              .status(401)
              .json({
                errors: {
                  status: false,
                  message: 'User tidak ditemukan',
                },
              })
              .end()
          }

          if (user.refreshToken) {
            console.log('user.refreshToken:', user.refreshToken)
            jwt.verify(
              user.refreshToken,
              process.env.REFRESH_TOKEN_SECRET,
              async (err, decoded) => {
                if (err) {
                  await prismaClient.user.update({
                    where: {
                      id: payload.id,
                    },
                    data: {
                      refreshToken: null,
                    },
                  })

                  res
                    .status(401)
                    .json({
                      errors: {
                        status: false,
                        message: 'Token tidak valid',
                      },
                    })
                    .end()
                } else {
                  const access_token = jwt.sign(
                    {
                      id: decoded.id,
                      email: decoded.email,
                      name: decoded.name,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                      expiresIn: '10s',
                    }
                  )
                  req.user = decoded
                  req.token = access_token
                  next()
                }
              }
            )
          } else {
            res
              .status(401)
              .json({
                errors: {
                  status: false,
                  message: 'Token tidak valid',
                },
              })
              .end()
          }
        } else {
          res
            .status(401)
            .json({
              errors: {
                status: false,
                message: 'Token tidak valid',
              },
            })
            .end()
        }
      } else {
        req.user = decoded

        next()
      }
    })
  }
}
