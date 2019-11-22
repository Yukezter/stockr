const User = require('../models/User')

module.exports = {
  getDashboard: async (req, res, next) => {

    res.json(req.user)
    
  },
}