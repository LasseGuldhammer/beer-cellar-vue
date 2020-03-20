<template>
  <div class="beer-list__beer-item-wrapper position-relative">
    <div class="beer-list__beer-item flex" :class="{ 'visibility-hidden': editing }">
      <p class="beer-list__column --brewery text-left">{{ beer.brewery }}</p>
      <p class="beer-list__column --name text-left">{{ beer.name }}</p>
      <p class="beer-list__column --style text-left">{{ beer.style }}</p>
      <p class="beer-list__column --abv text-right">{{ beer.abv }}<small>%</small></p>
      <p class="beer-list__column --size text-right">{{ beer.size }} cl</p>
      <p class="beer-list__column --quantity text-right">{{ beer.quantity }}</p>
      <p class="beer-list__column --age text-left">
        <span v-if="years !== 0">{{ yearString }}</span>
        <span v-if="months !== 0 && years !== 0">
          <br>{{ monthString }}
        </span>
        <span v-else-if="months !== 0">
          {{ monthString }}
        </span>
      </p>
      <p class="beer-list__column --status text-left" :class="{ '--ageing': !ready }">{{ status }}</p>
      <button @click="edit">Edit beer</button>
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
      editing: false,
      ready: false,
      status: 'Ageing',
      months: 0,
      monthString: '',
      years: 0,
      yearString: ''
    }
  },
  created: function () {
    this.calculateAge()
  },
  methods: {
    calculateAge: function () {
      var date = new Date(this.beer.date)
      if (date > this.$parent.currentDate) {
        return
      }
      var totalMonths = Math.floor((this.$parent.currentDate - date) / 2627942400)
      this.years = Math.floor(totalMonths / 12)
      this.months = Math.floor(totalMonths % 12)
      this.yearString = this.years + (this.years > 1 ? ' years' : ' year')
      this.monthString = this.months + (this.months > 1 ? ' months' : ' month')
      if (this.years >= this.beer.minimumAge) {
        this.ready = true
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
