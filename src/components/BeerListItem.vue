<template>
  <div class="beer-item">
    <div class="beer-item__content flex" v-if="!this.editing">
      <p class="beer-list__column --brewery text-left">{{ beer.brewery }}</p>
      <p class="beer-list__column --name text-left">{{ beer.name }}</p>
      <p class="beer-list__column --style text-left">{{ beer.style }}</p>
      <p class="beer-list__column --abv text-right">{{ beer.abv }}%</p>
      <p class="beer-list__column --size text-right">{{ beer.size }} cl</p>
      <p class="beer-list__column --quantity text-right">{{ beer.quantity }}</p>
      <p class="beer-list__column --age text-left">{{ age }}</p>
      <p class="beer-list__column --status text-left" v-if="this.readyToDrink">Ready to drink</p>
      <p><button @click="edit">Edit beer</button></p>
    </div>
    <div class="beer-item__editor" v-if="this.editing">
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

<style lang="scss">

.beer-item {
  border: 1px solid #e0e0e0;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
