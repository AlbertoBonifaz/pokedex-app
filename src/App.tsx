import { Provider } from 'react-redux';
import { store } from './store';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <PokemonList />
      </div>
    </Provider>
  );
}

export default App;