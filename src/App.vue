<template>
    <suspense>
        <router-view />
    </suspense>
</template>

<script setup>
    import { getCurrentInstance } from 'vue';
    import usePokemons from '@/app/App/composables/usePokemons';
    const instance = getCurrentInstance();

    usePokemons();
    window.vm = instance;
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
