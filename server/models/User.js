const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const { ApplicationError } = require('../ApplicationError') 

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  active: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

UserSchema.pre('save', async function(next) {
  try {
    // Only hash password if it's been modified or is new
    if (!this.isModified('password')) return next()

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(this.password, salt)

    // Override clear text password with hashed one
    this.password = hashed
    next()
  } catch (err) {
    next(new ApplicationError(500, err.message))
  }
})

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (err) {
    next(new ApplicationError(500, error.message))
  }
}

module.exports = User = mongoose.model('User', UserSchema)