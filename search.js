function renderList(search = "") {
  let list = new Array();
  let content = document.getElementById("content");

  content.innerHTML = "";

  for (let i = 0; i < pokemonList.length; i++) {
    let nameEnglish = pokemonList[i].nameEnglish;
    let nameGerman = pokemonList[i].nameGerman;

    if (nameEnglish.toLowerCase().includes(search)) {
      list.push(i);
    }
    if (nameGerman.toLowerCase().includes(search)) {
      list.push(i);
    }
  }
  deleteDoubleValues(list);
}

function searchName() {
  let input = document.getElementById("searchinput").value;
  input = input.toLowerCase();
  renderButton(1);
  renderList(input);
}

function deleteDoubleValues(list) {
  let unique = list.filter((x, i) => list.indexOf(x) === i);

  for (let i = 0; i < unique.length; i++) {
    loadApiSearch(unique[i]);
  }
}

async function loadApiSearch(id) {
  let querryPokemon = pokemonList[id].nameEnglish;
  let url = `https://pokeapi.co/api/v2/pokemon/${querryPokemon}`;
  let pokemon = await fetch(url);
  pokemon = await pokemon.json();
  pokemonExtract(id, pokemon);
  renderCards(id); //* Karten einzeln rendern
}
