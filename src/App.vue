<template>
  <div id="app">
    <beer-cellar></beer-cellar>
  </div>
</template>

<script>
import BeerCellar from './components/BeerCellar'

export default {
  name: 'App',
  components: {
    BeerCellar
  }
}
</script>

<style lang="scss">
@import url("/css/normalize.css");
</style>
<style lang="scss" src="../public/css/style.scss">
</style>
