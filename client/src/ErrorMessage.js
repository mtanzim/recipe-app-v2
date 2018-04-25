import React, { Component } from 'react';
import './style.css';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div ref="ErrDiv" className="alert alert-danger mt-4 fixed-bottom">{this.props.errMsg}</div>
    )
  }
}

export default ErrorMessage;