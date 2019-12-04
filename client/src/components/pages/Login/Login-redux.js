import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginContainer from './Login-container'

import { login } from '../../../actions/authActions'

class LoginRedux extends React.Component {
  render() {
    if (this.props.token) return (
      <Redirect to={{
        pathname: "/dashboard",
        state: { from: this.props.location }
      }} />
    )

    return (
      <LoginContainer
        login={this.props.login}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

const mapActionsToProps = { login }

export default connect(mapStateToProps, mapActionsToProps)(LoginRedux)