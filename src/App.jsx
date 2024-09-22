import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const[search, setSearch]= useState('');
  const[pokemonData, setPokemonData] = useState(null); //Estado para almacenar datos del Pokémon
  const[error, setError] = useState(null); // Estado para manejar errores 
  
  
  //Llamada a la API
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then((response) => response.json())
    .then((data) => {
      setPokemonList(data.results);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setLoading(false);
    });
  }, []);


  //Funcion para manejar el cambio en el campo de busqueda
  const handleSearchChange=(event)=> {
    setSearch(event.target.value); //Actualiza el estado de busqueda cuando el usuario escribe
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    if (search) {
      fetchPokemon(search.toLowerCase());
    } else {
      setError('Por favor, ingrese un nombre')
    }
    
  };

  //Funcion para buscar un pokemon
  const fetchPokemon = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Pokemon no encontrado');
      }
      return response.json();
    })
    .then((data) => {
      setPokemonData(data);
      setError(null); // Limpia cualquier error previo
    })

    .catch((error) => {
      setError(error.message);
      setPokemonData(null); //Limpia los datos del pokemon en caso de error 
    });
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
      <button type='sumbit'>Buscar</button>
      </form>

      {error && <p>{error}</p>} {/*Muestra el mensaje de error si existe*/}

      {pokemonData && (
        <div>
          <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Tipos: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          <p>Habilidades: {pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
          <p>Stats:</p>
          <u1>
            {pokemonData.stats.map(stat => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </u1>
        </div>
      )}  
    </div>
  );
}

export default App
