// Elementos del DOM
const Form = document.querySelector("#form");
const SearchBox = document.querySelector(".input");
const SearchMsg = document.querySelector(".search-msg");
const CardContainer = document.querySelector(".poke-container");

let PokeData = {};

// --------------FUNCIONES AUXILIARES--------------

// Funcion si el stat es undefined
const ifUndefined = (stat) => {
  return !isNaN(stat.he);
};

// Funcion si está vacío el input
const isEmpty = (input) => {
  return !input.value.trim().length;
};

// Funcion para ingresar Solo Numeros
const isNumber = (input) => {
  const re = /^[0-9]+$/;
  return !re.test(input.value.trim());
};

// Funcion si no existe la city
const isNotPokemon = (Pokemon) => Pokemon.id;

// Funcion Mostrar Error
const ShowError = (mensaje) => {
  SearchMsg.textContent = mensaje;
};

const CleanCard = () => {
  CardContainer.innerHTML = "";
  SearchMsg.value = "";
};

// Funcion que Vacia la Caja de Busqueda
const CleanSearch = () => {
  Form.reset();
};

const RenderTypes = (types) => {
  return types
    .map((tipo) => {
      return `${tipo.type.name}`;
    })
    .join(", ");
};

const RenderPokemon = (Pokemon) => {
  const { name, id, img, types, height, weight } = Pokemon;
  let NAME = name.toUpperCase();
  return (CardContainer.innerHTML = `
    <div class="poke flex">
      <h2 class="pokeName">${NAME}</h2>
      <div class="poke-data">
        <img class="pokeImg"
        src="${img}"/>
        <div class="poke-info">
          <span class="pokeId">ID: #${id}</span>
          <div class="pokeTypes">
          <span class="normal pokeType">Type: ${RenderTypes(types)}</span>
          </div>
          <p class="height">Height: ${height}m</p>
          <p class="weight">Weight: ${weight}Kg</p>
        </div>
      </div>
    </div>
  `);
};

const PokeSearch = async (e) => {
  e.preventDefault();

  CleanCard();
  // Validar si esta Vacio
  if (isEmpty(SearchBox)) {
    ShowError("El campo esta Vacio, pofavor ingresa un Número");
    CleanSearch();
    return;
  }

  // Validar si es Numero
  if (isNumber(SearchBox)) {
    ShowError("Este campo es solo puede ser un Número");
    CleanSearch();
    return;
  }

  PokeData = await requestPokemon(SearchBox.value);
  console.log(PokeData);
  console.log(ErrorState);
  if (await ErrorState) {
    CleanSearch();
    ErrorState = false;
    return;
  }
  RenderPokemon(PokeData);
  ShowError("Pokemon Encontrado!!!");
  CleanSearch();
  console.log(ErrorState);
};

// Inicio del INIT
const init = () => {
  Form.addEventListener("submit", PokeSearch);
};

init();
