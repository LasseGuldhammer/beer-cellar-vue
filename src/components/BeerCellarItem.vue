<template>
  <section>

    <!-- List view -->
    <div class="beer-cellar-item pointer grid" @click="expandItem">
      <span class="beer-cellar-item__name">{{ beer.name }}</span>
      <span class="beer-cellar-item__brewery">{{ beer.brewery }}</span>
      <span class="beer-cellar-item__style">{{ beer.style }}</span>
      <span class="beer-cellar-item__abv" v-if="beer.abv">{{ beer.abv }}<small>%</small></span>
      <span class="beer-cellar-item__size" v-if="beer.size">{{ beer.size }} cl</span>
      <span class="beer-cellar-item__quantity" v-if="beer.quantity"><img class="beer-cellar-item__beer-icon" src="../assets/icons/beer.svg">{{ beer.quantity }}</span>
      <span class="beer-cellar-item__age">
        {{ age }}
      </span>
      <span class="beer-cellar-item__status" v-if="ready">{{ beer.status }}<img class="beer-cellar-item__checkmark-icon" src="../assets/icons/checkmark.svg"></span>
      <!-- <button class="beer-cellar-item__edit" @click="edit">Edit beer</button> -->
      <div v-if="this.editing">
        <beer-cellar-form :beer="beer" @save-beer="edit" mode="editBeer"></beer-cellar-form>
      </div>
    </div>

    <!-- Expanded view -->
    <div class="beer-cellar-item__expanded-wrapper absolute" v-if="expanded">
      <header class="header flex">
        <span class="header__title">Beer Details</span>
        <button class="header__text-item text-uppercase pointer" @click="expandItem">
          Cancel
        </button>
        <button class="header__text-item text-uppercase pointer">
          Edit
        </button>
      </header>
      <h1 class="beer-cellar-item__expanded-heading">{{ beer.name }}</h1>
      <p class="beer-cellar-item__expanded-paragraph">{{ beer.brewery }}</p>
      <p class="beer-cellar-item__expanded-paragraph">{{ beer.style }}</p>
      <div class="beer-cellar-item__expanded-details flex">
        <span v-if="beer.abv">{{ beer.abv }}%</span>
        <span v-if="beer.size">{{ beer.size }} cl</span>
        <span v-if="beer.quantity"><img class="beer-cellar-item__beer-icon --big" src="../assets/icons/beer.svg"> {{ beer.quantity }}</span>
      </div>
      <div class="beer-cellar-item__expanded-status grid">
        <span class="beer-cellar-item__expanded-status-item">Status</span>
        <span class="beer-cellar-item__expanded-status-item">{{ beer.status }} <img class="beer-cellar-item__checkmark-icon --big" src="../assets/icons/checkmark.svg" v-if="ready"></span>
        <span class="beer-cellar-item__expanded-status-item" v-if="age">Age</span>
        <span class="beer-cellar-item__expanded-status-item" v-if="age">{{ age }}</span>
        <span class="beer-cellar-item__expanded-status-item" v-if="beer.minimumAge">Minimum Age</span>
        <span class="beer-cellar-item__expanded-status-item" v-if="beer.minimumAge">{{ beer.minimumAge }} {{ beer.minimumAge === 1 ? 'year' : 'years' }}</span>
      </div>
      <div class="beer-cellar-item__expanded-buttons flex">
        <button class="beer-cellar-item__expanded-buttons-item pointer text-uppercase">Drink One</button>
        <button class="beer-cellar-item__expanded-buttons-item pointer text-uppercase">Drink All</button>
      </div>
    </div>
  </section>

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
      years: 0
    }
  },
  computed: {
    age: function () {
      let age = ''
      const years = this.years > 0 ? (this.years === 1 ? '1 year' : this.years + ' years') : ''
      const months = this.months > 0 ? (this.months === 1 ? '1 month' : this.months + ' months') : ''
      if (this.years && this.months) {
        age = years + ', ' + months
      } else if (this.years) {
        age = years
      } else if (this.months) {
        age = months
      }
      return age
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
        this.beer.status = 'Ageing'
        return
      }
      var date = new Date(this.beer.date)
      if (date > this.$parent.currentDate) {
        return
      }
      var totalMonths = Math.floor((this.$parent.currentDate - date) / 2627942400)
      this.years = Math.floor(totalMonths / 12)
      this.months = Math.floor(totalMonths % 12)
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
      const body = document.body
      this.expanded = !this.expanded
      if (this.expanded) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
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
