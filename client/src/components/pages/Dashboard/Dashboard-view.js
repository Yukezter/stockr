import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'underscore'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreVert from '@material-ui/icons/MoreVert'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import ImportExportIcon from '@material-ui/icons/ImportExport'

import News from './News'
import Watchlist from './Watchlist'
import Search from './Search/Search-container'

import { Link } from '../../subcomponents'

const Idk = () => <p>Idk!</p>

const routes = [
  {
    exact: true,
    path: '/dashboard',
    Component: Idk,
    Icon: Home,
    text: 'Home',
  },
  {
    exact: true,
    path: '/dashboard/news',
    Component: News,
    Icon: DynamicFeedIcon,
    text: 'News',
  },
  {
    exact: true,
    path: '/dashboard/watchlist',
    Component: Watchlist,
    Icon: VisibilityIcon,
    text: 'Watchlist',
  },
  {
    exact: true,
    path: '/dashboard/search',
    Component: Search,
    Icon: SearchIcon,
    text: 'Search',
  },
  {
    exact: true,
    path: '/dashboard/top-movers',
    Component: Idk,
    Icon: ImportExportIcon,
    text: 'Top Movers',
  },
  {
    exact: true,
    path: '/dashboard/settings',
    Component: Idk,
    Icon: SettingsIcon,
    text: 'Settings',
  },
]

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    overflowX: 'hidden',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const ListItems = (props) => (
  props.list.map(({ path, Icon, text }) => (
    <Link to={path} key={text}>
      <ListItem key={text}>
        <ListItemIcon>
          <Icon/>
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  ))
)

export default function PersistentDrawerLeft(props) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = window.innerWidth >= theme.breakpoints.values.sm

  const [open, setOpen] = React.useState(matches ? true : false)

  React.useEffect(() => {
    let flag = true
    const resizeHandler = _.throttle((e) => {
      const matches = e.target.innerWidth >= theme.breakpoints.values.sm
      if (matches && flag) {
        setOpen(true)
        flag = false
      } else if (!matches && !flag) {
        setOpen(false)
        flag = true
      }
    }, 100)
    const resizeListener = window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeListener)
  }, [theme.breakpoints.values.sm])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <AppBar
        color="default"
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box display={{ sm: 'none' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(
                classes.menuButton, open && classes.hide
                )}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            color="primary"
            component="h2"
            variant="h5"
            align="center"
            noWrap
          >
            Dashboard
          </Typography>
          <Box ml="auto" display={{ sm: 'none' }}>
            <IconButton
              color="inherit"
              aria-label="open nav"
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MoreVert />
            </IconButton>
          </Box>
          <Box ml="auto" display={{ xs: 'none', sm: 'initial' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={props.handleClick}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Box mx="auto">
            <Typography
              color="primary"
              component="h2"
              variant="h5"
              align="center"
              noWrap
            >
              <Link to='/'>
                Stockr
              </Link>
            </Typography>
          </Box>
          <Box display={{ sm: 'none' }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </div>
        <Divider />
        <List>
          <ListItems list={routes.slice(0, -1)} />
        </List>
        <Divider />
        <List>
          <ListItems list={[routes[routes.length - 1]]} />
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          {routes.map(({ path, Component, exact }) => (
            <Route exact={exact} path={path} component={Component} key={path} />
          ))}
        </Switch>
      </main>
    </div>
  )
}