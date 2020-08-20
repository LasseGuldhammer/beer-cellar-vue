<template>
  <transition>
    <section @click.stop="" class="beer-cellar-sort absolute">
      <span>Filter beers by</span>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'BeerCellarFilter'
}
</script>
