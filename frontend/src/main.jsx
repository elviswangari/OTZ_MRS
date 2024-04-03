import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TooltipProvider>
    <App />
    </TooltipProvider>
  </React.StrictMode>,
)