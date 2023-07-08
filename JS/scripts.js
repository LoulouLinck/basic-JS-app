let pokemonRepository = (function() { //wraps pookemonList arrray in IIFEs
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

return {
getAll:getAll,
add: add
};
})();

//access array pokemonList inside IIFE w/ its returned public function getAll()
//and calling pokemonRepository instead od pokemonList
pokemonRepository.getAll().forEach(function(pokemon) { 
  let pokemonDetails = pokemon.name + " (height: " + pokemon.height + ")";
 
  if (pokemon.height > 1.1) {
    pokemonDetails += " - Wow that's big! ";
  }

  document.write(pokemonDetails + "<br>"); 

});
