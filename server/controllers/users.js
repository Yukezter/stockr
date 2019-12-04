const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Token = require('../models/Token')

const { formValidation } = require('../util')
const { ApplicationError } = require('../ApplicationError')

const signJWT = userId => {
  return jwt.sign({
    iss: 'Stockr',
    sub: userId,
    iat: new Date().getTime(),
    // exp: Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutes
  }, process.env.TOKEN_SECRET)
}

module.exports = {
  get: async (req, res, next) => {
    res.json({
      username: req.user.username,
      email: req.user.email
    })
  },
  signUp: async (req, res, next) => {
    // Form validation
    const { error } = formValidation.signUpValidation(req.body)
    if (error) throw new ApplicationError(400, error.details[0].message)

    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const { password } = req.body

    // Query the database for user
    const user = await User.findOne({ 
      $or: [{ username }, { email }]
    })

    // Make sure user doesn't already exist
    if (user) throw new ApplicationError(409,  'username or email is taken')

    // Create and save a new user to the database
    const newUser = new User({ username, email, password })
    const savedUser = await newUser.save()

    // Email the user the confirmation link
    await savedUser.sendVerificationEmail('ananonymouspuffin@gmail.com')

    // Create JWT token
    const jwtToken = signJWT(savedUser._id)
    res.cookie('jwt', jwtToken).send(jwtToken)
  },
  signIn: async (req, res, next) => {
    // Form validation
    const { error } = formValidation.signInValidation(req.body)
    if (error) throw new ApplicationError(400, error.details[0].message)

    const usernameOrEmail = req.body.usernameOrEmail.toLowerCase()
    const { password } = req.body

    // Query the database for user
    const user = await User.findOne({ 
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    })

    // Check if user does not exist
    if (!user) throw new ApplicationError(404, 'user not found')

    // Check if passwords match
    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new ApplicationError(401, 'invalid password')

    // Create JWT token
    const jwtToken = signJWT(user._id)
    res.cookie('jwt', jwtToken).send(jwtToken)
  },
  emailVerification: async (req, res, next) => {
    const { token } = req.query
    const tokenDoc = await Token.findOneAndDelete({ token })
    if (!tokenDoc) throw new ApplicationError(404, 'token not found')

    const user = await User.findById(tokenDoc.userId)
    if (!user) throw new ApplicationError(404, 'user not found')

    user.active = true
    user.verificationPending = false
    await user.save()

    res.send(user)
  }, 
}