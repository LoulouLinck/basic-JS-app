let pokemonRepository = (function() { //wraps pokemonList arrray in IIFE
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // API to which app will make requests 

function getAll() { // returns all pokemon in pokemonList
  return pokemonList;
}

function add(pokemon) { //adds pokemon object to array pokemonList
  if (typeof pokemon === 'object' && //pokemon must be an object
     Object.keys(pokemon) === ['name', 'height', 'types']) { //with the keys: name, height and types 
   pokemonList.push(pokemon); 
  }
  
}

function addlistItem(pokemon){
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

function showDetails(pokemon){ // logs pokemon object 
console.log(pokemon);
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
    });
  }).catch(function(e) {
    console.error(e);
  })
}
}

return {
getAll:getAll,
add: add,
addlistItem: addlistItem,
loadList: loadList
};
})();

pokemonRepository.loadList().then(function(){
//access array pokemonList inside IIFE w/ its returned public function getAll()
//and calling pokemonRepository instead of pokemonList
  pokemonRepository.getAll().forEach(function(pokemon) { 
    pokemonRepository.addlistItem(pokemon); //ref. the variable holding the IIFE, call addListItem(), pass returned parameter 
  });
});