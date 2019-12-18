import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(0.8)}px ${theme.spacing(1.2)}px`,
    margin: `${theme.spacing(0.8)}px ${theme.spacing(1)}px`,
  },
  largeButton: {
    ...theme.typography.h6,
    padding: `${theme.spacing(1)}px ${theme.spacing(1.4)}px`,
  },
}))

const ButtonLink = (props) => {
  const classes = useStyles()
  return (
    <Link
      to={props.to}
      className={clsx(
          classes.link,
          props.button
          ? classes.button
          : props.largeButton && `${classes.button} ${classes.largeButton}`,
        )}
    >
      {props.children}
    </Link>
  )
}

export default ButtonLink