const _ = require('underscore')

const API = require('../routes/api')

module.exports = {
  getUser: async (req, res, next) => {
    res.json({
      username: req.user.username,
      email: req.user.email,
    })
  },
  getStock: async (req, res, next) => {
    const stock = await API.batch(['quote', 'news', 'chart'], req.params.symbol)
    console.log(stock)
  },
  news: async (req, res, next) => {
    const data = await API.news()
    res.json(data.data)
  },
  watchlist: async (req, res, next) => {
    // IEX allows a maximum of 100 symbols per "batch" endpoint call
    if (req.user.watchlist.length > 100) {
      Promise.all(
        _.chunk(req.user.watchlist, 100).map((symbols) => API.batch(['quote'], symbols))
      ).then(responses => {
        const nestedWatchlist = responses.map((response) => {
          return Object.values(response.data).map(stock => stock.quote)
        })
        return res.json(_.flatten(nestedWatchlist, true))
      }).catch(err => console.log(err))
    } else {
      const response = await API.batch(['quote'], req.user.watchlist)
      return res.json(Object.values(response.data).map(stock => stock.quote))
    }
  },
  addToWatchlist: async (req, res, next) => {
    req.user.watchlist.push(req.params.ticker)
    await req.user.save()
    res.json(req.user.watchlist)
  },
  removeFromWatchlist: async (req, res, next) => {
    req.user.watchlist.pull(req.params.ticker)
    await req.user.save()
    res.json(req.user.watchlist)
  },
  search: async (req, res, next) => {
    const results = await API.search(req.params.fragment)
    console.log(results.data)
    res.json(results.data)
  },
  resendEmailVerification: async (req, res, next) => {
    // *** CHANGE EMAIL BEFORE PRODUCTION ***
    await req.user.sendVerificationEmail('ananonymouspuffin@gmail.com')
    res.send('email has been resent')
  },
}