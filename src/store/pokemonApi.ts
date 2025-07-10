import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit: number; offset: number }>({
      query: ({ limit = 20, offset = 0 }) => `pokemon?limit=${limit}&offset=${offset}`,
    }),
    getPokemonDetail: builder.query<PokemonDetail, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailQuery } = pokemonApi;