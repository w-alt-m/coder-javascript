const pokemones = [
    { nombre: "pikachu", tipo: "electrico", nivel: 12 },
    { nombre: "charmander", tipo: "fuego", nivel: 10 },
    { nombre: "squirtle", tipo: "agua", nivel: 11 }
];

function buscarPokemon(nombreBuscado) {
    for (let pokemon of pokemones) {
        if (pokemon.nombre === nombreBuscado) {
            return pokemon
        }
    }
}

let nombreBuscado = prompt("ingrese el nombre del pokemon que desea buscar")

let pokemonEncontrado = buscarPokemon(nombreBuscado)

alert(`Pokemon: ${pokemonEncontrado.nombre}, Tipo: ${pokemonEncontrado.tipo}, Nivel: ${pokemonEncontrado.nivel}`)

prompt(`¿Qué acción desea realizar? \n 1. Curar pokémon \n  \n 2. Soltar pokémon`)