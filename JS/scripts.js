let pokemonRepository = (function() { //wraps pokemonList arrray in IIFE
  let pokemonList = [

 {
         name: 'Balbusaur',
         height: 0.7,
         types: ['grass', 'poison'],
    },

 {
         name: 'Ninetales',
         height: 1.1,
         types: ['Fire'],

    },

  {
         name: 'Mienshao',
         height: 1.4,
         types: ['Fighting'],

    },
];

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
}

return {
getAll:getAll,
add: add,
addlistItem: addlistItem
};
})();


//access array pokemonList inside IIFE w/ its returned public function getAll()
//and calling pokemonRepository instead of pokemonList
pokemonRepository.getAll().forEach(function(pokemon) { 
pokemonRepository.addlistItem(pokemon); //ref. the variable holding the IIFE, call addListItem(), pass returned parameter 

});

