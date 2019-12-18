import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Row from './Row'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
})

const WatchlistView = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">P/E Ratio</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.watchlist.map((ticker, index) => (
              <Row
                ticker={ticker}
                removeStock={props.removeStock}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default WatchlistView