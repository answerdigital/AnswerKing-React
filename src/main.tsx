import 'react-toastify/dist/ReactToastify.css';
import 'style/main.css';
import 'style/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
