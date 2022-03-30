export default {
    getOrderedPokemons(state) {
        return state.pokemons.sort((a, b) => a.order - b.order);
    },

    getFilteredPokemons(state, getters) {
      const pokemonNameByTextFilter = state?.filters?.nameByText;
      const pokemonTypeByTextFilter = state?.filters?.typeByText;
      const pokemonOrderByTextFilter = state?.filters?.typeByOrder;


      const pokemonTypeByArrayFilter = state?.filters?.typeByArray;
      const searchRegExp =  new RegExp(pokemonNameByTextFilter, 'gi');


        const filteredPokemons = getters.getOrderedPokemons
            .filter((pokemon) => {
              return pokemon?.name?.includes(pokemonNameByTextFilter) ||
               pokemon?.types?.find((type) => type.type.name.includes(pokemonTypeByTextFilter)) ||
               String(pokemon.order).includes(pokemonOrderByTextFilter)
            })
            .filter((pokemon) => !pokemonTypeByArrayFilter.length || pokemon?.types
              .find((type) => pokemonTypeByArrayFilter.includes(type.type.name))
           ).map((foundPokemon)=> {
            const label = foundPokemon.name.replace(
              searchRegExp,
              (match) => `<mark>${match}</mark>`,
            );
            const order = String(foundPokemon.order).replace(
              searchRegExp,
              (match) => `<mark>${match}</mark>`,
            );               
            const types = foundPokemon.types.map((type)=> ({...type, label:type.type.name.replace(
            searchRegExp,
            (match) => `<mark>${match}</mark>`,
            )}));

             return {
               ...foundPokemon,
               types,
               label,
               order,
             }
           })
            || [];
        return filteredPokemons; 
    },
}