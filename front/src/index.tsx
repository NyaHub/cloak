import { createRoot } from 'react-dom/client';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.scss';
import { StrictMode } from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
   <StrictMode>
        <App />
   </StrictMode>
  </BrowserRouter>
);