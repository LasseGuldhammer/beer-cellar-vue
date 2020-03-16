<template>
  <tr class="flex beer-item" v-if="!this.editing">
    <div class="flex beer-item__content">
      <td>{{ beer.brewery }}</td>
      <td>{{ beer.name }}</td>
      <td>{{ beer.style }}</td>
      <td>{{ beer.abv }}%</td>
      <td>{{ beer.size }} cl</td>
      <td>Quantity: {{ beer.quantity }}</td>
      <td>Age: {{ age }}</td>
      <td v-if="this.readyToDrink">Ready to drink</td>
      <td><button @click="edit">Edit beer</button></td>
    </div>
  </tr>
  <!-- <div class="flex beer-item__editor" v-if="this.editing">
    <beer-list-form :beer="beer" @save-beer="edit"></beer-list-form>
  </div> -->
</template>

<script>
// import BeerListForm from './BeerListForm.vue'

export default {
  name: 'BeerListItem',
  components: {
    // BeerListForm
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

// add class, avoid element selectors
p {
  padding: 8px;
}
</style>
