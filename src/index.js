

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from 'react-redux';
import store from './redux/store'
import { MaterialUIControllerProvider } from "Admin/context";
// Material Dashboard 2 React Context Provider


ReactDOM.render(
  <BrowserRouter>
  <Provider store={store} >
  <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
