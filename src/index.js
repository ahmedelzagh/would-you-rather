import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'
import applyMiddleware from './middleware';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer, applyMiddleware)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);