<!-- Alternative to input="number" -->
<!-- <input type="number"> to <input type="text" inputmode="numeric" pattern="[0-9]*"> -->

<template>
  <section class="beer-cellar__beer-form absolute">
    <form id="beer-form" ref="beerForm">
      <input id="brewery" ref="brewery" class="beer-cellar__beer-input" type="text" placeholder="Brewery" v-model="newBeer.brewery" @input="checkValidity" @invalid="reportError" data-error="Please enter a name for the brewery" required>
      <input id="name" ref="name" class="beer-cellar__beer-input" type="text" placeholder="Name" v-model="newBeer.name" @input="checkValidity" @invalid="reportError" data-error="Please enter a name for the beer" required>
      <input id="style" ref="style" class="beer-cellar__beer-input" type="text" placeholder="Style" v-model="newBeer.style" @input="checkValidity" @invalid="reportError" data-error="Please enter a beer style" required>
      <input id="abv" ref="abv" class="beer-cellar__beer-input" type="number" placeholder="Abv" v-model.number="newBeer.abv" @input="checkValidity" @invalid="reportError" min="0" max="99" step="0.1" data-error="Please enter the beer's alcohol content" required>
      <input id="size" ref="size" class="beer-cellar__beer-input" type="number" placeholder="Size" v-model.number="newBeer.size" @input="checkValidity" @invalid="reportError" min="1" data-error="Please enter the size of the beer" required>
      <input id="quantity" ref="quantity" class="beer-cellar__beer-input" type="number" placeholder="Quantity" v-model.number="newBeer.quantity" @input="checkValidity" @invalid="reportError" min="1" data-error="Please enter the number of beers" required>
      <input id="date" ref="date" class="beer-cellar__beer-input" type="date" placeholder="Date" v-model="newBeer.date" :max="maxDate">
      <input id="minimum" ref="minimum" class="beer-cellar__beer-input" type="number" placeholder="Minimum Age" v-model="newBeer.minimumAge">
      <button type="submit" @click="saveBeer" v-if="mode === 'editBeer'">Save beer</button>
      <button type="submit" @click="addBeer" v-else>Add new beer</button>
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
    mode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      newBeer: {}
    }
  },
  computed: {
    maxDate: function () {
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
  methods: {
    checkValidity: function (e) {
      e.target.setCustomValidity('')
      e.target.checkValidity()
    },
    reportError: function (e) {
      if (e.target.value === '') {
        e.target.setCustomValidity(e.target.dataset.error)
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
        this.newBeer = {}
      }
    }
  }
}
</script>
