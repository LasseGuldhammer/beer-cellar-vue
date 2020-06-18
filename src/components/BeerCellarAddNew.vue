<template>
  <section class="relative">
    <button @click="displayForm = !displayForm">Add new beer</button>
    <beer-cellar-form v-if="displayForm" @add-beer="addBeer" @save-beer="saveBeer" mode="addNewBeer"></beer-cellar-form>
  </section>
</template>

<script>
import BeerCellarForm from './BeerCellarForm.vue'

export default {
  name: 'BeerCellarAddNew',
  components: {
    BeerCellarForm
  },
  data () {
    return {
      beer: {},
      displayForm: false
    }
  },
  methods: {
    addBeer: function (beer) {
      this.$emit('add-beer', beer)
      this.displayForm = false
    },
    saveBeer: function (beer) {
      this.$emit('save-beer', beer)
    }
  }
}
</script>
