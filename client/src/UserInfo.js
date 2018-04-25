import React, { Component } from 'react';
import './style.css';


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className='row'><div className='col-sm-6'>

          <h5>
            <i className={this.props.loginIcon} aria-hidden="true"></i>
            <a href={this.props.app_url + "/logout"}>
              <button className="ml-2 btn btn-danger">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </button>
            </a>
          </h5>
          <h5>
            {this.props.userObj}
          </h5>
        </div></div>
      </div>
    );
  }
}

export default UserInfo;