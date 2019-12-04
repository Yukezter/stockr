const router = require('express-promise-router')()

const UsersController = require('../controllers/users')

router
  .route('/get')
  .get(require('../verifyToken'), UsersController.get)

router
  .route('/signup')
  .post(UsersController.signUp)

router
  .route('/signin')
  .post(UsersController.signIn)

router
  .route('/email-verification')
  .get(UsersController.emailVerification)

module.exports = router