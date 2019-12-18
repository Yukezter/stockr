const axios = require('axios')

const callEndpoint = (endpoint, queryParams) => {
  const iexToken = process.env.IEX_CLOUD_API
  const params = (queryParams ? `?${queryParams}&` : `?`) + `token=${iexToken}`
  return axios.get(`https://cloud.iexapis.com/stable${endpoint}${params}`)
}

module.exports = {
  symbols: () => {
    return callEndpoint('/ref-data/symbols')
  },
  news: () => {
    return callEndpoint('/stock/market/news')
  },
  search: (fragment) => {
    return callEndpoint(`/search/${fragment}`)
  },
  batch: (types, symbols) => {
    return callEndpoint(
      `/stock/market/batch`, 
      `types=${types.join(',')}&symbols=${symbols.join(',')}&filter=symbol,companyName,latestPrice,change,marketCap,peRatio`
    )
  },
}