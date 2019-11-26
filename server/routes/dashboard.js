const router = require('express-promise-router')()

const DashboardController = require('../controllers/dashboard')

router
  .route('/symbols')
  .get(DashboardController.symbols)

router
  .route('/search/:fragment')
  .get(DashboardController.search)

router
  .route('/batch/:symbol')
  .get(DashboardController.batch)

router
  .route('/resendEmailVerification')
  .get(DashboardController.resendEmailVerification)

module.exports = router