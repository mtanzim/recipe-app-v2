import React, {Component} from 'react';
import './style.css';

class ErrorMessage extends React.Component {
	constructor(props) {
		super(props);
	}
	
	
	componentDidMount() {
		//console.log('Error initiated');
		//scrollToComponent(this.refs.ErrDiv);
	}
	componentDidUpdate() {
		//console.log('Error updated');
		//if(this.props.isEdititing===false){
			//scrollToComponent(this.refs.ErrDiv);
		//}
	}
	
	render () {
		return (
			<div ref="ErrDiv" className="alert alert-danger mt-4 fixed-bottom">{this.props.errMsg}</div>
		)
	}
}

export default ErrorMessage;