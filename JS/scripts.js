let pokemonList = [

  pokemon1 = {
         name: 'Balbusaur',
         height: 0.7,
         types: ['grass', 'poison'],
    };

  pokemon2 = {
         name: 'Ninetales',
         height: 1.1,
         types: ['Fire'],

    };

  pokemon3 = {
         name: 'Mienshao',
         height: 1.4,
         types: ['Fighting'],

    };
];

// loop to go through all objects in PokemonList
// conditional: if height of pokemon object in pokemonList > 1.1 add special msg, else write only name and height in DOM.
for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 1.1) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow that's big! ");
  } else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
  }
}
