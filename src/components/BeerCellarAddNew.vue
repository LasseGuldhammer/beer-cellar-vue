<template>
  <section class="add-beer__wrapper">
    <button class="add-beer__button fixed" @click="displayForm = !displayForm"></button>
    <transition name="fade">
      <div class="add-beer__form-container absolute" v-if="displayForm">
        <beer-cellar-form @add-beer="addBeer" @save-beer="saveBeer" mode="addNewBeer"></beer-cellar-form>
      </div>
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
