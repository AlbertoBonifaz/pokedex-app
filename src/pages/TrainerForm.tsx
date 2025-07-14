import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trainerSchema } from '../schemas/trainerSchema';
import type { trainerFormData } from '../schemas/trainerSchema';
import type { SubmissionState } from '../types/traiener';
import { Link } from 'react-router-dom';

const TrainerForm: React.FC = () => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
    lastSubmission: null,
  });

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
      biografia: ''
    }
  });

  const biografia = watch('biografia');

  const onSubmit = useCallback(async (data: trainerFormData) => {
    setSubmissionState(prev => ({
      ...prev,
      isSubmitting: true,
      submitSuccess: false,
      submitError: null
    }));

    try {
      console.log('Enviando datos del entrenador:', data);
      
      // Crear el payload para JSONPlaceholder
      const postData = {
        title: `Nuevo Entrenador: ${data.nombre}`,
        body: `Entrenador: ${data.nombre}
Edad: ${data.edad} años
${data.biografia ? `Biografía: ${data.biografia}` : ''}`,
        userId: Math.floor(Math.random() * 10) + 1
      };

      // Llamada a la API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const apiResponse = await response.json();
      console.log('Respuesta de JSONPlaceholder:', apiResponse);
      
      setSubmissionState(prev => ({
        ...prev,
        isSubmitting: false,
        submitSuccess: true,
        lastSubmission: { formData: data, apiResponse }
      }));
      
      reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmissionState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Hubo un error al registrar el entrenador. Por favor, intenta nuevamente.'
      }));
    }
  }, [reset]);

  return (
    <div className="container mx-auto px-4 py-8">
          {/* Botón para volver */}
          <div className="mb-6">
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
            >
              ← Volver a la lista
            </Link>
          </div>
    
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Registro de Entrenador Pokémon
        </h1>
        <p className="text-gray-600">
          Completa el formulario para registrarte como entrenador oficial
        </p>
      </header>

      {/* Mensaje de éxito */}
      {submissionState.submitSuccess && submissionState.lastSubmission && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-bold mb-2">¡Entrenador registrado exitosamente! Bienvenido a la comunidad Pokémon.</p>
          <details className="text-sm">
            <summary className="cursor-pointer hover:text-green-800">
              <strong>Ver detalles del registro</strong>
            </summary>
            <div className="mt-2">
              <p><strong>ID asignado:</strong> {submissionState.lastSubmission.apiResponse.id}</p>
              <div className="bg-green-50 p-2 rounded mt-2 text-xs">
                <pre>{JSON.stringify(submissionState.lastSubmission.formData, null, 2)}</pre>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* Mensaje de error */}
      {submissionState.submitError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {submissionState.submitError}
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
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          />
          {errors.nombre && (
            <p id="nombre-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.nombre.message}
            </p>
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
            aria-describedby={errors.edad ? 'edad-error' : undefined}
          />
          {errors.edad && (
            <p id="edad-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.edad.message}
            </p>
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
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.biografia ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Cuéntanos sobre tu historia como entrenador Pokémon..."
            aria-describedby="biografia-counter"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.biografia && (
              <p className="text-sm text-red-600" role="alert">
                {errors.biografia.message}
              </p>
            )}
            <p id="biografia-counter" className="text-sm text-gray-500 ml-auto">
              {biografia?.length || 0}/200 caracteres
            </p>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submissionState.isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              submissionState.isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {submissionState.isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Registrando...</span>
              </div>
            ) : (
              'Registrar Entrenador'
            )}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default TrainerForm;