// src/main.tsx
import { RouterProvider } from 'react-router-dom'; // Importa RouterProvider
import { router } from './router/router';
import { StrictMode } from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css'; // Si tienes estilos globales


// Crea la raíz de la aplicación y renderiza el RouterProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Usa RouterProvider para manejar las rutas */}
  </StrictMode>,
)
