import { computed } from 'vue';
import { useStore } from 'vuex';

export default function usePokemonFilters() {
    const store = useStore();

    const filteredPokemons = computed(() => store.getters.getFilteredPokemons);
    
    const setNameOrTypeFilter = ({ target }) => {
      store.dispatch('axn_clearFilters')
      store.dispatch('axn_nameByTextFilter', target.value)
      store.dispatch('axn_typeByTextFilter', target.value)
      store.dispatch('axn_typeByOrderFilter', target.value)

    }
    const setTypeByArrayFilter = (typesArray) => {
      store.dispatch('axn_typeByArrayFilter', typesArray);
    }

    const clearFilters = () => {
      store.dispatch('axn_clearFilters');
    }

    return {
        filteredPokemons,
        clearFilters,
        setNameOrTypeFilter,
        setTypeByArrayFilter,
    };
}