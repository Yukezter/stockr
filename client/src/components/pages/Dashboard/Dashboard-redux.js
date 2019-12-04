import React from 'react'
import { connect } from 'react-redux'

import DashboardContainer from './Dashboard-container'

import { loadUser, resetAuth, logout } from '../../../actions/authActions'

class DashboardRedux extends React.Component {

  componentDidMount() {
    this.props.loadUser()
  }

  componentWillUnmount() {
    this.props.resetAuth()
  }

  render() {

    if (this.props.loading) {
      return (
        <h1>Loading...</h1>
      )
    }
    
    return (
      <DashboardContainer
        username={this.props.username}
        logout={this.props.logout}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    username: state.auth.username,
  }
}

const mapActionsToProps = {
  loadUser,
  resetAuth,
  logout,
}

export default connect(mapStateToProps, mapActionsToProps)(DashboardRedux)