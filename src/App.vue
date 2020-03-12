<template>
  <div id="app">
    <beer-list></beer-list>
  </div>
</template>

<script>
import BeerList from './components/BeerList'

export default {
  name: 'App',
  components: {
    BeerList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background: #f0f0f0;
}

.flex {
  display: flex;
}
</style>
