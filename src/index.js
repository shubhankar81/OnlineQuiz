import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './OnlineQuiz';
import reportWebVitals from './reportWebVitals';
import Route from './Route';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Route /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
