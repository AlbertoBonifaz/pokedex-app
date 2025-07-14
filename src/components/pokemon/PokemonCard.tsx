// PokemonCard.tsx
import { useGetPokemonDetailQuery } from '../../store/pokemonApi';
import { Link } from 'react-router-dom'
import type { PokemonCardProps } from '../../types/pokemon';

const PokemonCard: React.FC<PokemonCardProps> = ({ name }) => {
  const { data: pokemon, isLoading, error } = useGetPokemonDetailQuery(name);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-red-500">Error cargando {name}</p>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <img
        src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto mb-4 object-contain"
      />
      <h3 className="text-xl-black font-bold text-center capitalize mb-2 text-black">
        {pokemon.name}
      </h3>
      <div className="text-center text-gray-600 mb-3">
        <p>#{pokemon.id}</p>
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
          >
            {type.type.name}
          </span>
        ))}
      </div>

      {/* BOTON INFO */}
      <div className='text-center mt-2'>
        <Link to={`/pokemon/${pokemon.name}`}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors inline-block' 
        >Información</Link>

      </div>

    </div>
  );
};

export default PokemonCard;