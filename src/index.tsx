import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";

firebase.initializeApp ({
  apiKey: "AIzaSyBTFH6AtPzoOREIOOYubqketPvnYGrUJtg",
  authDomain: "rs-forge.firebaseapp.com",
  projectId: "rs-forge",
  storageBucket: "rs-forge.appspot.com",
  messagingSenderId: "635514687335",
  appId: "1:635514687335:web:d524f5f8c7c6d7d9a2a9c2",
  measurementId: "G-JQ37TXVQDH"
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
