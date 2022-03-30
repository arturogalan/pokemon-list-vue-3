import { pokemonClient } from '@/app/Pokemon/client/pokemonClient';
import { useStore } from 'vuex';

export default async function usePokemons() {
    const store = useStore();
    const getPokemons = () => {
        const pokemonCalls = []

        for (let pokemonNumber = 1; pokemonNumber <= 151; pokemonNumber++) {
            const getPokemonPromise = pokemonClient.getPokemonInfo(pokemonNumber);
            pokemonCalls.push(getPokemonPromise);
        }

        return Promise.all(pokemonCalls);
    }

    const pokemons = await getPokemons();

    const storePokemons = (pokemons) => {
        pokemons.forEach(pokemon => {
            store.dispatch('axn_newPokemon', pokemon);
        })
    }

    storePokemons(pokemons);
}