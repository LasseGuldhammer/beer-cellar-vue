<template>
  <section class="add-beer">
    <button class="add-beer__button fixed" @click="displayForm = !displayForm"></button>
    <transition name="grow">
      <div class="add-beer__form-container absolute" v-if="displayForm">
        <header class="header flex">
          <span class="header__title">Add Beer</span>
          <button class="header__text-item text-uppercase pointer" @click="displayForm = !displayForm">
            Cancel
          </button>
          <button class="header__text-item text-uppercase pointer" :disabled="disableSaveButton" @click="addBeer">
            Save
          </button>
        </header>
        <beer-cellar-form @validation="toggleSave" @save-beer="saveBeer" mode="addNewBeer"></beer-cellar-form>
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
      disableSaveButton: true,
      displayForm: false
    }
  },
  methods: {
    toggleSave: function (valid, beer) {
      if (valid) {
        this.disableSaveButton = false
        this.beer = beer
      } else {
        this.disableSaveButton = true
      }
    },
    addBeer: function (beer) {
      this.$emit('add-beer', this.beer)
      this.beer = {}
      this.disableSaveButton = true
      this.displayForm = !this.displayForm
      // console.log('BeerCellarAddNew: add new beer')
    },
    saveBeer: function (beer) {
      this.$emit('save-beer', this.beer)
    }
  }
}
</script>
