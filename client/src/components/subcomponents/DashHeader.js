import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Toolbar,
  Grid,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
}))

const Header = (props) => {
  const classes = useStyles()
  return (
    <Box
      top={0} right={0} left={0}
      zIndex={1}
    >
      <Grid container>
        <Grid item xs={10} style={{ margin: '0 auto' }}>
          <Toolbar
            disableGutters
            className={classes.toolbar}
          >
            {props.children}
          </Toolbar>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header