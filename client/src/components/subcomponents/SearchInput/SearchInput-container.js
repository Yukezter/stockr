import React from 'react'
import _ from 'underscore'

import { TextField, CircularProgress } from '@material-ui/core'

import SearchInputView from './SearchInput-view'
import API from '../../../api'

class SearchInputContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      open: false,
      fragment: '',
      results: [],
    }
  }

  // Debouce this action with 1 second postponement
  debouceSearch = _.debounce((fragment) => {
    API.search(fragment)
      .then(res => this.setState({ loading: false, results: res.data }))
      .catch(err => console.log(err))
  }, 1000)

  handleOnInputChange = (e, value) => {
    this.setState({
      loading: true,
      fragment: value,
    }, () => {
      if (!this.state.fragment) {
        this.debouceSearch.cancel()
        this.setState({ loading: false, open: false, results: [] })
      } else this.debouceSearch(this.state.fragment)
    })
  }

  render() {
    return (
      <SearchInputView
        style={{ width: 300 }}
        open={this.state.open}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
        onInputChange={this.handleOnInputChange}
        getOptionSelected={(option, value) => option.symbol === value.symbol}
        getOptionLabel={option => option.symbol}
        options={this.state.results}
        noOptionsText="No stocks"
        loading={this.state.loading}
        renderInput={params => (
          <TextField
            {...params}
            label="Search"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.state.loading 
                    ? <CircularProgress color="inherit" size={20} /> 
                    : null}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    )
  }
}

export default SearchInputContainer
