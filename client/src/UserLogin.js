import React, {Component} from 'react';
import './style.css';
import UserList from './UserList';
import axios from 'axios';

class UserLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email:'',
			password:'',
			error:''
		}
		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleChangePass = this.handleChangePass.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
	}
	
	handleError () {
		this.props.handleError(this.state.error);
	}

	handleLogIn(event) {
		event.preventDefault();
		//console.log(this.state);
		axios({
		  method: 'post',
		  url: '/signup',
		  data: {
		    email: this.state.email,
		    password: this.state.password
		  }
		}).then (res => {
			console.log(res.data.content);
			this.setState({email:'',password:''});
			//this.setUserID(res.data.content.toString());
			window.location = '/';
		  //return res;
		}).catch (err =>{
			//console.log(err.response.data);
			this.setState({password:'', error:err.response.data.error});
			this.handleError();
		});
		
	}
	
	handleChangePass (event) {
		this.setState({password: event.target.value});
	}
	handleChangeEmail (event) {
		this.setState({email: event.target.value});
	}
	
	render () {
		return (
			<div>
				<form  onSubmit={this.handleLogIn}>
				  <div className="form-group">
				    <label htmlFor="email">Username</label>
				    <input required value={this.state.email} onChange={this.handleChangeEmail} type="text" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter username"></input>
				  </div>
				  <div className="form-group">
				    <label htmlFor="password">Password</label>
				    <input required value={this.state.password} onChange={this.handleChangePass} type="password" className="form-control" name="password" id="password" placeholder="Password"></input>
				  </div>
				  <button type="submit" className="btn">Log In</button><br></br>	
				  <small> New accounts will be signed up automatically. </small>
				</form>
				<p className="mt-4">Or log in with one of the below services:</p>
				{/*<a href={this.props.app_url+"/auth/facebook/"} target="">*/}
				<a href='#' target="">
					<button disabled className="btn">
				  	<i className="fa fa-facebook" aria-hidden="true"></i>
					</button>
				</a>
				<a href={this.props.app_url+"/auth/github/"} target="">
					<button className="ml-2 btn">
				  	<i className="fa fa-github" aria-hidden="true"></i>
					</button>
				</a>
			</div>
		);
		
	}
	
}


export default UserLogin;