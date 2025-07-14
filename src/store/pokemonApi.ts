// PokemonApi.ts
// Importa las funciones desde RTK Query y intefaces de pokemon
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon';

// Crea una API usando RTK Query
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi', // guarda en la cache

  baseQuery: fetchBaseQuery({ //hacer la peticion
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),

  endpoints: (builder) => ({
    getPokemonList: builder.query<   // Definimos endpoint con getPokemon List
      PokemonListResponse,           // Dato devuelto en la interface 
      { limit: number; offset: number } 
    >({
      // Define cómo construir la URL a la que se hará la petición
      query: ({ limit = -1, offset = 0 }) => 
        `pokemon?limit=${limit}&offset=${offset}`,
        // quiere que se traigan todos
    }),

    // Segundo endpoint: obtener detalles de un Pokémon por su nombre
    getPokemonDetail: builder.query<
      PokemonDetail, // Obtener respuesta en la interfaz
      string         // Tipo del argumento
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
