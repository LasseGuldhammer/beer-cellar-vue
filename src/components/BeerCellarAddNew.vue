<template>
  <section class="add-beer">
    <button class="add-beer__button fixed" @click="displayForm = !displayForm"></button>
    <transition name="grow">
      <div class="add-beer__form-container absolute" v-if="displayForm">
        <header class="beer-cellar-header flex">
          <span class="beer-cellar-header__title">Add Beer</span>
          <a href="#" class="beer-cellar-header__link">
            <span class="add-beer__link-text text-uppercase">Cancel</span>
          </a>
          <a href="#" class="beer-cellar-header__link">
            <span class="add-beer__link-text text-uppercase">Save</span>
          </a>
        </header>
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
