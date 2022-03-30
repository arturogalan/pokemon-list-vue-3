import { createRouter, createWebHashHistory } from 'vue-router';
import Pokemons from '../views/Pokemons/Pokemons.vue';
import Pokemon from '../views/Pokemon/Pokemon.vue';


const routes = [
  {
    path: '/',
    name: 'pokemons',
    component: Pokemons
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: Pokemon
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
