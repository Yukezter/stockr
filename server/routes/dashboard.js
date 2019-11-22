const router = require('express-promise-router')()

const DashboardController = require('../controllers/dashboard')

router
  .route('/')
  .get(DashboardController.getDashboard)

module.exports = router