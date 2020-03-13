<template>
  <div class="flex beer-item">
    <div class="flex beer-item__content" v-if="!this.editing">
      <p>{{ beer.brewery }}</p>
      <p>{{ beer.name }}</p>
      <p>{{ beer.style }}</p>
      <p>{{ beer.abv }}%</p>
      <p>{{ beer.size }} cl</p>
      <p>Quantity: {{ beer.quantity }}</p>
      <p>Age: {{ age }}</p>
      <p v-if="this.readyToDrink">Ready to drink</p>
      <button @click="edit">Edit beer</button>
    </div>
    <div class="flex beer-item__editor" v-if="this.editing">
      <beer-list-form :beer="beer" @save-beer="edit"></beer-list-form>
    </div>
  </div>
</template>

<script>
import BeerListForm from './BeerListForm.vue'

export default {
  name: 'BeerListItem',
  components: {
    BeerListForm
  },
  props: {
    beer: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      age: '',
      currentDate: Date.now(),
      editing: false,
      readyToDrink: false
    }
  },
  created: function () {
    this.calculateAge()
  },
  methods: {
    calculateAge: function () {
      var date = new Date(this.beer.date)
      if (date > this.currentDate) {
        return
      }
      var elapsed = this.currentDate - date
      var totalMonths = Math.floor(elapsed / 1000 / 60 / 60 / 24 / 30.416)
      var years = Math.floor(totalMonths / 12)
      var months = totalMonths - years * 12
      var yearString = years + (years > 1 ? ' years, ' : ' year, ')
      var monthString = months + (months > 1 ? ' months' : ' month')
      // console.log('calculateAge called')
      this.age = (years > 0 ? yearString : '') + monthString
      this.readyToDrink = years >= this.beer.minimumAge
    },
    edit: function () {
      console.log('toggle edit')
      this.editing = !this.editing
    }
  },
  watch: {
    beer: {
      deep: true,
      handler (val, oldVal) {
        // console.log('beer updated')
        this.calculateAge()
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.beer-item {
  border: 1px solid #e0e0e0;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
}

// add class, avoid element selectors
p {
  padding: 8px;
}
</style>
