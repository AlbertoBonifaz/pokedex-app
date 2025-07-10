// Importa la función para configurar el store de Redux
import { configureStore } from '@reduxjs/toolkit';

// Importa la API que configuraste con RTK Query
import { pokemonApi } from './pokemonApi';

// Crea y exporta el store de Redux
export const store = configureStore({
  // Aquí defines los reducers del store
  // Solo usas el reducer de RTK Query por ahora
  reducer: {
    // El estado de las queries de la API se guarda en pokemonApi.reducerPath
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  // Aquí defines los middlewares adicionales
  // El middleware de RTK Query maneja el caché, invalidación, reintentos, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// Define y exporta el tipo de todo el estado global de Redux
export type RootState = ReturnType<typeof store.getState>;

// Define y exporta el tipo de la función dispatch del store
export type AppDispatch = typeof store.dispatch;
