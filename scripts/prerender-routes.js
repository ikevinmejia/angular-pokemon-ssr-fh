const TOTAL_POKEMON = 10;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require("fs");

  const pokemonId = Array.from({ length: TOTAL_POKEMON }, (_, i) => i + 1);
  const pokemonPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  const fileContentPokemonId = pokemonId.map((id) => `/pokemon/${id}`).join("\n");
  const fileContentPokemonPage = pokemonPages.map((id) => `/pokemon/page/${id}`).join("\n");

  let routes = fileContentPokemonId + '\n' + fileContentPokemonPage;

  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`)
    .then(res => res.json())

  routes += '\n';
  routes += pokemonNameList.results.map(pokemon => (
    `/pokemon/${pokemon.name}`
  )).join("\n");

  fs.writeFileSync("routes.txt", routes);
})();
