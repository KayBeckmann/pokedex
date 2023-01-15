let loaded = 0;
let rendered = 0;
let loadedPokemon = new Array();

async function initialisation() {
  let content = document.getElementById("content");
  content.innerHTML = ``;
  loadApi(9);
  console.log(loadedPokemon);
}

async function loadApi(quantity) {
  const index = loaded + quantity;

  if (index < pokemonList.length) {
    for (loaded; loaded < index; loaded++) {
      let querryPokemon = pokemonList[loaded].nameEnglish;
      let url = `https://pokeapi.co/api/v2/pokemon/${querryPokemon}`;
      let pokemon = await fetch(url);
      pokemon = await pokemon.json();
      pokemonExtract(pokemon);
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
      <div class="card" onclick="openDetail(${rendered})">
        <div class="card-header">
          <h2>${loadedPokemon[rendered].nameEnglish}</h2>
          <h3># ${loadedPokemon[rendered].id}</h3>
        </div>
        <img src="${loadedPokemon[rendered].image}" alt="${loadedPokemon[rendered].nameEnglish}">
      </div>
    `;
  }
}

function pokemonExtract(pokemon) {
  let moves = new Array();
  let types = new Array();

  for (let i = 0; i < pokemon.moves.length; i++) {
    moves.push(pokemon.moves[i].move.name);
  }

  for (let i = 0; i < pokemon.types.length; i++) {
    types.push(pokemon.types[i].type.name);
  }

  let newpokemon = {
    id: pokemon.id,
    nameEnglish: pokemon.forms[0].name,
    nameGerman: ``,
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
  };
  loadedPokemon.push(newpokemon);
}

function openDetail(id) {
  let dialog = document.getElementById("dialog");
  let card = document.getElementById("detail-card");

  dialog.classList.remove("d-none");

  card.innerHTML = /* html */ `
    <h1>Test</h1>
    <div>${id}</div>
  `;
}
