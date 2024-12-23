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
                pokemon.types = details.types.map((type) => type.type.name).join(', ');
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

    function showModal(title, text, imageUrl, types, triggerButton) {
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
            hideModal(triggerButton);
        });

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let typesElement = document.createElement('p');
        typesElement.innerText = types;

        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = `${title} image`;

        modal.appendChild(closeButton);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(typesElement);
        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);

        modalContainer.classList.add('is-visible');

        modal.focus();
        trapFocus(modal);

        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                hideModal(triggerButton);
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideModal(triggerButton);
            }
        }, { once: true });
    }

    function hideModal(triggerButton) {
        const modalContainer = document.querySelector('#modal-container');
        if (modalContainer) {
            modalContainer.remove();
        }
        if (triggerButton) {
            triggerButton.focus(); 
        }
    }

    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
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


