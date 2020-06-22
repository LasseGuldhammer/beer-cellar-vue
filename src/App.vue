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

*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #c4c4c4;
  font-size: 14px;
  min-height: 100vh;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.inline-block {
  display: inline-block;
}

.flex {
  display: flex;

  &.--column {
    flex-direction: column;
  }
}

.grid {
  display: grid;
}

.absolute {
  position: absolute;
}

.pointer {
  cursor: pointer;
}

.relative {
  position: relative;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-uppercase {
  text-transform: uppercase;
}

.visibility-hidden {
  visibility: hidden;
}
</style>
