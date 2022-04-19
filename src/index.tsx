import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import './index.css';
import AppContextProvider from './providers/AppContextProvider';

render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
