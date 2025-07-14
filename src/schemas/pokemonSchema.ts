import { z } from 'zod';

// Exportar el schema para que se pueda usar en otros archivos
export const searchSchema = z.object({
  search: z
    .string()
    .min(2, 'Por favor ingresa un término de búsqueda')
});

// Exportar el tipo inferido
export type SearchFormData = z.infer<typeof searchSchema>;