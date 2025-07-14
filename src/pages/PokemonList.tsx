import React, { useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { useGetPokemonListQuery } from '../store/pokemonApi';
import PokemonCard from '../components/pokemon/PokemonCard';
import SearchBar from '../components/ui/SearchBar';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 20;

const PokemonList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageOffset, setCurrentPageOffset] = useState(0);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);

  const [isPending, startTransition] = useTransition();

  // Datos paginados
  const { data: paginatedData, isLoading: isLoadingPage, error } = useGetPokemonListQuery({
    limit: ITEMS_PER_PAGE,
    offset: currentPageOffset,
  });

  // Datos completos
  const { data: allPokemonData, isLoading: isLoadingAll } = useGetPokemonListQuery({
    limit: -1,
    offset: 0,
  });

  useEffect(() => {
    if (paginatedData?.count) {
      setTotalPokemonCount(paginatedData.count);
    }
  }, [paginatedData?.count]);

  const handleSearch = useCallback((term: string) => {
    startTransition(() => {
      setSearchTerm(term.toLowerCase());
      setCurrentPageOffset(0);
    });
    window.scrollTo(0, 0);
  }, []);

  const filteredPokemon = useMemo(() => {
    const listToFilter = searchTerm ? allPokemonData?.results : paginatedData?.results;
    return listToFilter?.filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    ) || [];
  }, [searchTerm, allPokemonData?.results, paginatedData?.results]);

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(totalPokemonCount / ITEMS_PER_PAGE);
    const currentPageNumber = Math.floor(currentPageOffset / ITEMS_PER_PAGE) + 1;
    const canGoNext = currentPageOffset + ITEMS_PER_PAGE < totalPokemonCount;
    const canGoPrevious = currentPageOffset > 0;

    return { totalPages, currentPageNumber, canGoNext, canGoPrevious };
  }, [totalPokemonCount, currentPageOffset]);

  const handleNextPage = useCallback(() => {
    if (paginationInfo.canGoNext) {
      startTransition(() => {
        setCurrentPageOffset(prev => prev + ITEMS_PER_PAGE);
      });
      window.scrollTo(0, 0);
    }
  }, [paginationInfo.canGoNext]);

  const handlePreviousPage = useCallback(() => {
    if (paginationInfo.canGoPrevious) {
      startTransition(() => {
        setCurrentPageOffset(prev => prev - ITEMS_PER_PAGE);
      });
      window.scrollTo(0, 0);
    }
  }, [paginationInfo.canGoPrevious]);

  const LoadingSpinner = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando Pokémon...</p>
      </div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <p className="text-red-500 font-semibold">
          Error cargando los Pokémon. Por favor, inténtalo de nuevo más tarde.
        </p>
      </div>
    </div>
  );

  const EmptyMessage = () => (
    <div className="text-center py-8">
      <p className="text-gray-600">No se encontraron Pokémon con "{searchTerm}"</p>
    </div>
  );

  // Cargando: si hay búsqueda, esperamos los datos completos
  if ((isLoadingPage && !searchTerm) || (isLoadingAll && searchTerm)) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Pokédex</h1>

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
        <Link
          to="/pokecrub"
          className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                     text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg 
                     transform hover:scale-105 transition duration-300 ease-in-out
                     inline-flex items-center gap-2'>
          <span>⚡</span>
          ¡Crea tu propio pokemon!
          <span>⚡</span>
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      {isPending && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Actualizando...</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {filteredPokemon.length === 0 && searchTerm && <EmptyMessage />}

      {!searchTerm && paginationInfo.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={!paginationInfo.canGoPrevious || isLoadingPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md
                       transition duration-300 ease-in-out transform hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                       disabled:hover:scale-100"
          >
            Anterior
          </button>

          <span className="text-gray-700 font-medium text-lg">
            Página {paginationInfo.currentPageNumber} de {paginationInfo.totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={!paginationInfo.canGoNext || isLoadingPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md
                       transition duration-300 ease-in-out transform hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                       disabled:hover:scale-100"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
