import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PokemonList from '../components/PokemonList';
import NotFoundPage from '../components/NotFoundPage';
import Abaut from '../components/Abaut'; // Corregido: Abaut -> About

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <PokemonList />,
      },
      {
        path: 'about',
        element: <Abaut />,
      },
    ],
  },
  // Maneja URLs que no existen
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);