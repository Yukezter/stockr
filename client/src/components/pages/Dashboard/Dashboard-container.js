import React from 'react'

import DashboardView from './Dashboard-view'

class DashboardContainer extends React.Component {

  handleClick = () => {
    this.props.logout()
  }

  render() {
    return (
      <DashboardView
        username={this.props.username}
        handleClick={this.handleClick}
      />
    )
  }
}

export default DashboardContainer