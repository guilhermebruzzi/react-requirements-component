import React, { Component } from 'react';

class Requirements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    };
  }
  render() {
    return (
      <div>
        <span>Done?</span>
        {this.props.children}
      </div>
    );
  }
}

export default Requirements;
