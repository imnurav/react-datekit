import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './demo.css';
import 'react-datekit/style.css';

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
