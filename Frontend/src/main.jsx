import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import {BrowserRouter} from 'react-router-dom'
import "./assets/styles/global.css";
import "./assets/styles/sidebar.css";
import "./assets/styles/navbar.css";
import "./assets/styles/dashboard.css";
import "./assets/styles/cards.css";
import "./assets/styles/responsive.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);


