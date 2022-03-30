import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default function getPokemonInfo() {
  
  const store = useStore();
  const pokemonStore = store.state.pokemonStore;
  const pokemonData = computed(() => {
      const route = useRoute();
      const pokemonId = route.params.id;
      return pokemonStore.pokemons.find((pokemon) => pokemon.id == pokemonId)
    });
    const pokemonTypes = computed(() => pokemonData.value.types
        .map(type => type.type.name)
    );

    const pokemonLabeledTypes = (pokemon)=> {
      return pokemon.types
      .map(type => type.label).join(' · ')
    }

    return {
      pokemonData,
      pokemonTypes,
      pokemonLabeledTypes,
    }
}