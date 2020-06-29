<template>
  <div class="beer-cellar__beer-item-wrapper grid relative">
      <span class="beer-cellar__column --name">{{ beer.name }}</span>
      <span class="beer-cellar__column --brewery">{{ beer.brewery }}</span>
      <span class="beer-cellar__column --style">{{ beer.style }}</span>
      <span class="beer-cellar__column --abv">{{ beer.abv }}<small>%</small></span>
      <span class="beer-cellar__column --size">{{ beer.size }} cl</span>
      <span class="beer-cellar__column --quantity"><img src="../assets/icons/beer.svg">{{ beer.quantity }}</span>
      <span class="beer-cellar__column --age">
        <span v-if="years !== 0">{{ yearString }}</span>
        <span v-if="months !== 0 && years !== 0">
          <br>{{ monthString }}
        </span>
        <span v-else-if="months !== 0">
          {{ monthString }}
        </span>
      </span>
      <span class="beer-cellar__column --status" :class="{ '--ageing': !ready }">{{ beer.status }}</span>
      <button class="beer-cellar__beer-item-edit" @click="edit">Edit beer</button>
    <div v-if="this.editing">
      <beer-cellar-form :beer="beer" @save-beer="edit" mode="editBeer"></beer-cellar-form>
    </div>

    <!-- <div class="beer-cellar__beer-item flex --column" :class="{ 'visibility-hidden': editing, 'expanded': expanded }" @click="expandItem">

      <span class="beer-cellar__column --name">{{ beer.name }}</span>
      <span class="beer-cellar__column --brewery">{{ beer.brewery }}</span>
      <span class="beer-cellar__column --style">{{ beer.style }}</span>

    </div>

    <div class="beer-cellar__beer-item flex --column" :class="{ 'visibility-hidden': editing, 'expanded': expanded }" @click="expandItem">

      <span class="beer-cellar__column --abv">{{ beer.abv }}<small>%</small></span>
      <span class="beer-cellar__column --size">{{ beer.size }} cl</span>
      <span class="beer-cellar__column --quantity">{{ beer.quantity }}</span>
      <span class="beer-cellar__column --age">
        <span v-if="years !== 0">{{ yearString }}</span>
        <span v-if="months !== 0 && years !== 0">
          <br>{{ monthString }}
        </span>
        <span v-else-if="months !== 0">
          {{ monthString }}
        </span>
      </span>
      <span class="beer-cellar__column --status" :class="{ '--ageing': !ready }">{{ beer.status }}</span>
      <button class="beer-cellar__beer-item-edit" @click="edit">Edit beer</button>

    </div>
    <div v-if="this.editing">
      <beer-cellar-form :beer="beer" @save-beer="edit" mode="editBeer"></beer-cellar-form>
    </div> -->

  </div>
</template>

<script>
import BeerCellarForm from './BeerCellarForm.vue'

export default {
  name: 'BeerCellarItem',
  components: {
    BeerCellarForm
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
      expanded: false,
      ready: false,
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
      if (this.beer.date === undefined || this.beer.date === '') {
        this.months = 0
        this.years = 0
        return
      }
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
        this.beer.status = 'Ready'
      }
    },
    edit: function (beer) {
      if (this.editing) {
        this.$emit('save-beer', beer)
      }
      this.editing = !this.editing
    },
    expandItem: function () {
      this.expanded = !this.expanded
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
