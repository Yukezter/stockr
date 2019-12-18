import React from 'react'
import { TableCell, TableRow, Button } from '@material-ui/core'

class Row extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.ticker.latestPrice !== nextProps.ticker.latestPrice
  }

  render() {
    console.log('rendered')
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {this.props.ticker.companyName}
        </TableCell>
        <TableCell align="right">{this.props.ticker.latestPrice}</TableCell>
        <TableCell align="right">{this.props.ticker.change}</TableCell>
        <TableCell align="right">{this.props.ticker.marketCap}</TableCell>
        <TableCell align="right">{this.props.ticker.peRatio}</TableCell>
        <TableCell align="right">P/E Ratio</TableCell>
        <TableCell align="right">
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.removeStock(this.props.ticker.symbol)}
          >
            X
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default Row