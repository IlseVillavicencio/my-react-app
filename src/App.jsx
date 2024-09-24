import { useEffect, useState } from 'react';
import './App.css';
import CardDescription from './components/cardDescription';

function App() {
  const [search, setSearch] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Eliminar la lógica para obtener la lista completa de Pokémon
  // ya que no la necesitarás

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
    setPokemonData(null); // Limpiar datos anteriores cuando el usuario escribe
  };

  const fetchPokemon = (pokemonName) => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = {
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((typeInfo) => typeInfo.type.name),
          abilities: data.abilities.map((abilityInfo) => abilityInfo.ability.name),
          stats: data.stats,
        };
        setPokemonData(formattedData);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setPokemonData(null);
        setLoading(false);
      });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Evitar comportamiento predeterminado
    if (search) {
      fetchPokemon(search.toLowerCase());
      setHasSearched(true); // Cambiar estado del buscador
    } else {
      setError('Por favor, ingrese un nombre');
    }
  };

  return (
    <div className='container'>
      <h1>PokemonAPI</h1>
      <h2>Buscar Pokémon</h2>

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder='Buscar Pokémon...'
          value={search}
          onChange={handleSearchChange}
          className='search-input'
        />
        <button type='submit'>Buscar</button>
      </form>

      {error && <p>{error}</p>}
      {loading && <p>Cargando Pokémon...</p>}

      {/* Mostrar datos del Pokémon si se ha realizado la búsqueda */}
      {hasSearched && pokemonData && (
        <div className='pokemon-grid'>
          <CardDescription
            key={pokemonData.name}
            name={pokemonData.name}
            image={pokemonData.image}
            types={pokemonData.types}
            abilities={pokemonData.abilities}
            stats={pokemonData.stats}
            className="expanded" // Agregar clase expandida
          />
        </div>
      )}
    </div>
  );
}

export default App;



