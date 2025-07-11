import { z } from 'zod';

export const trainerSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  edad: z.number()
    .min(10, 'Debes tener al menos 10 años para ser entrenador')
    .max(99, 'La edad no puede ser mayor a 99 años'),
  
  ciudad: z.string()
    .min(3, 'La ciudad debe tener al menos 3 caracteres')
    .max(30, 'La ciudad no puede tener más de 30 caracteres'),
  
  pokemonFavorito: z.string()
    .min(1, 'Debes seleccionar un Pokémon favorito'),
  
  equipo: z.enum(['mystic', 'valor', 'instinct'], {
    errorMap: () => ({ message: 'Debes seleccionar un equipo' })
  }),
  
  experiencia: z.enum(['novato', 'intermedio', 'experto'], {
    errorMap: () => ({ message: 'Debes seleccionar tu nivel de experiencia' })
  }),
  
  biografia: z.string()
    .min(10, 'La biografía debe tener al menos 10 caracteres')
    .max(200, 'La biografía no puede tener más de 200 caracteres')
    .optional()
});

export type trainerFormData = z.infer<typeof trainerSchema>;