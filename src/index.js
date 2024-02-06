import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { AppProvider } from "./context";

import { Provider } from "react-redux";
import { store } from "./store.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AppProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </AppProvider> */}
  </React.StrictMode>
);


