import { createRoot } from 'react-dom/client';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.css';
import { StrictMode } from 'react';
import store from './services/store';
import { Provider } from 'react-redux';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
   {/* </Provider> */}
  </StrictMode>
);