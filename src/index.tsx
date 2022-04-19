import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './styles/index.css';
import AppContextProvider from './providers/AppContextProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<React.StrictMode>
  <AppContextProvider>
    <App />
  </AppContextProvider>
</React.StrictMode>);
