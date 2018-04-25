
import React, { Component } from 'react';
import './style.css';

class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form action='#'>
        <div className="form-row">
          <div className="form-group col">
            <input required autoFocus onChange={this.props.onChange} type="text" className="form-control" id="recipeName" placeholder="Recipe Name"></input>
            <button type="button" onClick={this.props.onSaveButton} className="btn btn-success mt-2"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddRecipeForm;