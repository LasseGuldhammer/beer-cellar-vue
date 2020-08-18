<template>
  <transition name="grow">
    <div class="beer-cellar-sort">
      <span class="beer-cellar-sort__title">Sort beers by</span>
      <span class="beer-cellar-sort__cancel absolute pointer" @click="hideSort"></span>
      <div class="beer-cellar-sort__button-wrapper flex">
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'name' && !reversed }" @click="sortBeers('name', false)">Name (A-Z)</button>
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'name' && reversed }" @click="sortBeers('name', true)">Name (Z-A)</button>
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'brewery' && !reversed }" @click="sortBeers('brewery', false)">Brewery (A-Z)</button>
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'brewery' && reversed }" @click="sortBeers('brewery', true)">Brewery (Z-A)</button>
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'abv' && !reversed }" @click="sortBeers('abv', false)">Abv (0-9)</button>
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'abv' && reversed }" @click="sortBeers('abv', true)">Abv (9-0)</button>
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'date' && reversed }" @click="sortBeers('date', true)">Date (new-old)</button>
        <button class="beer-cellar-sort__button pointer" :class="{ '--active': sortedBy === 'date' && !reversed }" @click="sortBeers('date', false)">Date (old-new)</button>
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
    },
    hideSort () {
      this.$emit('hide-sort')
    }
  }
}
</script>
