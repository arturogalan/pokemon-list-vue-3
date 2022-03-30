<template>
    <div class="pokemon-view">
        <div class="pokemon-view__filters">
            <BaseInput
                class="text-filter"
                input-name="Search pokemons!"
                input-type="text"
                placeholder="Write a pokemon numer, name or type."
                @input="setNameOrTypeFilter"
            />
        </div>
        <PokemonList 
            class="pokemon-view__list"
            :pokemons="filteredPokemons"
            show-types
        />
    </div>
</template>

<script setup>
    import PokemonList from './PokemonList/PokemonList'; 
    import BaseInput from '@/components/base/BaseInput/BaseInput';
    import usePokemonFilters from '@/app/Pokemons/composables/usePokemonFilters';

    const {
        filteredPokemons,
        setNameOrTypeFilter,
    } = usePokemonFilters();
</script>

<style src="./Pokemons.scss" lang="scss"></style>
