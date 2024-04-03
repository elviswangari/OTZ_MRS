import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip';
import {AuthProvider} from 'react-auth-kit'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <TooltipProvider>
    <App />
    </TooltipProvider>
    
  </React.StrictMode>,
)

{/* <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
    >
  </AuthProvider> */}