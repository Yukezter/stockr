import React from 'react'

import { makeStyles } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  listbox: {
    color: theme.palette.common.white,
  }
}))

const SearchInputView = (props) => {
  const classes = useStyles()
  return (
    <Autocomplete
      classes={{
        paper: classes.paper
      }}
      {...props}
    />
  )
}

export default SearchInputView