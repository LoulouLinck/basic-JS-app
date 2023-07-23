let pokemonRepository = (function() { //wraps pokemonList arrray in IIFE
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // API to which app will make requests 
  let modalContainer = document.querySelector('#modal-container');

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  function showModal() {
    modalContainer.classList.add('is-visible');
  }
   document.querySelector('button').addEventListener('click', () => {
   showModal();
});

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

function addListItem(pokemon){
  let pokemonUl = document.querySelector('.pokemon-list'); // var assigned to <ul = "pokemon-list"> 
  let listItem = document.createElement('li'); // creation of a list item
  let button = document.createElement('button'); // creation of a button
  button.innerText = pokemon.name; // set text in button element as element's names returned from pokemonRepository's array: pokemonList through IIFE access: getAll()  
  button.classList.add('pokeButton'); // set new class attribute to our button
  listItem.appendChild(button); // append button
  pokemonUl.appendChild(listItem); // append li

  button.addEventListener('click', function(){ // add event listener to button's of pokemon listed and runs function showDetails to each Pokemon objects
    showDetails(pokemon);
  });
}

function showDetails(pokemon){ // logs pokemon object 
  pokemonRepository.loadDetails(pokemon).then(function(){
    showModal();
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