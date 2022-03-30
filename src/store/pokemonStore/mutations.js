export default {
    set_newPokemon(state, pokemon) {
        state.pokemons.push(pokemon);
    },

    set_nameByTextFilter(state, value) {
        state.filters.nameByText = value;
    },

    set_typeByTextFilter(state, value) {
        state.filters.typeByText = value;
    },

    set_orderByTextFilter(state, value) {
      state.filters.typeByOrder = value;
    },

    set_typeByArrayFilter(state, value) {
      state.filters.typeByArray = value;
    },

    clear_filters(state) {
      state.filters.nameByText = '';
      state.filters.typeByText = 'Any';
      state.filters.typeByArray.splice(0);
    }
}