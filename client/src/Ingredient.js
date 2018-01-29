
import React, {Component} from 'react';
//import scrollToComponent from 'react-scroll-to-component';
import './style.css';
//import axios from 'axios';


class Ingredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing:false,
			editedTitle:this.props.ing.title,
			editedQty:this.props.ing.qty,
			editedUnit:this.props.ing.unit
		};
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);

		this.handleEditIngTitle = this.handleEditIngTitle.bind(this);
		this.handleEditIngQty = this.handleEditIngQty.bind(this);
		this.handleEditIngUnit = this.handleEditIngUnit.bind(this);

		this.handleClickSaveEdit = this.handleClickSaveEdit.bind(this);
	}
	//editing of ingredients
	handleEditIngTitle (event){
		this.setState({
	 		editedTitle:event.target.value
		});
	}
	handleEditIngQty (event){
		this.setState({
	 		editedQty:event.target.value
		});
	}
	handleEditIngUnit (event){
		this.setState({
	 		editedUnit:event.target.value
		});
	}
	deleteIngredient() {
		this.props.delIng(this.props.parentId, this.props.id);
	}
	handleClickEdit() {
		this.setState({
			editing:!this.state.editing
		});
	}
	handleClickSaveEdit() {
		var updatedIngredient = {_id:this.props.ing._id,title:this.state.editedTitle, qty:this.state.editedQty, unit:this.state.editedUnit}
		//console.log(this.props.ing);
		//console.log(updatedIngredient);
		this.props.saveEdit(this.props.parentId, this.props.id, updatedIngredient);
		this.handleClickEdit();
	}
	render () {
		return (
			<span>
			{!this.state.editing ? (
				this.props.pageCtrl===0 ? (
					<tr>
						<td style={{width:'60%'}}>{this.props.ing.title}</td>
						<td style={{width:'15%'}}>{this.props.ing.qty}</td>
						<td style={{width:'15%'}}>{this.props.ing.unit}</td>
						<td style={{width:'5%'}}><button className="btn" onClick={this.handleClickEdit}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
						<td style={{width:'5%'}}><button className="btn btn-danger" onClick={this.deleteIngredient}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
					</tr>
				) : (
					<tr>
						<td style={{width:'60%'}}>{this.props.ing.title}</td>
						<td style={{width:'15%'}}>{this.props.ing.qty}</td>
						<td style={{width:'15%'}}>{this.props.ing.unit}</td>
						<td style={{width:'5%'}}><button style={{opacity:0}}></button></td>
						<td style={{width:'5%'}}><button style={{opacity:0}}></button></td>
					</tr>
				)
			) : (
				<tr>
					<td style={{width:'60%'}}><input autoFocus onChange={this.handleEditIngTitle} type="text" className="form-control" placeholder={this.props.ing.title}></input></td>
					<td style={{width:'15%'}}><input onChange={this.handleEditIngQty} type="number" step="0.01" className="form-control"  placeholder={this.props.ing.qty}></input></td>
					<td style={{width:'15%'}}><input onChange={this.handleEditIngUnit} type="text" className="form-control"  placeholder={this.props.ing.unit}></input></td>
					<td style={{width:'5%'}}><button onClick={this.handleClickSaveEdit} className="btn btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i></button></td>
					<td style={{width:'5%'}}><button className="btn btn-danger" onClick={this.deleteIngredient}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
				</tr>
			)}
			</span>
			
		);
	}
}


export default Ingredient;