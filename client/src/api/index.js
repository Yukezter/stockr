import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'

export default {
  getUser: () => {
    return axios.get('/dashboard/user')
  },
  getStock: (symbol) => {
    return axios.get(`/dashboard/stock/${symbol}`)
  },
  register: (body) => {
    return axios.post('/users/signup', { ...body })
  },
  login: (body) => {
    return axios.post('/users/signin', { ...body })
  },
  getNews: () => {
    return axios.get('/dashboard/news')
  },
  getWatchlist: () => {
    return axios.get('/dashboard/watchlist')
  },
  addToWatchlist: (symbol) => {
    return axios.post(`/dashboard/watchlist/add/${symbol}`, null)
  },
  removeFromWatchlist: (symbol) => {
    return axios.post(`/dashboard/watchlist/remove/${symbol}`, null)
  },
  search: (fragment) => {
    return axios.get(`/dashboard/search/${fragment}`)
  }
}