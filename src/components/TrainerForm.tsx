import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trainerSchema } from '../schemas/trainerSchema';
import type { trainerFormData } from '../schemas/trainerSchema';

// Tipo para la respuesta de JSONPlaceholder
interface JSONPlaceholderResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Tipo para el último envío
interface LastSubmission {
  formData: trainerFormData;
  apiResponse: JSONPlaceholderResponse;
}

// Simulamos algunos pokémon para el selector
const pokemonOptions = [
  { id: 1, name: 'Pikachu' },
  { id: 25, name: 'Charizard' },
  { id: 9, name: 'Blastoise' },
  { id: 3, name: 'Venusaur' },
  { id: 150, name: 'Mewtwo' },
  { id: 144, name: 'Articuno' },
  { id: 145, name: 'Zapdos' },
  { id: 146, name: 'Moltres' },
];

const TrainerForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<LastSubmission | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<trainerFormData>({
    resolver: zodResolver(trainerSchema),
    defaultValues: {
      nombre: '',
      edad: 18,
      ciudad: '',
      pokemonFavorito: '',
      equipo: undefined,
      experiencia: undefined,
      biografia: ''
    }
  });

  const biografia = watch('biografia');

  const onSubmit = async (data: trainerFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      // Crear un post en JSONPlaceholder con los datos del entrenador
      const postData = {
        title: `Nuevo Entrenador: ${data.nombre}`,
        body: `Entrenador: ${data.nombre}
Edad: ${data.edad} años
Ciudad: ${data.ciudad}
Pokémon Favorito: ${data.pokemonFavorito}
Equipo: ${data.equipo}
Experiencia: ${data.experiencia}
${data.biografia ? `Biografía: ${data.biografia}` : ''}`,
        userId: Math.floor(Math.random() * 10) + 1 // Usuario aleatorio entre 1-10
      };

      console.log('Enviando datos del entrenador:', data);
      
      // Llamada real a JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const result = await response.json() as JSONPlaceholderResponse;
      console.log('Respuesta de JSONPlaceholder:', result);
      
      setLastSubmission({ formData: data, apiResponse: result });
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitError('Hubo un error al registrar el entrenador. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Registro de Entrenador Pokémon
        </h2>
        <p className="text-gray-600">
          Completa el formulario para registrarte como entrenador oficial
        </p>
      </div>

      {submitSuccess && lastSubmission && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-bold mb-2">¡Entrenador registrado exitosamente! Bienvenido a la comunidad Pokémon.</p>
          <div className="text-sm">
            <p><strong>ID asignado:</strong> {lastSubmission.apiResponse.id}</p>
            <p><strong>Datos enviados:</strong></p>
            <div className="bg-green-50 p-2 rounded mt-2 text-xs">
              <pre>{JSON.stringify(lastSubmission.formData, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}

      {submitSuccess && !lastSubmission && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ¡Entrenador registrado exitosamente! Bienvenido a la comunidad Pokémon.
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-700">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Entrenador *
          </label>
          <input
            type="text"
            id="nombre"
            {...register('nombre')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nombre ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Introduce tu nombre"
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
          )}
        </div>

        {/* Edad */}
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-2">
            Edad *
          </label>
          <input
            type="number"
            id="edad"
            {...register('edad', { valueAsNumber: true })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.edad ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Introduce tu edad"
            min="10"
            max="99"
          />
          {errors.edad && (
            <p className="mt-1 text-sm text-red-600">{errors.edad.message}</p>
          )}
        </div>

        {/* Ciudad */}
        <div>
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad *
          </label>
          <input
            type="text"
            id="ciudad"
            {...register('ciudad')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ciudad ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Introduce tu ciudad"
          />
          {errors.ciudad && (
            <p className="mt-1 text-sm text-red-600">{errors.ciudad.message}</p>
          )}
        </div>

        {/* Pokémon Favorito */}
        <div>
          <label htmlFor="pokemonFavorito" className="block text-sm font-medium text-gray-700 mb-2">
            Pokémon Favorito *
          </label>
          <select
            id="pokemonFavorito"
            {...register('pokemonFavorito')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pokemonFavorito ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona tu Pokémon favorito</option>
            {pokemonOptions.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
          {errors.pokemonFavorito && (
            <p className="mt-1 text-sm text-red-600">{errors.pokemonFavorito.message}</p>
          )}
        </div>

        {/* Equipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipo *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
              <input
                type="radio"
                {...register('equipo')}
                value="mystic"
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-blue-600 font-medium">⚡ Mystic</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-red-50">
              <input
                type="radio"
                {...register('equipo')}
                value="valor"
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-red-600 font-medium">🔥 Valor</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-yellow-50">
              <input
                type="radio"
                {...register('equipo')}
                value="instinct"
                className="text-yellow-600 focus:ring-yellow-500"
              />
              <span className="text-yellow-600 font-medium">⚡ Instinct</span>
            </label>
          </div>
          {errors.equipo && (
            <p className="mt-1 text-sm text-red-600">{errors.equipo.message}</p>
          )}
        </div>

        {/* Experiencia */}
        <div>
          <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700 mb-2">
            Nivel de Experiencia *
          </label>
          <select
            id="experiencia"
            {...register('experiencia')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.experiencia ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona tu nivel</option>
            <option value="novato">🌱 Novato</option>
            <option value="intermedio">⭐ Intermedio</option>
            <option value="experto">🏆 Experto</option>
          </select>
          {errors.experiencia && (
            <p className="mt-1 text-sm text-red-600">{errors.experiencia.message}</p>
          )}
        </div>

        {/* Biografía */}
        <div>
          <label htmlFor="biografia" className="block text-sm font-medium text-gray-700 mb-2">
            Biografía (Opcional)
          </label>
          <textarea
            id="biografia"
            {...register('biografia')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.biografia ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Cuéntanos sobre tu historia como entrenador Pokémon..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.biografia && (
              <p className="text-sm text-red-600">{errors.biografia.message}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {biografia?.length || 0}/200 caracteres
            </p>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </div>
            ) : (
              'Registrar Entrenador'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;