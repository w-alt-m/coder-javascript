const pokemones = [
    { nombre: "pikachu", tipo: "electrico", nivel: 12 },
    { nombre: "charmander", tipo: "fuego", nivel: 10 },
    { nombre: "squirtle", tipo: "agua", nivel: 11 }
];

let listaPokemones = pokemones.map(pokemon => pokemon.nombre).join('\n')

alert("Bienvenido a la pokédex. Pokemones disponibles: \n" + listaPokemones)

function buscarPokemon(nombreBuscado) {
    for (let pokemon of pokemones) {
        if (pokemon.nombre.includes(nombreBuscado)) {
            return pokemon
        }
    }
}

let nombreBuscado = prompt("Ingrese el nombre del pokemon que desea buscar")

let pokemonEncontrado = buscarPokemon(nombreBuscado)

alert(`Pokemon: ${pokemonEncontrado.nombre} \nTipo: ${pokemonEncontrado.tipo} \nNivel: ${pokemonEncontrado.nivel}`)

let accionPokedex = prompt(`¿Qué acción desea realizar? Ingrese el número de la acción: \n 1. Curar pokémon \n 2. Soltar pokémon`)

