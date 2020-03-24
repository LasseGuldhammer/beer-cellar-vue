<!-- Alternative to input="number" -->
<!-- <input type="number"> to <input type="text" inputmode="numeric" pattern="[0-9]*"> -->

<template>
  <section class="beer-list__beer-form absolute">
    <form id="beer-form" ref="beerForm">
      <input id="brewery" ref="brewery" class="beer-list__beer-input" type="text" placeholder="Brewery" v-model="newBeer.brewery" required>
      <input id="name" ref="name" class="beer-list__beer-input" type="text" placeholder="Name" v-model="newBeer.name" required>
      <input id="style" ref="style" class="beer-list__beer-input" type="text" placeholder="Style" v-model="newBeer.style" required>
      <input id="abv" ref="abv" class="beer-list__beer-input" type="number" placeholder="Abv" v-model.number="newBeer.abv" min="0" max="99" step="0.1" required>
      <input id="size" ref="size" class="beer-list__beer-input" type="number" placeholder="Size" v-model.number="newBeer.size" min="1" required>
      <input id="quantity" ref="quantity" class="beer-list__beer-input" type="number" placeholder="Quantity" v-model.number="newBeer.quantity" min="1" required>
      <input id="date" ref="date" class="beer-list__beer-input" type="date" placeholder="Date" v-model="newBeer.date" :max="maxDate">
      <input id="minimum" ref="minimum" class="beer-list__beer-input" type="number" placeholder="Minimum Age" v-model="newBeer.minimumAge">
      <button type="submit" @click.prevent="saveBeer" v-if="mode === 'editBeer'">Save beer</button>
      <button type="submit" @click.prevent="addBeer" v-else>Add new beer</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'BeerListForm',
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
    validate: function () {
      var refs = this.$refs
      if (!refs.beerForm.checkValidity()) {
        if (refs.brewery.checkValidity()) {
          refs.brewery.setCustomValidity('Please enter a name for the brewery')
        }
      }
      return refs.beerForm.checkValidity()
    },
    saveBeer: function () {
      if (this.validate()) {
        this.beer = JSON.parse(JSON.stringify(this.newBeer))
        this.$emit('save-beer', this.newBeer)
      }
    },
    addBeer: function () {
      this.$emit('add-beer', this.newBeer)
      this.newBeer = {}
    }
  }
}
</script>
