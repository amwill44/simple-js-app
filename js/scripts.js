

let pokemonRepository = (function () {

    let unit = 'cm';

    let pokemonList = [
        { name: 'Bulbasaur', height: 70, unit: unit, type: ['grass', 'poison']},
        { name: 'Charmander', height: 60, unit: unit, type: ['fire']},
        { name: 'Squirtle', height: 50, unit: unit, type: ['water']},
        { name: 'Pikachu', height: 40, unit: unit, type: ['electric']}
    ];
    
    function showDetails(pokemon) {
        console.log (pokemon);
    }

    function addButtonEventListener(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-button'); 

        listItem.appendChild(button);
        ul.appendChild(listItem);

        addButtonEventListener(button, pokemon);
    }

    return {
        getAll: function () {
            return pokemonList;
        }, 
        add: function (pokemon) {
            if (typeof pokemon !== 'object') {
                console.error('Error: Pokemon must be an object.');
                return;
            }
            if (!pokemon.name || typeof pokemon.name !== 'string') {
                console.error('Error: Pokemon must have a name.');
                return;
            }
            if (!pokemon.height || typeof pokemon.height !== 'number' || pokemon.height <= 0) {
                console.error('Error: Pokemon must have a positive height.');
                return;
            }   
            if (!pokemon.type || !Array.isArray(pokemon.type)) {
                console.error('Error: Pokemon must have a type.');
                return;
            }
            pokemonList.push(pokemon);
            console.log('Pokemon "${pokemon.name}" added successfully!');   
        },
        find: function (name) {
            for (let pokemon of pokemonList) {
                if (pokemon.name.toLowerCase() === name.toLowerCase()) {
                    return pokemon;
                }
            }
            return null;
        },
        addListItem: addListItem
    };
})();

pokemonRepository.add({name: 'Mew', height: 40, unit: 'cm', type: ['psychic']});



pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
}); 


