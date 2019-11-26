require('dotenv').config({ path: `${__dirname}/.env` })
const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const verifyToken = require('./verifyToken')

// Database connection
const DB_URI = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL
mongoose.connect(DB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

// Setup server
const app = express()

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

// Routes
app.use('/users', require('./routes/users'))
// Protected
app.use('/dashboard', verifyToken, require('./routes/dashboard'))

// express-promise-router handles all errors thrown inside
// the route handlers and passes them in next()
app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500
  console.log(err.statusCode, err.message)
  res.status(err.statusCode).send(err.message)
})

// Start server
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))