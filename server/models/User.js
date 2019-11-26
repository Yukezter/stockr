const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const { sendGrid }  = require('../util')
const { ApplicationError } = require('../ApplicationError')

const Token = require('../models/Token')

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
  verificationPending: {
    type: Boolean,
    default: false,
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
  // Only hash password if it's been modified or is new
  if (!this.isModified('password')) return next()

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(this.password, salt)

  // Override clear text password with hashed one
  this.password = hashed
  next()
})

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

UserSchema.methods.sendVerificationEmail = async function(email) {
  // Make sure email has not been verified
  if (this.active) {
    throw new ApplicationError(409, 'email already verified')
  }
  // Delete any existing tokens associated with this user
  if (this.verificationPending) await Token.deleteOne({ userId: this._id })

  // Generate random token
  const token = crypto.randomBytes(48).toString('hex')
  // Create and save a new token to the database
  const newToken = new Token({ token, userId: this._id })
  const savedToken = await newToken.save()

  // Send email
  sendGrid.emailVerficationLink(email, savedToken.token)

  // Email verification is now pending
  this.verificationPending = true
  await this.save()
}

module.exports = User = mongoose.model('User', UserSchema)