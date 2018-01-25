/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/
import React, {Component} from 'react';
import './style.css';
//import axios from 'axios';


class PasswordForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  curPass:'',
		  newPass:'',
		  newPassVerify:''
		}
	}
	
	handleChangeCurPass = (event) => {
		this.setState({curPass: event.target.value});
	}
	handleChangeNewPass = (event) => {
		this.setState({newPass: event.target.value});
	}
	handleChangeNewPassVerify = (event) => {
		this.setState({newPassVerify: event.target.value});
	}	
	
	handleSavePass = (event) => {
	  event.preventDefault();
	  console.log(this.state);
	}
	render () {
		return (
			<form className="ml-3 mr-3" onSubmit={this.handleSavePass}>
			  <div className="form-group">
			    <label htmlFor="curPass">Current Password</label>
			    <input value={this.state.curPass} onChange={this.handleChangeCurPass} type="password" className="form-control" name="curPass" id="curPass" placeholder="Enter Current Password"></input>
			  </div>
			  <div className="form-group">
			    <label htmlFor="newPass">New Password</label>
			    <input value={this.state.newPass} onChange={this.handleChangeNewPass} type="password" className="form-control" name="newPass" id="newPass" placeholder="Enter New Password"></input>
			  </div>
			  <div className="form-group">
			    <label htmlFor="newPassVerify">Confirm New Password</label>
			    <input value={this.state.newPassVerify} onChange={this.handleChangeNewPassVerify} type="password" className="form-control" name="newPassVerify" id="newPassVerify" placeholder="Enter New Password Again"></input>
			  </div>
			  <button type="submit" className="btn mb-2">Save</button><br></br>	
			</form>
		)
	}
}



class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  changePassToggle:false
		}
	}
	componentDidMount () {
	  console.log(this.props.userInfo);
	}
	showPassForm = () => {
	  this.setState ({
	    changePassToggle:!this.state.changePassToggle
	  })
	}
	deleteAccount = () => {
    console.log("OK :(");
	}
	render () {
	  
		return (
		  <div className="row">
        <div className='col-12 col-sm-6'>
          <div className="card">
            <div className="card-header">
              <h3>{this.props.userInfo}</h3>
              <i className={this.props.userIcon} aria-hidden="true"></i>
            </div>
            <div className="card-block">
              <p className="card-text ml-3 mt-2">Total Recipes: {this.props.numRecipes}</p>
              {this.props.loginType==='local' && (<button className="btn ml-3 mb-2" onClick={this.showPassForm}>Change Password</button>)}
              {this.state.changePassToggle && (<PasswordForm/>)}
              <p><button className="btn btn-danger ml-3 mb-2" onClick={this.deleteAccount}>Delete Account</button></p>
            </div>
          </div>
        </div>
      </div>
		)
	}
}
export default UserProfile;


	