const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../models/User')
const Token = require('../models/Token')

const { formValidation } = require('../util')
const { sendGrid } = require('../util')

const signJWT = userId => {
  return jwt.sign({
    iss: 'Stockr',
    sub: userId,
    iat: new Date().getTime(),
    // 5 minute expiration
    exp: Math.floor(Date.now() / 1000) + (60 * 5)
  }, process.env.TOKEN_SECRET)
}

module.exports = {
  signUp: async (req, res, next) => {

    // Validation
    const { error } = formValidation.signUpValidation(req.body)
    if (error) return res.status(400).send(error)

    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const { password } = req.body

    // Query the database for user
    const user = await User.findOne({ 
      $or: [{ username }, { email }]
    })

    // Check if user exists
    if (user) {
      const field = username === user.username ? 'Username' : 'Email'
      return res.status(400).send(`${field} is taken.`)
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create and save a new user to the database
    const newUser = new User({ username, email, password: hashedPassword })
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

    // Validation
    const { error } = formValidation.signInValidation(req.body)
    if (error) return res.status(400).send(error)

    const usernameOrEmail = req.body.usernameOrEmail.toLowerCase()
    const { password } = req.body

    // Query the database for user
    const user = await User.findOne({ 
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    })

    // Check if user does not exist
    if (!user) return res.status(400).send('No user was found.')

    // Check if passwords match
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) return res.status(400).send('Invalid credentials.')

    // Create JWT token
    const jwtToken = signJWT(user._id)

    res.header('Authorization', `Bearer ${jwtToken}`).send(jwtToken)

  },
  emailVerification: async (req, res, next) => {

    const { token } = req.query

    await Token.findOneAndDelete({ token }, async (err, doc) => {

      if (err) return res.status(500).send(err)

      if (!doc) return res.status(404).send('Token not found')

      const user = await User.findById(doc.userId)
      if (!user) return res.status(404).send('User not found')

      user.active = true
      await user.save()

      res.send(user)

    })
  }, 
}