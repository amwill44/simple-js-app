let unit = 'cm';

let pokemonList = [
    { name: 'Bulbasaur', height: 70, unit: unit, type: ['grass', 'poison']},
    { name: 'Charmander', height: 60, unit: unit, type: ['fire']},
    { name: 'Squirtle', height: 50, unit: unit, type: ['water']},
    { name: 'Pikachu', height: 40, unit: unit, type: ['electric']}
];

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    let output = pokemon.name + ' (height: ' + pokemon.height + unit + ')'; 

    if (pokemon.height > 65) {
        output += ' - Wow, that\'s big!';
    }
    document.write(output + '<br>');
}