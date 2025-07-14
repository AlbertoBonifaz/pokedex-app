// Importa la función para configurar el store de Redux
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonApi';
import { trainerApi } from './trainerApi';
import { pokemonApiCrud } from './pokeCrubApi';


// Crea y exporta el store de Redux
export const store = configureStore({
  // Aquí defines los reducers del store
  // Solo usas el reducer de RTK Query por ahora
  reducer: {
    // actualiza los estados luego de middleware 
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [trainerApi.reducerPath]: trainerApi.reducer,
    [pokemonApiCrud.reducerPath]: pokemonApiCrud.reducer
  },

  // El middleware intercepta las aciones y maneja el caché, invalidación, reintentos, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(trainerApi.middleware)
      .concat(pokemonApiCrud.middleware),

});

// Define y exporta el tipo de todo el estado global de Redux
export type RootState = ReturnType<typeof store.getState>;

// Define y exporta el tipo de la función dispatch del store
export type AppDispatch = typeof store.dispatch;
