const crypto = require('crypto')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const Token = require('../models/Token')

const { sendGrid } = require('../util')

module.exports = {
  getDashboard: async (req, res, next) => {

    if (!req.user.active) return res.send('Email verification needed!')
    
    res.json(req.user)
  },
  resendEmailVerification: async (req, res, next) => {

    if (req.user.active) return res.status(401).send('Account already activated')

    // Delete any existing tokens associated with this user
    await Token.deleteOne({ userId: req.user._id })

    // Generate random token
    let token = crypto.randomBytes(48).toString('hex')

    // Create and save a new token to the database
    const newToken = new Token({ token, userId: req.user._id })
    const savedToken = await newToken.save()

    // Email the user the confirmation link
    // sendGrid.emailVerficationLink(req.user.email, savedToken.token)
    sendGrid.emailVerficationLink('ananonymouspuffin@gmail.com', savedToken.token)

    res.send(savedToken)

  },
}