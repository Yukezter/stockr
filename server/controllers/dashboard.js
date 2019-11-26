const axios = require('axios')

const callEndpoint = (endpoint, queryParams) => {
  const token = process.env.IEX_CLOUD_API
  const params = (queryParams ? `?${queryParams}&` : `?`) + `token=${token}`
  const url = `https://cloud.iexapis.com/stable${endpoint}${params}`
  console.log(url)
  return axios.get(url)
}

module.exports = {
  symbols: async (req, res, next) => {
    const data = await callEndpoint('/ref-data/iex/symbols')
    res.json(data.data)
  },
  search: async (req, res, next) => {
    const fragment = req.params.fragment
    const data = await callEndpoint(`/search/${fragment}`)
    res.json(data.data)
  },
  batch: async (req, res, next) => {
    const symbol = req.params.symbol
    const data = await callEndpoint(
      `/stock/${symbol}/batch`, 'types=quote,chart&range=1d'
    )
    res.json(data.data)
  },
  resendEmailVerification: async (req, res, next) => {
    await req.user.sendVerificationEmail('ananonymouspuffin@gmail.com')
    res.send('email has been resent')
  },
}