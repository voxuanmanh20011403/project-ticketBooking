

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from 'react-redux';
import store from './redux/store'
import { MaterialUIControllerProvider } from "Admin/context";
// Material Dashboard 2 React Context Provider
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <BrowserRouter>
  <Provider store={store} >
  <MaterialUIControllerProvider>
  <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <App />
    </MaterialUIControllerProvider>
  </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
