/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/
import React, { Component } from 'react';
import './style.css';
import axios from 'axios';


class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curPass: '',
      newPass: '',
      newPassVerify: ''
    }
  }

  handleChangeCurPass = (event) => {
    this.setState({ curPass: event.target.value });
  }
  handleChangeNewPass = (event) => {
    this.setState({ newPass: event.target.value });
  }
  handleChangeNewPassVerify = (event) => {
    this.setState({ newPassVerify: event.target.value });
  }

  handleSavePass = (event) => {
    event.preventDefault();
    //console.log(this.state);
    if (this.state.newPass !== this.state.newPassVerify) {
      this.props.handleError("New passwords don't match!!");
    } else {

      axios({
        method: 'post',
        url: `/api/${this.props.userID}/changePass`,
        data: {
          curPass: this.state.curPass,
          newPass: this.state.newPass
        }
      }).then(res => {
        //console.log(res.data);
        this.setState({ curPass: '', newPass: '', newPassVerify: '' });
        this.props.showPassForm();
        this.props.handleError("Password Changed!");
        //window.location = '/';
        //return res;
      }).catch(err => {
        //console.log(err.response.data);
        this.setState({ curPass: '', newPass: '', newPassVerify: '' });
        this.props.handleError(err.response.data.error);
      });

    }

  }
  render() {
    return (
      <form className="ml-3 mr-3" onSubmit={this.handleSavePass}>
        <div className="form-group">
          <label htmlFor="curPass">Current Password</label>
          <input required value={this.state.curPass} onChange={this.handleChangeCurPass} type="password" className="form-control" name="curPass" id="curPass" placeholder="Enter Current Password"></input>
        </div>
        <div className="form-group">
          <label htmlFor="newPass">New Password</label>
          <input required value={this.state.newPass} onChange={this.handleChangeNewPass} type="password" className="form-control" name="newPass" id="newPass" placeholder="Enter New Password"></input>
        </div>
        <div className="form-group">
          <label htmlFor="newPassVerify">Confirm New Password</label>
          <input required value={this.state.newPassVerify} onChange={this.handleChangeNewPassVerify} type="password" className="form-control" name="newPassVerify" id="newPassVerify" placeholder="Enter New Password Again"></input>
        </div>
        <button type="submit" className="btn mb-2">Save</button><br></br>
      </form>
    )
  }
}

export default PasswordForm;