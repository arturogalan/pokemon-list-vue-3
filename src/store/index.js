import { createStore } from 'vuex';
import pokemonStore from './pokemonStore';

export default createStore({
  modules: {
    pokemonStore
  }
})
