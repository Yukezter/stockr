const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { signUpValidation, signInValidation } = require('../validation')

module.exports = {
  getUser: async (req, res, next) => {

    res.json({ 200: 'Users!' })
  },
  signUp: async (req, res, next) => {

    // Validation
    const { error } = signUpValidation(req.body)
    if (error) return res.status(400).send(error)

    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const { password } = req.body

    // Query the database for a user
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

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword })
    const savedUser = await newUser.save()
    res.send(savedUser)

  },
  signIn: async (req, res, next) => {

    // Validation
    const { error } = signInValidation(req.body)
    if (error) return res.status(400).send(error)

    const usernameOrEmail = req.body.usernameOrEmail.toLowerCase()
    const { password } = req.body

    // Query the database for a user
    const user = await User.findOne({ 
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    })

    // Check if user exists
    if (!user) return res.status(400).send('No user was found.')

    // Check if passwords match
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) return res.status(400).send('Invalid credentials.')

    // Create token
    const token = jwt.sign({
      iss: 'Stockr',
      sub: user._id,
      iat: new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + (60 * 5)
    }, process.env.TOKEN_SECRET)

    res.header('Authorization', `Bearer ${token}`).send(token)

  },
}