<template>
  <transition>
    <div class="beer-cellar-sort">
      <span class="beer-cellar-sort__title">Sort beers by</span>
      <div>
        <button class="beer-cellar-sort__button" @click="sortBeers('name', false)">Name (A-Z)</button>
        <button class="beer-cellar-sort__button" @click="sortBeers('name', true)">Name (Z-A)</button>
        <button class="beer-cellar-sort__button" @click="sortBeers('brewery', false)">Brewery (A-Z)</button>
        <button class="beer-cellar-sort__button" @click="sortBeers('brewery', true)">Brewery (Z-A)</button>
        <button class="beer-cellar-sort__button" @click="sortBeers('abv', false)">Abv (0-9)</button>
        <button class="beer-cellar-sort__button" @click="sortBeers('abv', true)">Abv (9-0)</button>
        <button class="beer-cellar-sort__button" @click="sortBeers('date', false)">Date (new-old)</button>
        <button class="beer-cellar-sort__button" @click="sortBeers('date', true)">Date (old-new)</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BeerCellarSort',
  props: {
    sortedBy: {
      type: String,
      default: 'name'
    },
    reversed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sortBeers (key, reverse) {
      this.$emit('sort-beers', key, reverse)
    }
  }
}
</script>

<style lang="scss">

</style>
