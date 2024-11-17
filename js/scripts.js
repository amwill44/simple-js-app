

let pokemonRepository = (function () {

    let unit = 'cm';

    let pokemonList = [
        { name: 'Bulbasaur', height: 70, unit: unit, type: ['grass', 'poison']},
        { name: 'Charmander', height: 60, unit: unit, type: ['fire']},
        { name: 'Squirtle', height: 50, unit: unit, type: ['water']},
        { name: 'Pikachu', height: 40, unit: unit, type: ['electric']}
    ];

    return {
        getAll: function () {
            return pokemonList;
        }, 
        add: function (pokemon) {
            if (typeof pokemon === 'object' &&
                'name' in pokemon &&
                'height' in pokemon &&
                'type' in pokemon) {
                pokemonList.push(pokemon);
                } 
            else {
                console.error('Invalid Pokemon object');
            }
        }
    };
})();

pokemonRepository.add({name: 'Mew', height: 40, unit: 'cm', type: ['psychic']});

pokemonRepository.getAll().forEach(function(pokemon) {
    let output = pokemon.name + ' (height: ' + pokemon.height + pokemon.unit + ')'; 

    if (pokemon.height > 65) {
        output += ' - Wow, that\'s big!';
    }
    document.write(output + '<br>');
}); 

