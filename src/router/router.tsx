import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PokemonList from '../components/PokemonList';
import PokemonDetail from '../components/PokemonDetail';
import NotFoundPage from '../components/NotFoundPage';
import Abaut from '../components/Abaut';
import TrainerForm from '../components/TrainerForm';


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
      {
        path: 'pokemon/:name',
        element: <PokemonDetail/>,
      },
      {
        path: 'formulario',
        element: <TrainerForm/>,
      }
    ],
  },
  // Maneja URLs que no existen
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);