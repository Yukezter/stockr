import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@material-ui/core'

const DashboardView = (props) => {
  return (
    <React.Fragment>
      <Link to={'/'}>Home</Link>
      <p>Hello, {props.username}</p>
      <Button variant="contained" onClick={props.handleClick}>Logout</Button>
    </React.Fragment>
  )
}

export default DashboardView