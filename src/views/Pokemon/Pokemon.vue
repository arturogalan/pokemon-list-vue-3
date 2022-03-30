<template>
<div class="pokemon-info">
    <div class="pokemon-card">
      <div class="pokemon-card__board">
        <img class="pokemon-card__img" :src="pokemonData.sprites.front_default" :alt="pokemonData.name">
        <div class="pokemon-card__info">
            <ul>
                <li>
                    <strong>Name:</strong> {{ pokemonData.name }}
                </li>
                <li>
                    <strong>Number:</strong> {{ pokemonData.order }}
                </li>
                <li>
                    <strong>Types:</strong> {{ pokemonTypes.join(', ') }}
                </li>
            </ul>
        </div>
        </div>
    </div>
    <router-link
        class="pokemon-card__back"
        to="/"
    >
        Back
    </router-link>
    <div class="pokemon-suggestions">🔔 Pokemons of the same types ({{pokemonTypes.join(', ')}}):</div>
    <PokemonGraph 
    class="pokemon-view__list"
    :pokemons="filteredPokemons"
    :targetPokemon="pokemonData"
      />
    </div>
</template>

<script setup>
    import usePokemonInfo from '@/app/Pokemon/composables/usePokemonInfo';
    import PokemonGraph from '@/views/Pokemons/PokemonGraph/PokemonGraph.vue'; 
    import usePokemonFilters from '@/app/Pokemons/composables/usePokemonFilters.js';
    import { onMounted, onUpdated, onBeforeUnmount } from 'vue'

    const { pokemonData, pokemonTypes } = usePokemonInfo();
    const {
        filteredPokemons,
        setTypeByArrayFilter,
        clearFilters,
    } = usePokemonFilters();
 
  onMounted(()=> {
    setTypeByArrayFilter(pokemonTypes.value)
  })
  onUpdated(()=> {
    setTypeByArrayFilter(pokemonTypes.value)
  })
  onBeforeUnmount(()=> {
    clearFilters()
  })
</script>


<style src="./Pokemon.scss" lang="scss"></style>