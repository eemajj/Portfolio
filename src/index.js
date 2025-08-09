import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // SW registered successfully
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('SW registered: ', registration);
        }
      })
      .catch((registrationError) => {
        // SW registration failed
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('SW registration failed: ', registrationError);
        }
      });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
