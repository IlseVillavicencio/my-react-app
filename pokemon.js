const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pokemonList() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    .then(response => response.json())
    .then(data => {
        
        data.results.forEach(pokemon => {
            const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            console.log(pokemonName);
        });
        //Solicita al usuario el nombre del Pokémon
        rl.question('Ingrese el nombre de un Pokémon: ', (pokemonName) => {
            pokemonDetails(pokemonName);
            rl.close();
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function pokemonDetails(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then(response => response.json())
    .then(data => {
        // Imprime el nombre del Pokémon
        console.log(`Nombre: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`);
        // Imprime los tipos del Pokémon
        console.log('Tipo(s):', data.types.map(typeInfo => typeInfo.type.name).join(', '));
        // Imprime las habilidades del Pokémon
        console.log('Habilidades:', data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '));
        // Imprime las estadísticas del Pokémon
        console.log('Stats:');
        data.stats.forEach(stat => {
            console.log(`  ${stat.stat.name}: ${stat.base_stat}`);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Llamada a las funciones
pokemonList();
//pokemonDetails('pikachu');