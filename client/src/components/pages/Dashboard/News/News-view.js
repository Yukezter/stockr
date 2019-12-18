import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  item: {
    margin: '10px auto',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
    minHeight: 200,
  },
  image: {
    width: '100%',
    // maxWidth: 600,
    margin: '0 auto',
    display: 'block',
  }
}))

const NewsView = (props) => {
  const classes = useStyles()
  return (
    <Grid container style={{ padding: 10 }}>
      {props.news.map((piece) => (
          <React.Fragment key={piece.headline}>
            <Grid item xs={12} md={5} lg={3} className={classes.item}
              style={{
                background: `url("${piece.image}") center center`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* <img
                src={piece.image}
                alt={piece.headline}
                className={classes.image}
              />
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                // align="left"
              >
                {piece.headline}
              </Typography>
              <h4>{piece.source}</h4>
              <p>{piece.summary}</p> */}
            </Grid>
            <Grid item xs={12} md={7} lg={9} className={classes.item}>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
              >
                {piece.headline}
              </Typography>
              <h4>{piece.source}</h4>
              <p>{piece.summary}</p>
            </Grid>
          </React.Fragment>
        ))}
    </Grid>
    )
}

export default NewsView