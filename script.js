let loaded = 0;
let rendered = 0;

async function initialisation() {
  let content = document.getElementById("content");
  content.innerHTML = ``;
  loadApi(9);
}

async function loadApi(quantity) {
  let index = loaded + quantity;
  let buttons = document.getElementById("buttons");

  if (index >= pokemonList.length) {
    index = pokemonList.length;
    buttons.classList.add("d-none");
    alert("Alle Pokemon geladen!");
  }

  for (loaded; loaded < index; loaded++) {
    let querryPokemon = pokemonList[loaded].nameEnglish;
    let url = `https://pokeapi.co/api/v2/pokemon/${querryPokemon}`;
    let pokemon = await fetch(url);
    pokemon = await pokemon.json();
    pokemonExtract(loaded, pokemon);
    renderCards(1); //* Karten einzeln rendern
  }
  //! Laden fühlt sich flüssiger an, wenn Karten einzeln gerendert werden.
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
          <h3># ${pokemonList[rendered].id}</h3>
        </div>
        <img class="card-image" src="${pokemonList[rendered].image}" alt="${pokemonList[rendered].nameEnglish}">
      </div>
    `;
  }
}

function pokemonExtract(id, pokemon) {
  //Object.assign -> Alten Wert und neuen Wert zusammenführen
  pokemonList[id] = Object.assign(pokemonList[id], {
    id: pokemon.id,
    height: pokemon.height,
    moves: extractMoves(id, pokemon),
    hp: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    specialAttack: pokemon.stats[3].base_stat,
    specialDefense: pokemon.stats[4].base_stat,
    speed: pokemon.stats[5].base_stat,
    types: extrctTypes(id, pokemon),
    image: pokemon.sprites.front_default
  });
}

function extractMoves(id, pokemon) {
  let moves = new Array();

  for (let i = 0; i < pokemon.moves.length; i++) {
    moves.push(pokemon.moves[i].move.name);
  }

  return moves;
}

function extrctTypes(id, pokemon) {
  let types = new Array();

  for (let i = 0; i < pokemon.types.length; i++) {
    types.push(pokemon.types[i].type.name);
  }

  return types;
}

function openDetail(id) {
  let dialog = document.getElementById("dialog");
  let card = document.getElementById("detail-card");

  dialog.classList.remove("d-none");
  card.classList.add(pokemonList[id].types[0]);

  card.innerHTML = /* html */ `
    <h1>Deutscher Name: ${pokemonList[id].nameGerman}</h1>
    <h2>Englischer Name: ${pokemonList[id].nameEnglish}</h2>
    <img class="detail-img" src="${pokemonList[id].image}" alt="${
    pokemonList[id].nameEnglish
  }">

    <div class="detail-menu">${renderDetailMenu(id)}</div>
    <div class="details-card" id="details-card">DETAILS</div>

    <button class="btn-load bottom" onclick="closeDetail(${id})">Schließen</button>
  `;
  renderBasicData(id);
}

function renderDetailMenu(id) {
  let menu = /* html */ `
  <div class="btn-load" onclick="renderBasicData(${id})">Basis Daten</div>
  <div class="btn-load" onclick="renderAttack(${id})">Angriffe</div>
  `;

  return menu;
}

function renderBasicData(id) {
  let basicData = document.getElementById("details-card");

  basicData.innerHTML = /* html */ `
  <div id="types"><h3>Typen: </h3>${renderTypes(id)}</div>
  <table>
    <tr>
      <td><h3>Größe:</h3></td>
      <td>${pokemonList[id].height}</td>
      <td></td>
    </tr>
    <tr>
      <td><label for="hp"><h3>Lebensenergie:</h3></label></td>
      <td>${pokemonList[id].hp}</td>
      <td><progress id="hp" value=${
        pokemonList[id].hp
      } max="200"></progress></td>
    </tr>
    <tr>
      <td><label for="attack"><h3>Angriff:</h3></label></td>
      <td>${pokemonList[id].attack}</td>
      <td><progress id="attack" value=${
        pokemonList[id].attack
      } max="200"></progress></td>
    </tr>
    <tr>
      <td><label for="defense"><h3>Verteidigung:</h3></label></td>
      <td>${pokemonList[id].defense}</td>
      <td><progress id="defense" value=${
        pokemonList[id].defense
      } max="200"></progress></td>
    </tr>
    <tr>
      <td><label for="special-attack"><h3>Spezialangriff:</h3></label></td>
      <td>${pokemonList[id].specialAttack}</td>
      <td><progress id="special-attack" value=${
        pokemonList[id].specialAttack
      } max="200"></progress></td>
    </tr>
    <tr>
      <td><label for="special-defense"><h3>Spezialverteidigung:</h3></label></td>
      <td>${pokemonList[id].specialDefense}</td>
      <td><progress id="special-defense" value=${
        pokemonList[id].specialDefense
      } max="200"></progress></td>
    </tr>
    <tr>
      <td><label for="speed"><h3>Geschwindigkeit</h3></label></td>
      <td>${pokemonList[id].speed}</td>
      <td><progress id="speed" value=${
        pokemonList[id].speed
      } max="200"></progress></td>
    </tr>
  </table>
  `;
}

function renderTypes(id) {
  let types = "";

  for (let i = 0; i < pokemonList[id].types.length; i++) {
    types += pokemonList[id].types[i];
    types += ` `;
  }
  return types;
}

function renderAttack(id) {
  let attack = document.getElementById("details-card");
  attack.innerHTML = ``;

  for (let i = 0; i < pokemonList[id].moves.length; i++) {
    attack.innerHTML += /* html */ `
    ${pokemonList[id].moves[i]}, 
    `;
  }
}

function closeDetail(id) {
  let dialog = document.getElementById("dialog");
  let card = document.getElementById("detail-card");

  dialog.classList.add("d-none");
  card.classList.remove(pokemonList[id].types[0]);
}
