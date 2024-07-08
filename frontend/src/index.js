import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
        <App/>
        <Toaster/>
    </Provider>
  </React.StrictMode>
);


