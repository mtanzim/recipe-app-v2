import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { recipes: [] }

  componentDidMount() {
    fetch('/testReact')
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }));

    //console.log(this.state.recipes);
  }
  render() {
    console.log(this.state.recipes);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Recipes</h1>
        {this.state.recipes.map(recipe =>
          <div key={recipe._id}>
            <h4>{recipe.title}</h4>
            {recipe.ingredients.map(ing =>
              <div key={ing._id}>{ing.title} {ing.qty} {ing.unit}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
