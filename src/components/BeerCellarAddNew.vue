<template>
  <section class="add-beer">
    <button class="add-beer__button fixed pointer" @click="toggleForm"></button>
    <transition name="grow-fab">
      <beer-cellar-form :display-form="displayForm" @toggle-form="toggleForm" @add-beer="addBeer" mode="addNewBeer" v-if="displayForm"></beer-cellar-form>
    </transition>
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
      displayForm: false
    }
  },
  methods: {
    toggleForm: function () {
      this.displayForm = !this.displayForm
    },
    addBeer: function (beer) {
      this.$emit('add-beer', beer)
      this.displayForm = !this.displayForm
    }
  }
}
</script>
