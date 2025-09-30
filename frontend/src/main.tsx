import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 1. Import the necessary components
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Wrap your App component with both providers */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
