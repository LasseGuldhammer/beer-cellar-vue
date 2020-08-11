<!-- Alternative to input="number" -->
<!-- <input type="number"> to <input type="text" inputmode="numeric" pattern="[0-9]*"> -->

<template>
  <section class="beer-form absolute" v-if="displayForm">
    <header class="header --form flex">
      <span class="header__title">{{ headerTitle }}</span>
      <button class="header__text-item text-uppercase pointer" @click="toggleForm">
        Cancel
      </button>
      <button class="header__text-item text-uppercase pointer" :disabled="!isFormValid" @click="addBeer" v-if="mode === 'addNewBeer'">
        Save
      </button>
      <button class="header__text-item text-uppercase pointer" :disabled="!isFormValid" @click="saveBeer" v-if="mode === 'editBeer'">
        Save
      </button>
    </header>
    <form id="beer-form" ref="beerForm">
      <fieldset form="beer-form" class="beer-form__fieldset --required">
        <div class="beer-form__input-wrapper">
          <label class="beer-form__input-label" for="brewery">Brewery</label>
          <input id="brewery" ref="brewery" class="beer-form__input --large" type="text" placeholder="Brewery name" v-model="newBeer.brewery" @input="checkValidity" @invalid="reportError" data-error="Please enter a name for the brewery" required autofocus>
        </div>
        <div class="beer-form__input-wrapper">
          <label class="beer-form__input-label" for="name">Name</label>
          <input id="name" ref="name" class="beer-form__input --large" type="text" placeholder="Beer name" v-model="newBeer.name" @input="checkValidity" @invalid="reportError" data-error="Please enter a name for the beer" required>
        </div>
        <div class="beer-form__input-wrapper">
          <label class="beer-form__input-label" for="style">Style</label>
          <input id="style" ref="style" class="beer-form__input --large" type="text" placeholder="Beer style" v-model="newBeer.style" @input="checkValidity" @invalid="reportError" data-error="Please enter a beer style" required>
        </div>
      </fieldset>
      <fieldset form="beer-form" class="beer-form__fieldset --optional">
        <legend>Optional</legend>
        <div class="beer-form__optional-input-wrapper grid">
          <div class="beer-form__input-wrapper --abv">
            <label class="beer-form__input-label" for="abv">Alcohol</label>
            <input id="abv" ref="abv" class="beer-form__input --small" type="text" inputmode="numeric" pattern="[0-9]*\.?[0-9]{0,2}" placeholder="Alcohol content" v-model.number="newBeer.abv" @input="checkValidity" @invalid="reportError" min="0" max="99" step="0.1" data-error="Please only use numbers">
          </div>
          <div class="beer-form__input-wrapper --size">
            <label class="beer-form__input-label" for="size">Size</label>
            <input id="size" ref="size" class="beer-form__input --small" type="text" inputmode="numeric" placeholder="Beer size" v-model.number="newBeer.size" @input="checkValidity" @invalid="reportError" min="1" data-error="Please only use numbers">
          </div>
          <div class="beer-form__input-wrapper --quantity">
            <label class="beer-form__input-label" for="quantity">Quantity</label>
            <input id="quantity" ref="quantity" class="beer-form__input --small --date" type="text" inputmode="numeric" placeholder="Quantity" v-model.number="newBeer.quantity" @input="checkValidity" @invalid="reportError" min="1" data-error="Please only use numbers">
          </div>
          <div class="beer-form__input-wrapper --date">
            <label class="beer-form__input-label" for="date">Date</label>
            <input id="date" ref="date" class="beer-form__input --small" type="date" v-model="newBeer.date" :max="maxDate">
          </div>
          <div class="beer-form__input-wrapper --minimum">
            <label class="beer-form__input-label" for="minimum">Minimum Age</label>
            <input id="minimum" ref="minimum" class="beer-form__input --small" type="text" inputmode="numeric" placeholder="Years" v-model.number="newBeer.minimumAge">
          </div>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: 'BeerCellarForm',
  props: {
    beer: {
      type: Object,
      required: false
    },
    displayForm: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      disableSaveButton: true,
      isFormValid: false,
      newBeer: {}
    }
  },
  computed: {
    headerTitle: function () {
      return this.mode === 'addNewBeer' ? 'Add New Beer' : 'Edit Beer'
    },
    maxDate: function () {
      // Calculate the current date and save it as a string
      var currentDate = new Date(Date.now())
      var year = currentDate.getFullYear()
      var month = currentDate.getMonth() + 1
      var date = currentDate.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      return year + '-' + month + '-' + date
    }
  },
  created: function () {
    if (this.mode === 'editBeer') {
      this.newBeer = JSON.parse(JSON.stringify(this.beer))
    }
  },
  mounted: function () {
    if (this.mode === 'editBeer') {
      this.isFormValid = this.$refs.beerForm.checkValidity()
    }
  },
  methods: {
    checkValidity: function (e) {
      e.target.setCustomValidity('')
      const inputValidity = e.target.checkValidity()
      const formValidity = this.$refs.beerForm.checkValidity()
      if (inputValidity && formValidity) {
        this.isFormValid = true
        // this.$emit('validation', true, this.newBeer)
      } else if (!inputValidity || !formValidity) {
        this.isFormValid = false
        // this.$emit('validation', false)
      }
    },
    reportError: function (e) {
      if (e.target.value === '') {
        e.target.setCustomValidity(e.target.dataset.error)
      }
    },
    toggleForm: function () {
      const body = document.body
      // this.displayForm = !this.displayForm
      this.$emit('toggle-form')
      if (this.displayForm) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
    },
    validateForm: function () {
      return this.$refs.beerForm.checkValidity()
    },
    saveBeer: function () {
      if (this.validateForm()) {
        var beer = JSON.parse(JSON.stringify(this.newBeer))
        this.$emit('save-beer', beer)
      }
    },
    addBeer: function () {
      if (this.validateForm()) {
        this.$emit('add-beer', this.newBeer)
        // this.newBeer = {}
      }
    }
  }
}
</script>
