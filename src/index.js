import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DatabaseDisplay from './DatabaseDisplay';


ReactDOM.render(<App />, document.getElementById('create'));



ReactDOM.render(<DatabaseDisplay /> , document.getElementById('databaseDisplay'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
