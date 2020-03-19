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
  },
  data () {
    return {
      currentDate: new Date(Date.now()),
      maxDate: ''
    }
  },
  created: function () {
    this.getMaxDate()
  },
  methods: {
    getMaxDate: function () {
      this.maxDate = this.currentDate.getFullYear() + '-' + this.currentDate.getMonth() + '-' + this.currentDate.getDate()
    }
  }
}
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

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
}

.grid {
  display: grid;
}

.position-absolute {
  position: absolute;
}

.position-relative {
  position: relative;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.visibility-hidden {
  visibility: hidden;
}
</style>
