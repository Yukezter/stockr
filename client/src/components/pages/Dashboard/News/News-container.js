import React from 'react'

import NewsView from './News-view'
import API from '../../../../api'

class NewsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { news: [] }
  }

  componentDidMount() {
    API.getNews()
      .then(res => this.setState({ news: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <NewsView news={this.state.news} />
    )
  }

}

export default NewsContainer