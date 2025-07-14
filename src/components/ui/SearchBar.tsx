import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SearchBarProps } from '../../types/pokemon';
import { searchSchema, type SearchFormData} from '../../schemas/pokemonSchema'
import useDebounce from '../hooks/useDebounce';
import { useEffect } from 'react';



const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const searchValue = watch('search', '');
  const debouncedSearch  = useDebounce(searchValue, 500);
  // Efecto para llamar a onSearch solo cuando el valor debounced cambia
  useEffect(() => {
    if (debouncedSearch.trim() !== '') {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.search);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            {...register('search')}
            type="text"
            placeholder="Buscar Pokémon..."
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.search && (
            <p className="text-red-500 text-sm mt-1">{errors.search.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;