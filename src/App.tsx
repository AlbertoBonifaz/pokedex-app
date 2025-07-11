// import { Provider } from 'react-redux';
// import { store } from './store';
// import PokemonList from './components/PokemonList';

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="min-h-screen bg-gray-100">
//         <PokemonList />
//       </div>
//     </Provider>
//   );
// }

// export default App;
// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom'; // Importa Outlet para el enrutamiento
import { store } from './store';
import './index.css'; // Si tienes estilos globales

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        {/* Outlet para renderizar las rutas hijas */}
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
