const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../models/User')
const Token = require('../models/Token')

const { formValidation } = require('../util')
const { sendGrid } = require('../util')

const { ApplicationError } = require('../ApplicationError')

const signJWT = userId => {
  return jwt.sign({
    iss: 'Stockr',
    sub: userId,
    iat: new Date().getTime(),
    exp: Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutes
  }, process.env.TOKEN_SECRET)
}

module.exports = {
  signUp: async (req, res, next) => {

    // Form validation
    const { error } = formValidation.signUpValidation(req.body)
    if (error) return next(new ApplicationError(400, error.details[0].message))

    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const { password } = req.body

    // Query the database for user
    const user = await User.findOne({ 
      $or: [{ username }, { email }]
    })

    // Make sure user doesn't already exist
    if (user) {
      const field = username === user.username ? 'username' : 'email'
      return next(new ApplicationError(409, `${field} is taken`))
    }

    // Create and save a new user to the database
    const newUser = new User({ username, email, password })
    const savedUser = await newUser.save()

    // Generate random token
    let token = crypto.randomBytes(48).toString('hex')

    // Create and save a new token to the database
    const newToken = new Token({ token, userId: savedUser._id })
    const savedToken = await newToken.save()

    // Email the user the confirmation link
    // sendGrid.emailVerficationLink(email, savedToken.token)
    sendGrid.emailVerficationLink('ananonymouspuffin@gmail.com', savedToken.token)

    // Create JWT token
    const jwtToken = signJWT(savedUser._id)

    res.header('Authorization', `Bearer ${jwtToken}`).json({ jwtToken, savedToken })
  },
  signIn: async (req, res, next) => {

    // Form validation
    const { error } = formValidation.signInValidation(req.body)
    if (error) return next(new ApplicationError(400, error.details[0].message))

    const usernameOrEmail = req.body.usernameOrEmail.toLowerCase()
    const { password } = req.body

    // Query the database for user
    const user = await User.findOne({ 
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    })

    // Check if user does not exist
    if (!user) return next(new ApplicationError(404, 'user not found'))

    // Check if passwords match
    const isMatch = await user.comparePassword(password, next)
    if (!isMatch) return next(new ApplicationError(401, 'invalid password'))

    // Create JWT token
    const jwtToken = signJWT(user._id)

    res.header('Authorization', `Bearer ${jwtToken}`).send(jwtToken)
  },
  emailVerification: async (req, res, next) => {
    const { token } = req.query

    await Token.findOneAndDelete({ token }, async (err, doc) => {
      if (err) next(new ApplicationError(500, err.message))
      if (!doc) next(new ApplicationError(404, 'token not found'))

      const user = await User.findById(doc.userId)
      if (!user) next(new ApplicationError(404, 'user not found'))

      user.active = true
      await user.save()

      res.send(user)
    })
  }, 
}