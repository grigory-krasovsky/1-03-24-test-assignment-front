import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApiProvider} from "@reduxjs/toolkit/query/react";
import api from "./api/base-api";
import {Provider} from "react-redux";
import {store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ApiProvider api={api}>
          <Provider store={store}>
              <App />
          </Provider>
      </ApiProvider>
  </React.StrictMode>
);
