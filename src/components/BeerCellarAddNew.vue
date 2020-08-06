<template>
  <section class="add-beer">
    <button class="add-beer__button fixed" @click="toggleForm"></button>
    <transition name="grow-fab">
      <div class="add-beer__form-container fixed" v-if="displayForm">
        <header class="header flex">
          <span class="header__title">Add Beer</span>
          <button class="header__text-item text-uppercase pointer" @click="toggleForm">
            Cancel
          </button>
          <button class="header__text-item text-uppercase pointer" :disabled="disableSaveButton" @click="addBeer">
            Save
          </button>
        </header>
        <beer-cellar-form @validation="toggleSaveButton" @save-beer="saveBeer" mode="addNewBeer"></beer-cellar-form>
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
    toggleForm: function () {
      const body = document.body
      this.displayForm = !this.displayForm
      if (this.displayForm) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
    },
    toggleSaveButton: function (valid, beer) {
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
    },
    saveBeer: function (beer) {
      this.$emit('save-beer', this.beer)
    }
  }
}
</script>
