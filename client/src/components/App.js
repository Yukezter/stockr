import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NoMatch from './pages/NoMatch'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path={'/dashboard'} component={Dashboard} />
          <Route path={'/'}>
            <Switch>
              <Route exact path={'/'} component={Landing} />
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/register'} component={Register} />
              <Route component={NoMatch} />
            </Switch>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App