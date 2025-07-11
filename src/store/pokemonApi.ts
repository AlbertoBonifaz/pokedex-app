
// PokemonApi.ts
// Importa las funciones y tipos necesarios desde RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Importa los tipos de datos que definiste para las respuestas de la API
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon';

// Crea una API usando RTK Query
export const pokemonApi = createApi({
  // Nombre del "slice" de estado en Redux donde RTK Query almacenará su cache y estado
  reducerPath: 'pokemonApi',

  // Configuración base para las peticiones HTTP
  baseQuery: fetchBaseQuery({
    // URL base de la API de Pokémon
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),

  // Aquí defines los "endpoints" o puntos de acceso a la API que usarás
  endpoints: (builder) => ({
    // Primer endpoint: obtener la lista de Pokémon
    getPokemonList: builder.query<
      PokemonListResponse,           // Tipo del dato que devuelve la API (response)
      { limit: number; offset: number } // Tipo de los parámetros que recibe la query
    >({
      // Define cómo construir la URL a la que se hará la petición
      query: ({ limit = 20, offset = 0 }) => 
        `pokemon?limit=${limit}&offset=${offset}`,
        // Ejemplo: https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
    }),

    // Segundo endpoint: obtener detalles de un Pokémon por su nombre
    getPokemonDetail: builder.query<
      PokemonDetail, // Tipo de la respuesta
      string         // Tipo del argumento (el nombre del Pokémon)
    >({
      // Define la URL a la que se hace la petición para obtener los detalles
      query: (name) => `pokemon/${name}`,
      // Ejemplo: https://pokeapi.co/api/v2/pokemon/pikachu
    }),
  }),
});

// Exporta los hooks generados automáticamente por RTK Query para que los puedas usar en tus componentes React
// Estos hooks manejan el fetching, caching, estados de carga y error automáticamente
export const { 
  useGetPokemonListQuery,   // Hook para obtener la lista de Pokémon
  useGetPokemonDetailQuery  // Hook para obtener detalles de un Pokémon
} = pokemonApi;
