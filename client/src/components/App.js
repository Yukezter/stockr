import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import PrivateRoute from './PrivateRoute'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NoMatch from './pages/NoMatch'

import { Header } from './subcomponents'

const defaultTheme = createMuiTheme({
  palette: {
    text: {
      primary: '#f8f8ff'
    },
    background: {
      default: '#07090b'
    },
    common: {
      black: '#07090b',
      white: '#f8f8ff'
    },
    primary: {
      main: '#ccaf65',
    },
    secondary: {
      main: '#30415b',
    }
  },
  typography: {
    fontFamily: '"Tomorrow", sans-serif',
  },
})

const { palette } = defaultTheme

let theme = {
  ...defaultTheme,
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiIconButton: {
      disableFocusRipple: true,
    },
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: palette.common.black,
        color: palette.common.white,
      }
    },
    MuiListItemIcon: {
      root: {
        color: palette.common.black,
      }
    },
    MuiListItemText: {
      root: {
        color: palette.common.black,
      }
    },
    MuiIconButton: {
      root: {
        '&:hover, &:focus': {
          background: 'none',
        },
      },
    },
    MuiTable: {
      root: {
        background: palette.common.black
      }
    },
    MuiTextField: {
      root: {
        marginTop: 4,
        marginBottom: 4,
        '& label': {
          color: palette.common.white,
        },
        '& label.Mui-focused': {
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: palette.common.white,
        },
        '& .MuiInput-underline:hover:before': {
          borderBottomColor: palette.primary.main,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: palette.primary.main,
        },
      }
    },
  },
}

theme = responsiveFontSizes(theme)

const publicRoutes = [
  {
    path: '/',
    component: Landing,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    component: NoMatch,
  },
]

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <PrivateRoute path={'/dashboard'} component={Dashboard} />
            <Route path={'/'}>
              <Header/>
              <Switch>
                {publicRoutes.map((routeProps, key) => (
                  <Route {...routeProps} key={key} />
                ))}
              </Switch>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

export default App