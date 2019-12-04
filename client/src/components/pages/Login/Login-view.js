import React from 'react'
import { Link } from 'react-router-dom'

import { TextField, Button } from '@material-ui/core'

export default (props) => {
  return (
    <React.Fragment>
      <Link to={'/'}>Stockr</Link>
      <form noValidate autoComplete="off">
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
        <Button variant="contained" onClick={props.handleClick}>Login</Button>
      </form>
      <Link to={'/register'}>Don't have an account? Sign up!</Link>
    </React.Fragment>
    
  )
}