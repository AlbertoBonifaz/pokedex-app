import React, { useState } from 'react';
import { useGetPokemonListQuery } from '../store/pokemonApi';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

const PokemonList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useGetPokemonListQuery({ limit: 100, offset: 0 });

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredPokemon = data?.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm)
  ) || [];

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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">Error cargando los Pokémon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Pokédex
      </h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
      
      {filteredPokemon.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron Pokémon con "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;