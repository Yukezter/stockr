import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Toolbar,
  Grid,
  Typography,
} from '@material-ui/core'

import { Link } from './'


const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
}))

const Header = (props) => {
  const classes = useStyles()
  return (
    <Box
      position="fixed"
      top={0} right={0} left={0}
      zIndex={1}
    >
      <Grid container>
        <Grid item xs={10} style={{ margin: '0 auto' }}>
          <Toolbar
            disableGutters
            className={classes.toolbar}
          >
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
            >
              <Link to='/'>
                Stockr
              </Link>
            </Typography>
            <Box>
              <Link button
                to="/login"
              >
                Login
              </Link>
              <Link button
                to="/register"
              >
                Sign Up
              </Link>
            </Box>
          </Toolbar>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header