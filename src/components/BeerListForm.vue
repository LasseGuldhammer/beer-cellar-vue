<!-- Alternative to input="number" -->
<!-- <input type="number"> to <input type="text" inputmode="numeric" pattern="[0-9]*"> -->

<template>
  <section class="beer-list__beer-form position-absolute">
    <form v-if="beer">
      <input id="brewery" class="beer-list__beer-input" type="text" placeholder="Brewery" v-model="beer.brewery" required>
      <input id="name" class="beer-list__beer-input" type="text" placeholder="Name" v-model="beer.name" required>
      <input id="style" class="beer-list__beer-input" type="text" placeholder="Style" v-model="beer.style" required>
      <input id="abv" class="beer-list__beer-input" type="number" placeholder="Abv" v-model.number="beer.abv" min="0" max="99" step="0.1">
      <input id="size" class="beer-list__beer-input" type="number" v-model.number="beer.size" min="0">
      <input id="quantity" class="beer-list__beer-input" type="number" v-model.number="beer.quantity" min="1">
      <input id="date" class="beer-list__beer-input" type="date" v-model="beer.date">
      <button type="submit" @click.prevent="saveBeer">Save beer</button>
    </form>
    <form v-if="!beer">
      <input id="brewery" class="beer-list__beer-input" type="text" placeholder="Brewery" v-model="newBeer.brewery" required>
      <input id="name" class="beer-list__beer-input" type="text" placeholder="Name" v-model="newBeer.name" required>
      <input id="style" class="beer-list__beer-input" type="text" placeholder="Style" v-model="newBeer.style" required>
      <input id="abv" class="beer-list__beer-input" type="number" placeholder="Abv" v-model.number="newBeer.abv" min="0" max="99" step="0.1">
      <input id="size" class="beer-list__beer-input" type="number" placeholder="Size" v-model.number="newBeer.size" min="0">
      <input id="quantity" class="beer-list__beer-input" type="number" placeholder="Quantity" v-model.number="newBeer.quantity" min="1">
      <input id="date" class="beer-list__beer-input" type="date" placeholder="Date" v-model="newBeer.date" :max="maxDate">
      <button type="submit" @click.prevent="addBeer">Add new beer</button>
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
      } else if (date < 10) {
        date = '0' + date
      }
      // this.maxDate = year + '-' + month + '-' + date
      return year + '-' + month + '-' + date
    }
  },
  methods: {
    saveBeer: function () {
      this.$emit('save-beer')
    },
    addBeer: function () {
      this.$emit('add-beer', this.newBeer)
      this.newBeer = {}
    }
  }
}
</script>
