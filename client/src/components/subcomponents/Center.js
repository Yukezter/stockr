import React from 'react'
import { 
  Box,
} from '@material-ui/core'

const Center = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top={0} right={0} bottom={0} left={0}
    >
      {props.children}
    </Box>
  )
}

export default Center