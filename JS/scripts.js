let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // API to which app will make 
   let modalContainer = document.querySelector('#modal-container');
  
  function hideModal() {
  modalContainer.classList.remove('is-visible');
}
  window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});
  
  modalContainer.addEventListener('click', (e) => {
  // listener also triggered by clicks on modal: child of modalContainer.
  let target = e.target; 
  if (target === modalContainer) { //specifies modal should close only if click on overlay = turquoise part: modalContainer. 
    hideModal();
  }
});
  
   function showModal(title, text, img) {
      // Clears all existing modal content
      modalContainer.innerHTML = '';
    
      let modal = document.createElement('div');
      modal.classList.add('modal');
    
      // Adds the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X Close';
    
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
    
      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let imageElement = document.createElement("img");
      imageElement.setAttribute("src", img);
      imageElement.setAttribute("width", "50%");
      imageElement.setAttribute("height", "50%");
      imageElement.setAttribute("alt", "Pokemon image");

     
      modalContainer.appendChild(modal);
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
     closeButtonElement.addEventListener('click', hideModal);

      modalContainer.classList.add('is-visible');
    }
  
function getAll() { // returns all pokemon in pokemonList
  return pokemonList;
}

function add(pokemon) { //adds pokemon object to array pokemonList
  if (
    typeof pokemon === 'object' && //pokemon must be an object
    'name' in pokemon
    ){
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
  } 
}

function addListItem(pokemon){ // add a list of buttons to the array
  let pokemonUl = document.querySelector('.pokemon-list'); // var assigned to <ul = "pokemon-list"> 
  let listItem = document.createElement('li'); // creation of a list item
  listItem.classList.add('list-group-item'); //adds bootstrap
  listItem.classList.add('list-group-item-action'); //adds bootstrap hover styling
  let button = document.createElement('button'); // creation of a button
  button.innerText = pokemon.name; // set text in button element as element's names returned from pokemonRepository's array: pokemonList through IIFE access: getAll()  
  button.classList.add('pokeButton');// set new class attribute to our button
  button.classList.add('btn');  //adds bootstrap  utility classes 
  button.classList.add('btn-light'); //adds bootstrap  utility classes styling
  listItem.appendChild(button); // append button
  pokemonUl.appendChild(listItem); // append li

  button.addEventListener('click', function(){ // add event listener to button's of pokemon listed and runs function showDetails to each Pokemon objects
    showDetails(pokemon);
  });
}

function showDetails(pokemon){ // logs pokemon object 
pokemonRepository.loadDetails(pokemon).then(function(){   
  showModal(pokemon.name, " Height: " + pokemon.height, pokemon.imageUrl);
  console.log(pokemon);  
  });
}
  
function loadList(){
  return fetch(apiURL).then(function(response){
    return response.json();
  }).then(function(json) {
    json.results.forEach(function(item) {
      let pokemon=  {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      console.log(pokemon);
    });
  }).catch(function(e) {
    console.error(e);
  })
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

return {
getAll:getAll,
add: add,
addListItem: addListItem,
loadList: loadList,
loadDetails: loadDetails,
showDetails: showDetails
};
})();

pokemonRepository.loadList().then(function(){
//access array pokemonList inside IIFE w/ its returned public function getAll()
//and calling pokemonRepository instead of pokemonList
  pokemonRepository.getAll().forEach(function(pokemon) { 
    pokemonRepository.addListItem(pokemon); //ref. the variable holding the IIFE, call addListItem(), pass returned parameter 
  });
});