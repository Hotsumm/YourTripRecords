import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container: HTMLElement | null = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
hydrateRoot(
  container,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
