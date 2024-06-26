import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Web3ContextProvider } from './context';
import './index.css';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
   <ThirdwebProvider
      clientId={import.meta.env.VITE_CLIENT_ID} activeChain='sepolia'
   >
      <Router>
         <Web3ContextProvider>
            <App />
         </Web3ContextProvider>
      </Router>
   </ThirdwebProvider>
);