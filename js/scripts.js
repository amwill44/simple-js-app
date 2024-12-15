

let pokemonRepository = (function () {

    let unit = 'cm';
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    
    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        listItem.appendChild(button);
        ul.appendChild(listItem);

        button.addEventListener('click', function(event) {
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
            .catch((error) => 
                console.error('Error loading Pokemon list', error));
    }
    
    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then((response) => response.json())
            .then((details) => {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
                console.log(pokemon);
            })
            .catch((error) => 
                console.error('Error loading Pokemon details', error));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal (
                pokemon.name,
                `height: ${pokemon.height} ${unit}`,
                pokemon.imageUrl,
                // pokemon.types.map(type => type.type.name).join(', ') 
            );
        });
    }

    function showModal(title, text, imageUrl) {
        const existingModal = document.querySelector('#modal-container');
        if (existingModal) {
            existingModal.remove();
        }
        
        let modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';

        let modal = document.createElement('div'); 
        modal.classList.add('modal');

        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
            hideModal();
        });

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        // let typesElement = document.createElement('p');
        // typesElement.innerText = `Types: ${types}`; 
    
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = `${title} image`;

        modal.appendChild(closeButton);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        // modal.appendChild(typesElement);
        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                hideModal();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideModal();
            }
        }, { once:true });
    }

    function hideModal() {
        const modalContainer = document.querySelector('#modal-container');
        if (modalContainer) {
            modalContainer.remove();
        }
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

