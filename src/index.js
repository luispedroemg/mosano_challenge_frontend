import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import dotenv from 'dotenv';
import App from './App';

dotenv.config();

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
