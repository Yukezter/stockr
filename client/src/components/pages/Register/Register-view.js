import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, Box } from '@material-ui/core'

import { Center } from '../../subcomponents'

const useStyles = makeStyles(theme => ({
  form: {
    paddingTop: `${theme.spacing(2)}px`,
    paddingBottom: `${theme.spacing(2)}px`,
  },
}))

export default (props) => {
  const classes = useStyles()
  return (
    <Center>
      <Box>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          align="left"
        >
          Register
        </Typography>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField
            id="standard-basic"
            label="Username"
            name="username"
            value={props.username}
            onChange={props.handleChange}
          />
          <br/>
          <TextField
            id="standard-basic"
            label="Email"
            name="email"
            value={props.email}
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
          <Box my={3}>
            <Button
              variant="outlined"
              color="primary"
              onClick={props.handleClick}
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Center>
  )
}