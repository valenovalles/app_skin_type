import React from 'react';
import ReactDOM from 'react-dom/client';
import "../src/styles/App.scss";
import App from './components/App.jsx';
import { HashRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
