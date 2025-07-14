// src/store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListSchema, type Pokemon } from '../schemas/pokemonCrub';

export const pokemonApiCrud = createApi({
  reducerPath: 'pokemonApiCrud',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://enmat1.pockethost.io/api/collections/pokemon',
  }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemons: builder.query<Pokemon[], void>({
      query: () => '/records',
      transformResponse: (response: unknown) => {
        const validated = PokemonListSchema.parse(response);
        return validated.items;
      },
      providesTags: ['Pokemon'],
    }),
    createPokemon: builder.mutation<Pokemon, Partial<Pokemon>>({
      query: (newPokemon) => ({
        url: '/records',
        method: 'POST',
        body: newPokemon,
      }),
      invalidatesTags: ['Pokemon'],
    }),
    deletePokemon: builder.mutation<void, string>({
      query: (id) => ({
        url: `/records/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pokemon']
    }),
    updatePokemon: builder.mutation<Pokemon, { id: string; data: Partial<Pokemon> }> ({
      query: ({ id, data }) => ({
        url: `/records/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Pokemon']
    })
  }),
});

export const { 
  useGetPokemonsQuery, 
  useCreatePokemonMutation,
  useDeletePokemonMutation,
  useUpdatePokemonMutation 
} = pokemonApiCrud;