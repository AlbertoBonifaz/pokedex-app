// src/schemas/pokemonCrub.ts
import { z } from 'zod';

export const PokemonSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z.string().optional(),
  level: z.number().optional(),
  attack: z.number().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
  collectionId: z.string().optional(),
  collectionName: z.string().optional(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonListSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  items: z.array(PokemonSchema),
});

export type PokemonList = z.infer<typeof PokemonListSchema>;