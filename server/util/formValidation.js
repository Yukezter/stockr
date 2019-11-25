const Joi = require('@hapi/joi')

module.exports = {
  signUpValidation: data => {
    const schema = Joi.object({
      username: Joi.string().max(40).required(),
      email: Joi.string().max(256).required().email(),
      password: Joi.string().min(8).max(40),
    })
    return schema.validate(data)
  },
  signInValidation: data => {
    const schema = Joi.object({
      usernameOrEmail: Joi.string().max(256).required(),
      password: Joi.string().min(8).max(40),
    })
    return schema.validate(data)
  },
}