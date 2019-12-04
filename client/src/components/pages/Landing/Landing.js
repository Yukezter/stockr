import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <React.Fragment>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Sign Up</Link>
    </React.Fragment>
  )
}

export default Landing