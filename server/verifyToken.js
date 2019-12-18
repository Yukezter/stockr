const { JWT } = require('./util')
const { ApplicationError } = require('./ApplicationError')

const User = require('./models/User')

module.exports = async (req, res, next) => {
  
  const token = req.header('Authorization')
  if (!token) return next(new ApplicationError(401, 'access denied'))

  JWT.verify(
    token.split(' ')[1],
    async (err, decoded) => {
      if (err) return next(new ApplicationError(401, 'invalid token'))

      const expired = Date.now() >= decoded.exp * 1000
      if (expired) return next(new ApplicationError(401, 'expired token'))
  
      req.user = await User.findById(decoded.sub)
      if (!req.user) return next(new ApplicationError(404, 'user not found'))
  
      next()
    })
}