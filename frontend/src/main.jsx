import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TooltipProvider } from '@radix-ui/react-tooltip';

import createStore from 'react-auth-kit/store/createAuthStore';
import AuthProvider from 'react-auth-kit';

const store = createStore('cookie', {
  authName:'_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </AuthProvider>
  </React.StrictMode>
);
