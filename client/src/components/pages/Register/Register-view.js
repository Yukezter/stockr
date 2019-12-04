import React from 'react'

import { TextField, Button } from '@material-ui/core'

export default (props) => {
  return (
    <form noValidate autoComplete="off">
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
      <Button variant="contained" onClick={props.handleClick}>Sign Up</Button>
    </form>
  )
}