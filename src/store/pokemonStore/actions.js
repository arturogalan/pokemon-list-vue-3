export default {
    axn_newPokemon({ commit }, pokemon) {
        commit('set_newPokemon', pokemon);
    },

    axn_nameByTextFilter({ commit }, text) {
        commit('set_nameByTextFilter', text);
    },

    axn_typeByTextFilter({ commit }, type) {
        commit('set_typeByTextFilter', type);
    },

    axn_typeByOrderFilter({ commit }, type) {
      commit('set_orderByTextFilter', type);
  },

    axn_typeByArrayFilter({ commit }, type) {
      commit('set_typeByArrayFilter', type);
    },

    axn_clearFilters({commit}) {
      commit('clear_filters')
    }
}