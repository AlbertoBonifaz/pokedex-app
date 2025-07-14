// TrainerApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { trainerFormData } from '../schemas/trainerSchema';
import type { JSONPlaceholderResponse } from '../types/traiener';

// Crea una API usando RTK Query para entrenadores
export const trainerApi = createApi({
  reducerPath: 'trainerApi', // guarda en la cache

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),

  // Define los tags para el cache invalidation
  tagTypes: ['Trainer'],

  endpoints: (builder) => ({
    // Endpoint para registrar un entrenador
    registerTrainer: builder.mutation<
      JSONPlaceholderResponse,           // Tipo de respuesta
      trainerFormData              // Tipo de datos de entrada
    >({
      query: (trainerData) => {
        // Crear el payload para JSONPlaceholder
        const postData = {
          title: `Nuevo Entrenador: ${trainerData.nombre}`,
          body: `Entrenador: ${trainerData.nombre}
Edad: ${trainerData.edad} años
${trainerData.biografia ? `Biografía: ${trainerData.biografia}` : ''}`,
          userId: Math.floor(Math.random() * 10) + 1
        };

        return {
          url: 'posts',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: postData
        };
      },
      // Invalida el cache cuando se registra un entrenador
      invalidatesTags: ['Trainer'],
    }),

    // Endpoint opcional para obtener entrenadores registrados
    getTrainers: builder.query<
      JSONPlaceholderResponse[],
      void
    >({
      query: () => 'posts',
      providesTags: ['Trainer'],
    }),

    // Endpoint opcional para obtener un entrenador específico
    getTrainerById: builder.query<
      JSONPlaceholderResponse,
      number
    >({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Trainer', id }],
    }),
  }),
});

// Exporta los hooks generados automáticamente por RTK Query
export const { 
  useRegisterTrainerMutation,  // Hook para registrar entrenador
  useGetTrainersQuery,         // Hook para obtener lista de entrenadores
  useGetTrainerByIdQuery       // Hook para obtener entrenador por ID
} = trainerApi;