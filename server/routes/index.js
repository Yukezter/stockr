const router = require('express-promise-router')()

const IndexController = require('../controllers')

router
  .route('/')
  .get(IndexController.getHome)

module.exports = router