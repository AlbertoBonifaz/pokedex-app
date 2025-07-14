import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PokemonList from '../pages/PokemonList';
import PokemonDetail from '../pages/PokemonDetail';
import NotFoundPage from '../pages/NotFoundPage';
import TrainerForm from '../pages/TrainerForm';
import {PokeCrub} from '../pages/PokeCrub';


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
        path: 'pokemon/:name',
        element: <PokemonDetail/>,
      },
      {
        path: 'formulario',
        element: <TrainerForm/>,
      },
      {
        path: 'pokecrub',
        element: <PokeCrub/>
      }
    ],
  },
  // Maneja URLs que no existen
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);