import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

const defState = () => ({
    pokemons: [],
    filters: {
        nameByText: '',
        typeByText: 'Any',
        typeByOrder: '',
        typeByArray: [],
    }
})

export default {
    state: defState(),
    mutations,
    actions,
    getters
}