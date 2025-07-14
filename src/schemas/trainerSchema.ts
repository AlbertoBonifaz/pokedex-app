import { z } from 'zod';
import type { TrainerFormData } from '../types/traiener';

export const trainerSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  edad: z
    .number()
    .min(10, 'La edad mínima es 10 años')
    .max(99, 'La edad máxima es 99 años')
    .int('La edad debe ser un número entero'),
  
  biografia: z
    .string()
    .max(200, 'La biografía no puede exceder los 200 caracteres')
    .optional()
});

// Exportar el tipo inferido del schema
export type trainerFormData = z.infer<typeof trainerSchema>;

// Verificar que el tipo inferido coincida con la interfaz
export const _typeCheck: TrainerFormData = {} as trainerFormData;