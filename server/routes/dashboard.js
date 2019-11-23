const router = require('express-promise-router')()

const DashboardController = require('../controllers/dashboard')

router
  .route('/')
  .get(DashboardController.getDashboard)

router
  .route('/resendEmailVerification')
  .get(DashboardController.resendEmailVerification)

module.exports = router