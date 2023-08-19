import express from 'express'
import { errorHandlerMiddleware } from './src/middleware/error-handler-middleware.js'
import { publicRouter } from './src/route/public-api.js'
import { logger } from './src/utils/logger.js'
import { activityLoggerMiddleware } from './src/middleware/activityLogger.js'
import { protectedRouter } from './src/route/api.js'
import compression from 'compression'
const app = express()
const PORT = process.env.PORT || 5000

app.use(compression())
app.use(express.static('public'))
app.use(activityLoggerMiddleware)
app.use(express.json())
app.use(publicRouter)
app.use(protectedRouter)
app.use(errorHandlerMiddleware)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.listen(PORT, () => {
  logger.info('App Running')
})
