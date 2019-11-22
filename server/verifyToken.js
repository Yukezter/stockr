const jwt = require('jsonwebtoken')
const User = require('./models/User')

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).send('Access denied!')

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET)
    req.user = await User.findById(verified.sub)
    if (!req.user) return res.status(400).send('User not found / expired token')
    next()
  } catch (err) {
    res.status(400).send('Invalid token!')
  }
}