import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Typography,
} from '@material-ui/core'

import { Center, Link } from '../../subcomponents'
import backgroundImage from '../../../assets/images/tim-trad-p2SMKBZ0mtM-unsplash.jpg'

const useStyles = makeStyles(theme => ({
  wrapper: {
    background: `linear-gradient(
                    rgba(10, 14, 17, 0.45),
                    rgba(10, 14, 17, 0.45)
                  ), url("${backgroundImage}") center center`,
    backgroundSize: 'cover',
  },
  gold: { color: theme.palette.primary.main },
}))

const Landing = (props) => {
  const classes = useStyles()
  return (
    <Box
      position="fixed"
      top={0} right={0} bottom={0} left={0}
      className={classes.wrapper}
    >
      <Center>
        <Box>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            align="left"
            noWrap
          >
            Invest. Watch. <span className={classes.gold}>Celebrate</span>.
          </Typography>
          <Typography
            component="h3"
            variant="h5"
            color="inherit"
            align="left"
            noWrap
          >
            Join and have access to real time stock data.
          </Typography>
          <Box display="block" textAlign="center" my={3}>
            <Link
              largeButton
              to="/register"
            >
              Get started
            </Link>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}

export default Landing