let loaded = 0;
let rendered = 0;

async function initialisation() {
  let content = document.getElementById("content");
  content.innerHTML = ``;
  loadApi(9);
}

async function loadApi(quantity) {
  const index = loaded + quantity;

  if (index < pokemonList.length) {
    for (loaded; loaded < index; loaded++) {
      let querryPokemon = pokemonList[loaded].nameEnglish;
      let url = `https://pokeapi.co/api/v2/pokemon/${querryPokemon}`;
      let pokemon = await fetch(url);
      pokemon = await pokemon.json();
      pokemonExtract(loaded, pokemon);
      renderCards(1); //Karten einzeln rendern
    }
  }

  // renderCards(quantity); //Karten gesammelt rendern
}

function renderCards(quantity) {
  let content = document.getElementById("content");
  const index = rendered + quantity;

  for (rendered; rendered < index; rendered++) {
    content.innerHTML += /* html */ `
      <div class="card ${pokemonList[rendered].types[0]}" onclick="openDetail(${rendered})">
        <div class="card-header">
          <h2>${pokemonList[rendered].nameGerman}</h2>
          <h3># ${pokemonList[rendered].id} ${pokemonList[rendered].types[0]}</h3>
        </div>
        <img class="card-image" src="${pokemonList[rendered].image}" alt="${pokemonList[rendered].nameEnglish}">
      </div>
    `;
  }
}

function pokemonExtract(id, pokemon) {
  let moves = new Array();
  let types = new Array();

  for (let i = 0; i < pokemon.moves.length; i++) {
    moves.push(pokemon.moves[i].move.name);
  }

  for (let i = 0; i < pokemon.types.length; i++) {
    types.push(pokemon.types[i].type.name);
  }

  pokemonList[id] = Object.assign(pokemonList[id], {
    id: pokemon.id,
    height: pokemon.height,
    moves: moves,
    hp: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    specialAttack: pokemon.stats[3].base_stat,
    specialDefense: pokemon.stats[4].base_stat,
    speed: pokemon.stats[5].base_stat,
    types: types,
    image: pokemon.sprites.front_default
  });
}

function openDetail(id) {
  let dialog = document.getElementById("dialog");
  let card = document.getElementById("detail-card");

  dialog.classList.remove("d-none");

  card.innerHTML = /* html */ `
    <h1>Test</h1>
    <div>${pokemonList[id].types[0]}</div>
  `;
}
