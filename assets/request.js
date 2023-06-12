let ErrorState = false;

const requestPokemon = async (PokeID) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokeID}`);
    const data = await res.json();
    const PokeData = {
      name: data.name,
      id: data.id,
      img: data.sprites.back_default,
      types: data.types,
      height: data.height / 10,
      weight: data.weight / 10,
    };
    return PokeData;
  } catch (error) {
    console.error(error);
    SearchMsg.textContent = "El Pokemon no Existe, intenta con otro Número";
    SearchBox.value = "";
    ErrorState = true;
  }
};

// console.log(requestPokemon(120));
