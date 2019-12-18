const router = require('express-promise-router')()

const DashboardController = require('../controllers/dashboard')

router
  .route('/user')
  .get(DashboardController.getUser)

router
  .route('/stock/:symbol')
  .get(DashboardController.getUser)

router
  .route('/news')
  .get(DashboardController.news)

router
  .route('/watchlist')
  .get(DashboardController.watchlist)

router
  .route('/watchlist/add/:ticker')
  .post(DashboardController.addToWatchlist)

router
  .route('/watchlist/remove/:ticker')
  .post(DashboardController.removeFromWatchlist)

router
  .route('/search/:fragment')
  .get(DashboardController.search)

router
  .route('/resend-email-verification')
  .get(DashboardController.resendEmailVerification)

module.exports = router