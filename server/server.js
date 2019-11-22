require('dotenv').config({ path: `${__dirname}/.env` })
const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const verifyToken = require('./verifyToken')

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

// Routes
app.use('/', require('./routes'))
app.use('/users', require('./routes/users'))
// Protected routes
app.use('/dashboard', verifyToken, require('./routes/dashboard'))

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL, 
  { 
    useNewUrlParser: true,
    autoIndex: false,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
)

// Start server
app.listen(PORT, console.log(`Server listening on port ${PORT}`))