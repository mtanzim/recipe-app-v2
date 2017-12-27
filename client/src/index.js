import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import RecipeApp from './RecipeApp';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RecipeApp />, document.getElementById('root'));
registerServiceWorker();
