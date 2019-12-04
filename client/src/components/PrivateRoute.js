import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends React.Component {

  render() {

    const { path, component: Component, location, token } = this.props
    console.log('Token: ', this.props.token)

    return (
      <Route 
        path={path}
        render={props => (
          token
            ? <Component {...props} />
            : <Redirect to={{
                pathname: "/login",
                state: { from: location }
              }} />
        )}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(PrivateRoute)