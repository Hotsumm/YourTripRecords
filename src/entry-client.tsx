import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@src/App';

const container: HTMLElement | null = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOMClient.hydrateRoot(
  container,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
