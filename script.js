async function loadApi(){
  let querryPokemon = `ditto`;
  let url = `https://pokeapi.co/api/v2/pokemon/${querryPokemon}`;

  let pokemon = await fetch(url);
  pokemon = await pokemon.json();

  console.log(pokemon);
}