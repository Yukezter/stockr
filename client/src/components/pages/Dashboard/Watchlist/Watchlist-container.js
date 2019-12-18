import React from 'react'

import WatchlistView from './Watchlist-view'
import API from '../../../../api'

class WatchlistContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      watchlist: [],
      intervalId: null
    }
  }

  componentDidMount() {
    this.loadWatchlist()
    this.setState({ intervalId: setInterval(this.props.loadWatchlist, 10000) })
}

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  loadWatchlist = () => {
    API.getWatchlist()
      .then(res => this.setState({ watchlist: res.data }))
      .catch(err => console.log(err))
  }

  addStock = (symbol) => {
    API.addToWatchlist(symbol)
      .then(res => this.setState({ 
        watchlist: [res.data, ...this.state.watchlist]
      }))
  }

  removeStock = (symbol) => () => {
    API.removeFromWatchlist(symbol)
      .then(res => this.setState({
          watchlist: this.state.watchlist.filter(stock => stock.symbol !== symbol)
      }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <WatchlistView
        watchlist={this.state.watchlist}
        removeStock={this.removeStock}
      />
    )
  }
}

export default WatchlistContainer