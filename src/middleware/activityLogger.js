import { activityLogger } from '../utils/logger.js'

export const activityLoggerMiddleware = (req, res, next) => {
  // console the request origin, user agent, and ip

  activityLogger.info(
    `${req.method} | ${req.path} from ${req.headers.host} with user agent ${
      req.headers['user-agent']
    } | time: ${new Date().toLocaleString()}`
  )

  next()
}
