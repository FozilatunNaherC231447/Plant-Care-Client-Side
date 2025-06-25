import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import AuthProvider from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; 
import './index.css'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>           
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
    <ToastContainer position="bottom-left" autoClose={3000} />
  </React.StrictMode>
);
