<template>
  <transition>
    <section class="beer-cellar-filter absolute" @click.stop="">
      <span class="beer-cellar-filter__title">Filter beers by</span>
      <div class="beer-cellar-filter__filter-wrapper">
        <label class="beer-cellar-filter__label" for="breweries">Breweries</label>
        <select class="beer-cellar-filter__select" id="breweries" name="breweries">
          <option value="all">All</option>
          <option v-for="b in breweries" :key="b" value="b">{{ b }}</option>
        </select>
      </div>
      <div class="beer-cellar-filter__filter-wrapper">
        <label class="beer-cellar-filter__label" for="styles">Styles</label>
        <select class="beer-cellar-filter__select" id="styles" name="styles">
          <option value="all">All</option>
          <option v-for="s in styles" :key="s" value="s">{{ s }}</option>
        </select>
      </div>
      <div class="beer-cellar-filter__filter-wrapper">
        <form>
          <label class="beer-cellar-filter__label">Show only ready</label>
          <input class="beer-cellar-filter__checkbox block" type="checkbox">
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
    styles: {
      type: Array,
      default: null
    }
  }
}
</script>
