// PokemonList.tsx
import React, { useState, useEffect } from 'react';
import { useGetPokemonListQuery } from '../store/pokemonApi';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

// Define cuántos Pokémon quieres cargar por página
const ITEMS_PER_PAGE = 20;

const PokemonList: React.FC = () => {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el offset actual de la paginación
  // Representa el número de elementos saltados desde el inicio
  const [currentPageOffset, setCurrentPageOffset] = useState(0);
  // Estado para el número total de Pokémon disponibles en la API
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);

  // Hook de RTK Query para obtener la lista de Pokémon
  // Se le pasan el límite y el offset para la paginación
  const { data, isLoading, error } = useGetPokemonListQuery({
    limit: ITEMS_PER_PAGE,
    offset: currentPageOffset,
  });

  // useEffect para actualizar el totalPokemonCount una vez que los datos iniciales se cargan
  // Esto es importante para calcular el número total de páginas y deshabilitar el botón "Siguiente"
  useEffect(() => {
    if (data?.count) {
      setTotalPokemonCount(data.count);
    }
  }, [data?.count]); // Se ejecuta cada vez que 'data.count' cambia

  // Función para manejar el término de búsqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
    // Al realizar una nueva búsqueda, reiniciamos la paginación a la primera página
    setCurrentPageOffset(0);
    // También desplazamos la vista al principio al buscar
    window.scrollTo(0, 0);
  };

  // Filtra los Pokémon obtenidos de la API basándose en el término de búsqueda
  // Si no hay datos, se usa un array vacío para evitar errores
  const filteredPokemon = data?.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm)
  ) || [];

  // Calcula el número total de páginas
  // Math.ceil asegura que si hay un resto, se cree una página adicional para esos elementos
  const totalPages = Math.ceil(totalPokemonCount / ITEMS_PER_PAGE);

  // Calcula el número de la página actual (basado en 1 para el usuario)
  const currentPageNumber = Math.floor(currentPageOffset / ITEMS_PER_PAGE) + 1;

  // Función para avanzar a la siguiente página
  const handleNextPage = () => {
    // Solo avanza si no estamos en la última página
    if (currentPageOffset + ITEMS_PER_PAGE < totalPokemonCount) {
      setCurrentPageOffset(prevOffset => prevOffset + ITEMS_PER_PAGE);
      // Desplazarse al principio de la página
      window.scrollTo(0, 0);
    }
  };

  // Función para retroceder a la página anterior
  const handlePreviousPage = () => {
    // Solo retrocede si no estamos en la primera página
    if (currentPageOffset > 0) {
      setCurrentPageOffset(prevOffset => prevOffset - ITEMS_PER_PAGE);
      // Desplazarse al principio de la página
      window.scrollTo(0, 0);
    }
  };

  // Muestra un indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando Pokémon...</p>
        </div>
      </div>
    );
  }

  // Muestra un mensaje de error si la carga falla
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 font-semibold">
            Error cargando los Pokémon. Por favor, inténtalo de nuevo más tarde.
          </p>
          {/* Puedes descomentar la siguiente línea para ver detalles del error en desarrollo */}
          {/* <p className="text-red-500 text-sm">{(error as any)?.message || JSON.stringify(error)}</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Pokédex
      </h1>
       {/* Boton para convertise en entrenador */}
       <div className='text-center mb-8'>
        <Link
          to="/formulario"
          className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                     text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg 
                     transform hover:scale-105 transition duration-300 ease-in-out
                     inline-flex items-center gap-2'>
                      <span>⚡</span>
                      ¡Quieres ser el nuevo Ash!
                      <span>⚡</span>
                     </Link>

       </div>

      {/* Componente de barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Contenedor de las tarjetas de Pokémon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          // Renderiza una tarjeta para cada Pokémon filtrado
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {/* Mensaje si no se encuentran Pokémon con el término de búsqueda */}
      {filteredPokemon.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron Pokémon con "{searchTerm}"</p>
        </div>
      )}

      {/* Controles de Paginación */}
      {/* Solo se muestran si no hay un término de búsqueda activo (para que la paginación no interfiera con la búsqueda) */}
      {/* Y si hay más de una página para mostrar */}
      {!searchTerm && totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={handlePreviousPage}
            // Deshabilita el botón "Anterior" si estamos en la primera página o si hay una carga en curso
            disabled={currentPageOffset === 0 || isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md
                       transition duration-300 ease-in-out transform hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Anterior
          </button>

          {/* Indicador de la página actual */}
          <span className="text-gray-700 font-medium text-lg">
            Página {currentPageNumber} de {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            // Deshabilita el botón "Siguiente" si ya no hay más Pokémon para cargar
            // o si hay una carga en curso
            disabled={currentPageOffset + ITEMS_PER_PAGE >= totalPokemonCount || isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md
                       transition duration-300 ease-in-out transform hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
