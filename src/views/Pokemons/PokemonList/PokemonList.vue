<template>
    <div>
        <router-link
            v-for="pokemon in pokemons"
            :key="pokemon.id"
            :to="`/pokemon/${pokemon.id}`"
            class="pokemon__item"
        >
            <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
            <div v-html="pokemon.order" class="pokemon__order"/>
            <div v-html="pokemon.label" class="pokemon__name"/>
            <div v-if="showTypes" v-html="pokemonLabeledTypes(pokemon)" class="pokemon-list__types"></div>
            
        </router-link>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    import usePokemonInfo from '@/app/Pokemon/composables/usePokemonInfo';

    const { pokemonLabeledTypes } = usePokemonInfo();
    defineProps({
        pokemons: Array,
        showTypes: Boolean,
    })    
</script>

<style src="./PokemonList.scss" lang="scss" scoped></style>
