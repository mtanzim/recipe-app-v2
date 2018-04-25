

import React, { Component } from 'react';
//import scrollToComponent from 'react-scroll-to-component';
import './style.css';
//import axios from 'axios';

import Ingredient from './Ingredient';
import AddIngForm from './AddIngForm';


class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingName: false,
      AddingIng: false,
      editedRecipeName: this.props.title,
      editedIng: this.props.ingredients
      //editRecipeStyleState: {display:'none'},
      //addIngStyleState: {display:'none'}
    };

    this.eachIng = this.eachIng.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.delAllIngredient = this.delAllIngredient.bind(this);
    this.saveEditedName = this.saveEditedName.bind(this);
    this.handleEditRecipeName = this.handleEditRecipeName.bind(this);
    this.handleClickEditRecipe = this.handleClickEditRecipe.bind(this);
    this.handleClickAddIng = this.handleClickAddIng.bind(this);
  }

  eachIng(ing) {
    if (Object.keys(ing).length !== 0) {
      return (
        <Ingredient ing={ing}
          key={ing._id}
          id={ing._id}
          parentId={this.props.id}
          delIng={this.props.delIng}
          handleIngTitle={this.props.handleIngTitle}
          handleIngQty={this.props.handleIngQty}
          handleIngUnit={this.props.handleIngUnit}
          saveEdit={this.props.editIngredient}
          pageCtrl={this.props.pageCtrl} />
      );
    }

  }


  removeRecipe() {
    this.props.remRecipe(this.props.id);
  }

  addIngredient() {
    this.props.addIng(this.props.id);
    this.handleClickAddIng();
  }
  delAllIngredient() {
    this.props.delAllIng(this.props.id);
  }

  saveEditedName() {
    this.props.saveEdit(this.props.id, this.state.editedRecipeName);
    this.handleClickEditRecipe();
  }
  handleEditRecipeName(event) {
    this.setState({
      editedRecipeName: event.target.value
    });
  }

  handleClickEditRecipe() {
    this.setState({
      editingName: !this.state.editingName
    });
  }

  handleClickAddIng() {
    this.setState({
      AddingIng: !this.state.AddingIng
    });
  }

  copyRecipe = () => {
    //console.log(this.props.curRecipe);
    //remove copied recipes ID, so duplicates are allowed (mongoose will auto assign _id)
    //var tempObj = this.props.curRecipe;
    //delete tempObj._id;
    //console.log(tempObj);
    this.props.copyRecipe({ title: this.props.title, ingredients: this.props.ingredients });
  }
  render() {
    //console.log(Object.keys(this.props.ingredients[0]));
    return (
      <div className='col-12 col-sm-6'>
        <div className="card">
          <div className="card-header">
            <h3>{this.props.title}</h3>
            {this.props.pageCtrl === 0 ?
              (<div className="row">
                <button className="ml-2 btn" onClick={this.handleClickEditRecipe} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                <button className="ml-2 btn btn-danger" onClick={this.removeRecipe}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
              </div>
              ) : (

                <div className="row">
                  <button className="ml-2 btn" onClick={this.copyRecipe} ><i className="fa fa-files-o" aria-hidden="true"></i></button>
                </div>

              )
            }
          </div>
          <div className="card-body">
            {this.state.editingName && (<div id="editToggle">
              <form action='#'>
                <div className="form-row">
                  <div className="form-group col">
                    <input autoFocus onChange={this.handleEditRecipeName} type="text" className="form-control" id="recipeEdit" placeholder={this.props.title}></input>
                  </div>
                </div>
              </form>

              <button type="button" className="btn btn-success mb-4" onClick={this.saveEditedName}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
            </div>)}
            <h4>Ingredients</h4>
            {this.props.pageCtrl === 0 && (
              <button className="btn" onClick={this.handleClickAddIng}><i className="fa fa-plus" aria-hidden="true"></i></button>
            )}
            {this.props.pageCtrl === 0 && (
              <button className="ml-2 btn btn-danger" onClick={this.delAllIngredient}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
            )}
            {this.state.AddingIng && (<div className="mt-2">
              <AddIngForm handleIngTitle={this.props.handleIngTitle}
                handleIngQty={this.props.handleIngQty}
                handleIngUnit={this.props.handleIngUnit} />
              <button onClick={this.addIngredient} className="btn btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
            </div>)}
            <div className='mt-4'>
              {this.props.ingredients.map(this.eachIng)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;