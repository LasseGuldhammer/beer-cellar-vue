<template>
  <transition>
    <section class="beer-cellar-filter absolute" @click.stop="">
      <span class="beer-cellar-filter__title">Filter beers by</span>
      <span class="beer-cellar-filter__cancel absolute pointer" @click="hideFilter"></span>
      <div class="beer-cellar-filter__filter-wrapper">
        <label class="beer-cellar-filter__label" for="breweries">Breweries</label>
        <div class="beer-cellar-filter__select-wrapper grid relative">
          <select class="beer-cellar-filter__select" id="breweries" name="breweries" @change="applyFilters" v-model="brewery">
            <option value="All">All</option>
            <option v-for="b in breweries" :key="b" :value="b">{{ b }}</option>
        </select>
        </div>
      </div>
      <div class="beer-cellar-filter__filter-wrapper">
        <label class="beer-cellar-filter__label" for="styles">Styles</label>
        <div class="beer-cellar-filter__select-wrapper grid relative">
          <select class="beer-cellar-filter__select" id="styles" name="styles" @change="applyFilters" v-model="style">
            <option value="All">All</option>
            <option v-for="s in styles" :key="s" :value="s">{{ s }}</option>
        </select>
        </div>
      </div>
      <div class="beer-cellar-filter__filter-wrapper">
        <form>
          <label class="beer-cellar-filter__label" for="ready">Only show ready</label>
          <input class="beer-cellar-filter__checkbox block" id="ready" type="checkbox" @change="applyFilters" v-model="ready">
        </form>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'BeerCellarFilter',
  props: {
    breweries: {
      type: Array,
      default: null
    },
    breweryFilter: {
      type: String,
      default: 'All'
    },
    onlyShowReady: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Array,
      default: null
    },
    styleFilter: {
      type: String,
      default: 'All'
    }
  },
  data () {
    return {
      brewery: 'All',
      style: 'All',
      ready: false
    }
  },
  methods: {
    applyFilters () {
      this.$emit('apply-filters', this.brewery, this.style, this.ready)
    },
    hideFilter () {
      this.$emit('hide-filter')
    }
  },
  watch: {
    breweryFilter (newValue, oldValue) {
      this.brewery = newValue
    },
    styleFilter (newValue, oldValue) {
      this.style = newValue
    },
    onlyShowReady (newValue, oldValue) {
      this.ready = newValue
    }
  }
}
</script>
