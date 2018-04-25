/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/
import React, { Component } from 'react';
//import scrollToComponent from 'react-scroll-to-component';
import './style.css';
import axios from 'axios';

import UserProfile from './UserProfile';
import RecipeCard from './RecipeCard';
import UserMenu from './UserMenu';
import ErrorMessage from './ErrorMessage';
import UserLogin from './UserLogin';
import UserInfo from './UserInfo';
import AddRecipeForm from './AddRecipeForm';

import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

//loadProgressBar();

class RecipeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isProduction: true, //use this variable to control url type
      //app_url: 'https://fccwebapps-mtanzim.c9users.io',
      loginMethod: "",
      loginIcon: "fa fa-user",
      isError: true,
      errMsg: "Facebook log in is currently unavailable. I've requested assistance from Facebook, and awaiting feedback.",
      user: '',
      userID: '',
      friendUser: {},
      recipes: [],
      //friendRecipes: [],
      recipeToCopy: {},
      newRecipeName: '',
      newIng: { title: '', qty: '', unit: '' },
      editing: false,
      pageCtrl: 0 //allows users to toggle between pages
      //addRecipeStyleState: {display:'none'}
    };

    this.eachRecipe = this.eachRecipe.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.delAllIngredient = this.delAllIngredient.bind(this);
    this.delIngredient = this.delIngredient.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.remRecipe = this.remRecipe.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleAddIngTitle = this.handleAddIngTitle.bind(this);
    this.handleAddIngQty = this.handleAddIngQty.bind(this);
    this.handleAddIngUnit = this.handleAddIngUnit.bind(this);
    this.editRecipName = this.editRecipName.bind(this);
    this.toggleAddRecipe = this.toggleAddRecipe.bind(this);
    this.editIngredient = this.editIngredient.bind(this);
    //this.setLoginMethod = this.setLoginMethod.bind(this);
    this.handleError = this.handleError.bind(this);
    //this.renderAddRecipeForm = this.renderAddRecipeForm.bind(this);

  }

  componentDidMount() {
    loadProgressBar();
    axios.get('/getCurUser')
      //axios.get(`/api/${this.state.userID}`)
      .then(res => {
        ////console.log(res.data);
        ////console.log((typeof(res.data)==='object') && res.data.user.id!==undefined);
        if ((typeof (res.data) === 'object') && res.data._id !== undefined) {

          //console.log('User found');
          //console.log(res.data);
          //this.setState({userID:res.data._id});
          this.setState({
            isLoggedIn: true,
            isError: false,
            recipes: res.data.recipes,
            userID: res.data._id,
            user: res.data.displayName.name,
            loginMethod: res.data.displayName.type
          });

          if (this.state.loginMethod === 'git') {
            this.setState({
              loginIcon: "fa fa-github"
            })
          }
          else if (this.state.loginMethod === 'fb') {
            this.setState({
              loginIcon: "fa fa-facebook"
            })
          }

        }
      }).catch(err => {
        console.error(err);
      });
  }

  getFriendRecipe = (id) => {
    //console.log (id);
    axios.get(`/api/${id}`)
      .then(res => {
        this.setState({
          friendUser: res.data.content,
          pageCtrl: 1
        });
      }).catch(err => {
        console.error(err);
      });
  }

  toggleMyRecipe = () => {
    this.setState({
      pageCtrl: 0
    });
  }

  toggleMyProfile = () => {
    this.setState({
      pageCtrl: 2
    });
  }
  handleError(msg) {
    this.setState({
      isError: true,
      errMsg: msg
    })
  }

  toggleAddRecipe() {
    this.setState({
      editing: !this.state.editing
    });
  }

  handleAddIngTitle(event) {
    this.setState({
      newIng: { ...this.state.newIng, title: event.target.value }
    });
  }
  handleAddIngQty(event) {
    this.setState({
      newIng: { ...this.state.newIng, qty: event.target.value }
    });
  }
  handleAddIngUnit(event) {
    this.setState({
      newIng: { ...this.state.newIng, unit: event.target.value }
    });
  }

  handleAddRecipe(event) {
    this.setState({
      newRecipeName: event.target.value
    });
  }
  copyRecipe = (recipe) => {
    this.addRecipeBase(recipe);
    this.setState({
      isError: true,
      errMsg: "Recipe copied!"

    })
  }
  addRecipe() {
    this.addRecipeBase({ title: this.state.newRecipeName });
    this.toggleAddRecipe();
  }

  addRecipeBase = (newRecipe) => {
    //var newRecipe={title:this.state.newRecipeName, ingredients:[{}]};
    //var newRecipe={title:this.state.newRecipeName};
    axios.post(`/api/${this.state.userID}/recipe`, newRecipe)
      .then(res => {
        //console.log(res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          var updatedRecipe = res.data.content;
          this.setState({
            recipes: updatedRecipe,
            newRecipeName: '',
            isError: false
          });
          //console.log(this.state.recipes);

        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  remRecipe(id) {
    //post to the server and delete from the database; delete the same item locally
    axios.delete(`/api/${this.state.userID}/recipe/${id}`)
      .then(res => {
        //console.log(res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          var indexToDel = -1;
          this.state.recipes.forEach(function (recipe, index) {
            if (recipe._id === id) {
              indexToDel = index;
            }
          });
          //console.log(`index to del is ${indexToDel}`);
          var recipeUpdated = this.state.recipes;
          recipeUpdated.splice(indexToDel, 1);
          this.setState({
            recipes: recipeUpdated
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  editRecipName(id, newName) {
    axios.put(`/api/${this.state.userID}/recipe/${id}`, { 'title': newName })
      .then(res => {
        //console.log(res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          var recipeUpdated = this.state.recipes.map(
            recipe => (recipe._id !== id) ?
              recipe : res.data.content
          );
          this.setState({
            recipes: recipeUpdated
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  addIngredient(id) {

    //send new ingredient to the database, and the id of the recipe being added
    axios.post(`/api/${this.state.userID}/recipe/${id}`, this.state.newIng)
      .then(res => {

        //console.log(res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          //var newIng = res.data.ingredients;
          var recipeUpdated = this.state.recipes.map(function (recipe) {
            if (recipe._id === id) {
              //var addedIng=recipe.ingredients.concat(newIng);
              var newIng = res.data.content.ingredients;
              return { ...recipe, ingredients: newIng };
            } else {
              return recipe;
            }
          });
          this.setState({
            recipes: recipeUpdated,
            newIng: { title: '', qty: 0, unit: '' }
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  delIngredient(id, ingId) {
    axios.delete(`/api/${this.state.userID}/recipe/${id}/${ingId}`)
      .then(res => {
        //console.log(res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          var recipeUpdated = this.state.recipes.map(function (recipe) {
            if (recipe._id === id) {
              //var addedIng=recipe.ingredients.concat(newIng);
              var newIng = res.data.content.ingredients;
              return { ...recipe, ingredients: newIng };
            } else {
              return recipe;
            }
          });
          this.setState({
            recipes: recipeUpdated
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  editIngredient(id, ingId, editedIng) {
    axios.put(`/api/${this.state.userID}/recipe/${id}/${ingId}`, editedIng)
      .then(res => {
        //console.log(res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          var recIndexToEdit = -1;
          var ingIndexToEdit = -1;
          this.state.recipes.forEach(function (recipe, index) {
            if (recipe._id === id) {
              recIndexToEdit = index;
              recipe.ingredients.forEach(function (ing, ingIndex) {
                if (ing._id === ingId) {
                  ingIndexToEdit = ingIndex;
                }
              });
            }
          });

          var recipeUpdated = this.state.recipes;
          recipeUpdated[recIndexToEdit].ingredients[ingIndexToEdit] = res.data.content;
          //console.log(recipeUpdated);	
          this.setState({
            recipes: recipeUpdated
          });

        }

      })
      .catch(err => {
        console.error(err);
      });
  }
  removeAll() {
    axios.delete(`/api/${this.state.userID}/recipeDelAll`)
      .then(res => {
        //console.log (res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          this.setState({
            recipes: [],
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  delAllIngredient(id) {
    axios.delete(`/api/${this.state.userID}/recipeDelAllIng/${id}`)
      .then(res => {
        //console.log(res.data);
        this.setState({
          isError: res.data.isError,
          errMsg: res.data.content.errors
        });
        if (res.data.isError === false) {
          var recipeUpdated = this.state.recipes.map(function (recipe) {
            if (recipe._id === id) {
              //var addedIng=recipe.ingredients.concat(newIng);
              var newIng = res.data.content.ingredients;
              return { ...recipe, ingredients: newIng };
            } else {
              return recipe;
            }
          });
          this.setState({
            recipes: recipeUpdated
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  eachRecipe(recipe) {
    return (
      <RecipeCard
        key={recipe._id}
        id={recipe._id}
        title={recipe.title}
        ingredients={recipe.ingredients}
        addIng={this.addIngredient}
        remRecipe={this.remRecipe}
        delAllIng={this.delAllIngredient}
        delIng={this.delIngredient}
        editIngredient={this.editIngredient}
        handleIngTitle={this.handleAddIngTitle}
        handleIngQty={this.handleAddIngQty}
        handleIngUnit={this.handleAddIngUnit}
        saveEdit={this.editRecipName}
        pageCtrl={this.state.pageCtrl}
        copyRecipe={this.copyRecipe}
      //curRecipe = {recipe}
      ></RecipeCard>
    );
  }

  render() {

    var app_url = '';

    if (!this.state.isProduction) {
      app_url = 'https://fccwebapps-mtanzim.c9users.io';
    }

    return (
      <div className="container">
        <h1 className="mt-4">Recipe List</h1>
        {this.state.isError && (<ErrorMessage
          isEdititing={this.state.isEdititing} errMsg={this.state.errMsg} />)}
        {this.state.isLoggedIn ?
          (<UserInfo app_url={app_url}
            userObj={this.state.user}
            loginIcon={this.state.loginIcon}
            isLoggedIn={this.state.isLoggedIn} />
          ) : (
            <UserLogin
              handleError={this.handleError}
              app_url={app_url}
              isLoggedIn={this.state.isLoggedIn} />
          )}

        {this.state.isLoggedIn && <UserMenu toggleMyRecipe={this.toggleMyRecipe}
          toggleMyProfile={this.toggleMyProfile}
          curUser={this.state.userID}
          getFriendRecipe={this.getFriendRecipe}
        />}
        {this.state.isLoggedIn && this.state.pageCtrl === 0 &&
          (
            <div>
              <button type="button" className="mt-2 btn btn-default" onClick={this.toggleAddRecipe}><i className="fa fa-plus" aria-hidden="true"></i></button>
              <button className="mt-2 ml-2 btn btn-danger" onClick={this.removeAll}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
            </div>
          )}

        {this.state.editing && (<div className="mt-4">
          <AddRecipeForm onChange={this.handleAddRecipe} onSaveButton={this.addRecipe} />
        </div>)}
        {this.state.pageCtrl === 0 &&
          (<div className="row">
            {this.state.recipes.map(this.eachRecipe)}
          </div>)}
        {this.state.pageCtrl === 1 &&
          (
            <div>
              <h3 className="mt-2">{this.state.friendUser.displayName.name}'s Recipes</h3>
              <div className="row">
                {this.state.friendUser.recipes.map(this.eachRecipe)}
              </div>
            </div>)}
        {this.state.pageCtrl === 2 &&
          (<UserProfile
            handleError={this.handleError}
            userInfo={this.state.user}
            loginType={this.state.loginMethod}
            userIcon={this.state.loginIcon}
            userID={this.state.userID}
            numRecipes={this.state.recipes.length} />)}
      </div>
    )
  }
}




export default RecipeApp;