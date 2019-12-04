import React from 'react'

import LoginView from './Login-view'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usernameOrEmail: '',
      password: '',
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleButtonClick = () => {
    this.props.login(this.state)
  }

  render() {
    return (
      <LoginView 
        usernameOrEmail={this.state.usernameOrEmail}
        password={this.state.password}
        handleChange={this.handleChange}
        handleClick={this.handleButtonClick}
      />
    )
  }
}

export default LoginContainer