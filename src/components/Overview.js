import React, { Component } from 'react';


class Overview extends Component {
  render() {
    let { date } = this.props.params;

    return (
      <div>
        <h2>Overview</h2>
      </div>
    );
  }
}

export default Overview;
