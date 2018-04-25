
import React, { Component } from 'react';
import './style.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  getRecipes = () => {
    this.props.getRecipes(this.props.id);
  }

  render() {
    return (
      <a href="#" className="dropdown-item" onClick={this.getRecipes}>{this.props.display}</a>
    )
  }


}

export default UserList;