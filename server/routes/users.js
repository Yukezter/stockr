const router = require('express-promise-router')()

const UsersController = require('../controllers/users')

router
  .route('/')
  .get(UsersController.getUser)

router
  .route('/signup')
  .post(UsersController.signUp)

router
  .route('/signin')
  .post(UsersController.signIn)

module.exports = router