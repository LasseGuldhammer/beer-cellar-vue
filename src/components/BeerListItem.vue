<template>
  <div class="beer-list__beer-item">
    <div class="beer-list__beer-item flex" v-if="!this.editing">
      <p class="beer-list__column --brewery text-left">{{ beer.brewery }}</p>
      <p class="beer-list__column --name text-left">{{ beer.name }}</p>
      <p class="beer-list__column --style text-left">{{ beer.style }}</p>
      <p class="beer-list__column --abv text-right">{{ beer.abv }}<small>%</small></p>
      <p class="beer-list__column --size text-right">{{ beer.size }} cl</p>
      <p class="beer-list__column --quantity text-right">{{ beer.quantity }}</p>
      <!-- <p class="beer-list__column --age text-left">{{ age }}</p> -->
      <p class="beer-list__column --age text-left"><span v-if="years.length > 0">{{ years}}</span> <span v-if="months.length > 0"><br>{{ months }}</span></p>
      <p class="beer-list__column --status text-left" :class="{ '--ageing': !readyToDrink }">{{ status }}</p>
      <p><button @click="edit">Edit beer</button></p>
    </div>
    <div v-if="this.editing">
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
      years: '',
      months: '',
      currentDate: Date.now(),
      editing: false,
      readyToDrink: false,
      status: 'Ageing'
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
      this.years = yearString
      var monthString = months + (months > 1 ? ' months' : ' month')
      this.months = monthString
      this.age = (years > 0 ? yearString : '') + monthString
      if (years >= this.beer.minimumAge) {
        this.readyToDrink = true
        this.status = 'Ready'
      }
    },
    edit: function () {
      this.editing = !this.editing
    }
  },
  watch: {
    beer: {
      deep: true,
      handler (val, oldVal) {
        this.calculateAge()
      }
    }
  }
}

</script>
