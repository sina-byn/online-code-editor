import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// * context provider
import AppContextProvider from './context/AppContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
