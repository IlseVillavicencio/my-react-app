import { useEffect, useState } from 'react';
import './App.css';
import CardDescription from './components/cardDescription';

function App() {
  const [search, setSearch] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setFilteredPokemon(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error al obtener la lista de Pokemon');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setSearch(searchInput);

    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchInput)
    );
    setFilteredPokemon(filtered);
    setPokemonData(null); // Limpiar los datos del Pokémon seleccionado
  };

  const fetchPokemon = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokemon no encontrado');
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
      })
      .catch((error) => {
        setError(error.message);
        setPokemonData(null);
      });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Evita comportamiento predeterminado
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
      <h2>Buscar Pokemon</h2>

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

      {loading ? (
    <p>Cargando Pokémon...</p>
) : (
    <div className='pokemon-grid'>
        {hasSearched && pokemonData ? (
            <CardDescription
                key={pokemonData.name}
                name={pokemonData.name}
                image={pokemonData.image}
                types={pokemonData.types}
                abilities={pokemonData.abilities}
                stats={pokemonData.stats}
                className="expanded" // Agregar clase expandida
            />
        ) : (
            filteredPokemon.map((pokemon) => (
                <CardDescription
                    key={pokemon.name}
                    name={pokemon.name}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                    types={[]} // No mostrar tipos
                    abilities={[]} // No mostrar habilidades
                    stats={[]} // No mostrar stats
                    className="" // Clase vacía para el tamaño inicial
                />
            ))
        )}
    </div>
  )}
    </div>
  );

}

export default App;


