const jwt = require('jsonwebtoken')

module.exports = {
  sign: userId => {
    return jwt.sign({
      iss: 'Stockr',
      sub: userId,
      iat: new Date().getTime(),
      // exp: Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutes
    }, process.env.TOKEN_SECRET)
  },
  verify: (token, cb) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => cb(err, decoded))
  }
}