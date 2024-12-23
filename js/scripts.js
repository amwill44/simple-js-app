let pokemonRepository = (function () {
    let unit = 'cm';
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function getTypeColor(type) {
        const typeColors = {
            Normal: '#F3E5AB',
            Fire: '#FFD1BA',
            Water: '#ADD8E6',
            Electric: '#F9E79F',
            Grass: '#B8E994',
            Ice: '#D4F1F9',
            Fighting: '#F7C5CC',
            Poison: '#D7BCE8',
            Ground: '#EDD9A3',
            Flying: '#C4DDED',
            Psychic: '#FDC5C5',
            Bug: '#E3F6CE',
            Rock: '#D5CABD',
            Ghost: '#D7CEE8',
            Dragon: '#E6D5F7',
            Dark: '#A8A8A8',
            Steel: '#D9E2E6',
            Fairy: '#FAD9E6',
        };
        return typeColors[type] || '#FFFFFF'; // Default to white if type is not found
    }

    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.innerText = capitalizeFirstLetter(pokemon.name);
        button.classList.add('btn', 'btn-custom', 'w-100');

        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#pokemonModal');
        button.setAttribute('aria-label', `View details for ${capitalizeFirstLetter(pokemon.name)}`);

        // Fetch Pokémon details to get its type
        loadDetails(pokemon).then(() => {
            const types = pokemon.types.split(', '); // Assuming multiple types are comma-separated
            const color = getTypeColor(types[0]); // Use the first type for hover color

            // Add hover effect
            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = color;
            });
            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = ''; // Reset to default
            });
        });

        listItem.appendChild(button);
        ul.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then((response) => response.json())
            .then((json) => {
                json.results.forEach((item) => {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch((error) => {
                console.error('Error loading Pokemon list', error);
                alert('Unable to load Pokémon list. Please try again later.');
            });
    }

    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then((response) => response.json())
            .then((details) => {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types.map((type) => capitalizeFirstLetter(type.type.name)).join(', ');
            })
            .catch((error) => {
                console.error('Error loading Pokemon details', error);
                alert('Unable to load Pokémon details. Please try again later.');
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            let modalTitle = document.querySelector('#pokemonModalLabel');
            modalTitle.innerText = capitalizeFirstLetter(pokemon.name);

            let modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
            <img src="${pokemon.imageUrl}" class="img-fluid mb-3" alt="${pokemon.name}">
            <p><strong>Height:</strong> ${pokemon.height} ${unit}</p>
            <p><strong>Types:</strong> ${pokemon.types}</p>
            `;

            modalBody.setAttribute('id', 'modal-content-description');
            document.querySelector('#pokemonModal').setAttribute('aria-labelledby', 'modal-content-description');
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
});
