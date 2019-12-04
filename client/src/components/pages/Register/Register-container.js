import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import RegisterView from './Register-view'

import { register } from '../../../actions/authActions'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleButtonClick = () => {
    this.props.register(this.state)
  }

  render() {

    if (this.props.authenticated) return (
      <Redirect to={{
        pathname: "/dashboard",
        state: { from: this.props.location }
      }} />
    )

    return (
      <RegisterView 
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        handleChange={this.handleChange}
        handleClick={this.handleButtonClick}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  }
}

const mapActionsToProps = { register }

export default connect(mapStateToProps, mapActionsToProps)(LoginContainer)