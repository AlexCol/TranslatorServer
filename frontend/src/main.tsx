import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ToasterConfig from './components/singles/ToasterConfig/index.tsx';
import { AuthProvider } from './contexts/Auth/AuthContext.tsx';
import DarkMode from './contexts/Dark/DarkMode.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToasterConfig />
    <AuthProvider>
      <DarkMode>
        <App />
      </DarkMode>
    </AuthProvider>
  </StrictMode>,
);
