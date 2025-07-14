// src/components/PokemonList.tsx
import React, { useState } from 'react';
import { useGetPokemonsQuery, useCreatePokemonMutation, useDeletePokemonMutation, useUpdatePokemonMutation } from '../store/pokeCrubApi';
import type { Pokemon } from '../schemas/pokemonCrub';
import { Link } from 'react-router-dom';


export const PokeCrub: React.FC = () => {
  const { data: pokemons, isLoading, error } = useGetPokemonsQuery();
  const [createPokemon] = useCreatePokemonMutation();
  const [deletePokemon] = useDeletePokemonMutation();
  const [updatePokemon] = useUpdatePokemonMutation();
  
  // Estados para el formulario de crear
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [attack, setAttack] = useState('');
  const [level, setLevel] = useState('');

  // Estados para el formulario de editar
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');
  const [editAttack, setEditAttack] = useState('');
  const [editLevel, setEditLevel] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && type && attack && level) {
      try {
        await createPokemon({ name, type, attack: Number(attack), level: Number(level) }).unwrap();
        setName('');
        setType('');
        setAttack('');
        setLevel('');
      } catch (error) {
        console.error('Error creating pokemon:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este Pokémon?')) {
      try {
        await deletePokemon(id).unwrap();
      } catch (error) {
        console.error('Error deleting pokemon:', error);
      }
    }
  };

  const startEdit = (pokemon: Pokemon) => {
    setEditingPokemon(pokemon);
    setEditName(pokemon.name || '');
    setEditType(pokemon.type || '');
    setEditAttack(pokemon.attack?.toString() || '0');
    setEditLevel(pokemon.level?.toString() || '1');
  };

  const cancelEdit = () => {
    setEditingPokemon(null);
    setEditName('');
    setEditType('');
    setEditAttack('');
    setEditLevel('');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPokemon && editName && editType && editAttack && editLevel) {
      try {
        await updatePokemon({
          id: editingPokemon.id,
          data: { 
            name: editName, 
            type: editType,
            attack: Number(editAttack),
            level: Number(editLevel)
          }
        }).unwrap();
        cancelEdit();
      } catch (error) {
        console.error('Error updating pokemon:', error);
      }
    }
  };

if (isLoading) return <div className="text-center p-4">Cargando...</div>;
  if (error) {
    console.error('Error:', error);
    return <div className="text-red-500 text-center p-4">Error cargando datos. Revisa la consola.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Botón para volver */}
          <div className="mb-6">
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
            >
              ← Volver a la lista
            </Link>
          </div>
      
      <h1 className="text-3xl font-bold text-black  text-center mb-8">Lista de Pokémon</h1>
      
      {/* Formulario para agregar */}
      <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del Pokémon"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Attack"
            value={attack}
            onChange={(e) => setAttack(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Nivel"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Agregar Pokémon
        </button>
      </form>

      {/* Formulario de edición (aparece cuando se está editando) */}
      {editingPokemon && (
        <form onSubmit={handleUpdate} className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8 border-l-4 border-yellow-400">
          <h2 className="text-xl font-semibold mb-4">Editando: {editingPokemon.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del Pokémon"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              placeholder="Tipo"
              value={editType}
              onChange={(e) => setEditType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="number"
              placeholder="Attack"
              value={editAttack}
              onChange={(e) => setEditAttack(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="number"
              placeholder="Level"
              value={editLevel}
              onChange={(e) => setEditLevel(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de Pokémon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pokemons?.map((pokemon) => (
          <div key={pokemon.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-800">{pokemon.name}</h3>
            <p className="text-gray-600">Tipo: {pokemon.type}</p>
            {pokemon.level && <p className="text-gray-600">Nivel: {pokemon.level}</p>}
            {pokemon.attack && <p className="text-gray-600">Ataque: {pokemon.attack}</p>}
          
          {/* Botones de acción */}
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(pokemon)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(pokemon.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};