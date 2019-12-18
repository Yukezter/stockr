import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Box, Typography } from '@material-ui/core'

import { Center, Link } from '../../subcomponents'

const useStyles = makeStyles(theme => ({
  form: {
    paddingTop: `${theme.spacing(2)}px`,
    paddingBottom: `${theme.spacing(2)}px`,
  },
}))

export default (props) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Center>
        <Box>
          <Typography
            component="h1"
            variant="h3"
            color="inherit"
            align="left"
          >
            Login
          </Typography>
          <form noValidate autoComplete="off" className={classes.form}>
            <TextField
              id="standard-basic"
              label="Username or email"
              name="usernameOrEmail"
              value={props.usernameOrEmail}
              onChange={props.handleChange}
            />
            <br/>
            <TextField 
              id="standard-basic"
              label="Password"
              name="password"
              value={props.password}
              onChange={props.handleChange}
            />
            <br/>
            <Box mt={3} mb={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={props.handleClick}
              >
                Login
              </Button>
            </Box>
          </form>
          <Link to={'/register'}>Don't have an account? Sign up!</Link>
        </Box>
      </Center>
    </React.Fragment>
    
  )
}