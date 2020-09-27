import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {searchedText, searchedText2} from './reducers';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
  searchedText, 
  searchedText2
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
