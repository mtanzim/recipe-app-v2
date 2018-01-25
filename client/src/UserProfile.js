/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/
import React, {Component} from 'react';
import './style.css';
//import axios from 'axios';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentDidMount () {
	  console.log(this.props.userInfo);
	}
	render () {
	  
		return (
	    <div className="row">
  			<p>User Profile</p>
  			<p>Number of recipes: {this.props.numRecipes}</p>
			</div>
		)
	}
}
export default UserProfile;


	