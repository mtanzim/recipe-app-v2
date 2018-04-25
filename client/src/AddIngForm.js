
import React, { Component } from 'react';
//import scrollToComponent from 'react-scroll-to-component';
import './style.css';
//import axios from 'axios';

class AddIngForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form action='#'>
        <div className="form-row">
          <div className="form-group col-12">
            <input required autoFocus onChange={this.props.handleIngTitle} type="text" className="form-control" id="ingName" placeholder="Ingredient Name"></input>
          </div>
          <div className="form-group col">
            <input required onChange={this.props.handleIngQty} type="number" step="0.01" className="form-control" id="qty" placeholder="Qty"></input>
          </div>
          <div className="form-group col">
            <input onChange={this.props.handleIngUnit} type="text" className="form-control" id="unit" placeholder="Unit"></input>
          </div>
        </div>
      </form>
    );
  }
}

export default AddIngForm;