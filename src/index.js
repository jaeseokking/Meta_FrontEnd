import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response){
    return response;
  },
  function (error){
    if(error.response.status === 401){
      if(error.response.data.code === '4401'){
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



