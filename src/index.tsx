import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/global.scss';
import App from './components/App';
import { Provider } from "react-redux";
import {STORE} from "./store";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={STORE}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
