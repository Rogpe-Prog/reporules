import React from 'react';
import ReactDOM from 'react-dom/client'; // Importando de react-dom/client
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Criando um root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
