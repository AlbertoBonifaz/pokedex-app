import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  search: z.string().min(1, 'Por favor ingresa un término de búsqueda'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

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