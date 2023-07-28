let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150"; // API to which app will make
  let modalContainer = document.querySelector("#modal-container");

  //   function hideModal() {
  //   modalContainer.classList.remove('is-visible');
  // }
  //   window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });

  //   modalContainer.addEventListener('click', (e) => {
  //   // listener also triggered by clicks on modal: child of modalContainer.
  //   let target = e.target;
  //   if (target === modalContainer) { //specifies modal should close only if click on overlay = turquoise part: modalContainer.
  //     hideModal();
  //   }
  // });

  function add(pokemon) {
    //adds pokemon object to array pokemonList
    if (typeof pokemon === "object" && "name" in pokemon) {
      //pokemon must be an object
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct.");
    }
  }

  function getAll() {
    // returns all pokemon items in pokemonList array
    return pokemonList;
  }

  // Create a search bar element.
  const searchBar = document.querySelector(".search-bar");
  // Add a keyup event listener to the search bar.
  searchBar.addEventListener("input", (event) => {
    // Get the search string from the user input.
    const searchString = event.target.value.toLowerCase();

    // Filter the API generated list based on the search string.
    const filteredList = pokemonList.filter((item) => {
      return item.name.toLowerCase().includes(searchString);
    });
    // Update the list of items in the DOM.
    document.querySelector(".pokemon-list").innerHTML = "";
    filteredList.forEach((item) => {
      addListItem(item);
    });
  });

  function addListItem(pokemon) {
    // add a list of buttons to the array
    let pokemonUl = document.querySelector(".pokemon-list"); // var assigned to <ul = "pokemon-list">
    let listItem = document.createElement("li"); // creation of a list item
    listItem.classList.add("list-group-item"); //adds bootstrap
    listItem.classList.add("list-group-item-action"); //adds bootstrap hover styling
    let button = document.createElement("button"); // creation of a button
    button.innerText += pokemon.name; // set text in button element as element's names returned from pokemonRepository's array: pokemonList through IIFE access: getAll()
    button.classList.add("pokeButton"); // set new class attribute to our button
    button.classList.add("btn"); //adds bootstrap  utility classes
    button.classList.add("btn-light"); //adds bootstrap  utility classes styling
    button.setAttribute("data-toggle", "modal"); //bootstrap adds e.listener
    button.setAttribute("data-target", "#exampleModal"); //bootstrap targets selected element per ID
    listItem.appendChild(button); // append button
    pokemonUl.appendChild(listItem); // append li

    button.addEventListener("click", function () {
      // add event listener to button's of pokemon listed and runs function showDetails to each Pokemon objects
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    // logs pokemon object
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.id = details.id;
        item.height = details.height / 10;
        item.types = item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types[i] = details.types[i]["type"]["name"];
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    // Clears all existing modal content
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");
    let modalFooter = document.querySelector(".modal-footer");

    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    // name element of modal content
    modalTitle.innerText = pokemon.id + ". " + pokemon.name + "\n";
    let nameElement = document.createElement("h1");
    nameElement.textContent = pokemon.name;
    let imageElement = document.createElement("img");
    imageElement.className = "modal-img";
    imageElement.style.width = "50%";
    imageElement.src = pokemon.imageUrl;
    let heightElement = document.createElement("p");
    heightElement.textContent = "Height: " + pokemon.height;
    let typeElement = document.createElement("p");
    typeElement.textContent = "Types: " + pokemon.types[0];
    if (pokemon.types.length > 1) {
      typeElement.innerText += ", " + pokemon.types[1];
    }

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typeElement);

    // Footer previous + next buttons
    let leftButtonElement = document.querySelector(".previous-button");
    leftButtonElement.addEventListener("click", previousModal);
    let rightButtonElement = document.querySelector(".next-button");
    rightButtonElement.addEventListener("click", nextModal);
    // Modal nav buttons in footer
    function nextModal() {
      showModal(pokemonList[pokemon.id]);
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        nextModal();
      }
    });

    function previousModal() {
      showModal(pokemonList[pokemon.id - 2]);
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        previousModal();
      }
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  //access array pokemonList inside IIFE w/ its returned public function getAll()
  //and calling pokemonRepository instead of pokemonList
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon); //ref. the variable holding the IIFE, call addListItem(), pass returned parameter
  });
});
