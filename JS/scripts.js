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

pokemonList.forEach(function(pokemon) {
  let pokemonDetails = pokemon.name + " (height: " + pokemon.height + ")";
 
  if (pokemon.height > 1.1) {
    pokemonDetails += " - Wow that's big! ";
  }

    document.write(pokemonDetails + "<br>"); 

});