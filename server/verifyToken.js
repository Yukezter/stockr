const jwt = require('jsonwebtoken')
const User = require('./models/User')
const { ApplicationError } = require('./ApplicationError')

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return next(new ApplicationError(401, 'access denied'))

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET)

    if (Date.now() >= verified.exp * 1000) {
      return next(new ApplicationError(401, 'expired token'))
    }

    req.user = await User.findById(verified.sub)
    if (!req.user) next(new ApplicationError(404, 'user not found'))
    
    next()
  } catch (error) {
    next(new ApplicationError(401, 'invalid token'))
  }
}