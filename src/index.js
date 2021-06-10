// MODULES
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { BrowserRouter as Router } from "react-router-dom";
// STYLES
import './index.css';
// COMPONENTS
import { Provider } from "react-redux";
import App from './App';


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>,
  document.getElementById('root')
);
