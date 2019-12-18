import React from 'react'
import { connect } from 'react-redux'

import NewsContainer from './News-container'
 
class NewsRedux extends React.Component {

  render() {
    return (
      <NewsContainer
        token={this.props.token}
      />
    )
  }

}

export default connect(state => ({ token: state.auth.token }))(NewsRedux)