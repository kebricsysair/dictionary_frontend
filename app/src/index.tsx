import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from "./components/routing/AppRouter";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <AppRouter />
  </React.StrictMode>
);

