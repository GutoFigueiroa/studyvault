import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// Importa o arquivo SCSS que acabamos de criar.
import './style.scss';
// Importa o Provider do Redux para conectar o React ao Store.
import { Provider } from 'react-redux';
import { store } from './redux/store'; // A store que definimos.

// Importa o Router do React Router DOM (precisamos instalá-lo).
import { BrowserRouter } from 'react-router-dom';

// Instalar dependências de roteamento
// Volte para a pasta 'studyvault/frontend' no terminal e execute:
// npm install react-router-dom @types/react-router-dom

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 1. O Provider Redux envolve toda a aplicação, fornecendo o estado. */}
    <Provider store={store}>
      {/* 2. O BrowserRouter habilita o roteamento na aplicação. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);