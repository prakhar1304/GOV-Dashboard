import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import App from './App';
import './index.css';
import { PolygonAmoyTestnet } from '@thirdweb-dev/chains';




createRoot(document.getElementById('root')!).render(
  <StrictMode>

   
      <App />
    
 
</StrictMode>
);
