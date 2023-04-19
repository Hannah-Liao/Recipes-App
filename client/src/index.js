import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AuthContextProvider } from './context/AuthContext';
import { PageContextProvider } from './context/PageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider >
      <PageContextProvider>
        <App />
      </PageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


