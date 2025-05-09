// index.jsx (or main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
// main.jsx or index.jsx
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Wrap the entire app in BrowserRouter */}
    <App />
  </BrowserRouter>
);
