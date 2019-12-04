const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
  emailVerficationLink: (email, token) => {
    const href = `${process.env.URL_HOST}/users/email-verification?token=${token}`
    sgMail.send({
      to: email,
      from: 'stockr@example.com',
      subject: 'Email verification link',
      text: 'Click this link to complete your sign up process:',
      html: `<strong><a href="${href}" target="_blank">Stockr</a></strong>`,
    })
  }
}