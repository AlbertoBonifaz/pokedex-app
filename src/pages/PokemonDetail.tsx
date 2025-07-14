// PokemonDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useGetPokemonDetailQuery } from '../store/pokemonApi';

const PokemonDetail: React.FC = () => {
  // Obtiene el nombre del Pokémon desde la URL
  const { name } = useParams<{ name: string }>();
  
  // Usa el hook para obtener los detalles del Pokémon 
  const { data: pokemon, isLoading, error } = useGetPokemonDetailQuery(name!);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando detalles del Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">
            Error cargando los detalles del Pokémon
          </p>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

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

      {/* Información principal */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="text-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-64 h-64 mx-auto object-contain"
            />
          </div>

          {/* Información básica */}
          <div className='text-gray-800'>
            <h1 className="text-4xl font-bold capitalize mb-4 text-gray-800">
              {pokemon.name}
            </h1>
            
            <div className="space-y-3 mb-6">
              <p className="text-lg"><strong>ID:</strong> #{pokemon.id}</p>
              <p className="text-lg"><strong>Altura:</strong> {pokemon.height / 10} m</p>
              <p className="text-lg"><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
              <p className="text-lg"><strong>Experiencia Base:</strong> {pokemon.base_experience}</p>
            </div>

            {/* Tipos */}
            <div>
              <h3 className="text-xl font-bold mb-3">Tipos</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-lg capitalize font-medium"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Habilidades */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Habilidades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pokemon.abilities.map((ability, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold capitalize text-gray-800">
                  {ability.ability.name.replace('-', ' ')}
                </p>
                {ability.is_hidden && (
                  <span className="text-sm text-purple-600 font-medium">
                    (Habilidad Oculta)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Estadísticas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold capitalize text-gray-800">
                    {stat.stat.name.replace('-', ' ')}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;