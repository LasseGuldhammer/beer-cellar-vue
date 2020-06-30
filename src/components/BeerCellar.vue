<template>
  <div>
    <header class="beer-cellar-header flex">
      <span class="beer-cellar-header__title">Beer Cellar</span>
      <a href="#" class="beer-cellar-header__link">
        <img class="beer-cellar-header__link-icon" src="../assets/icons/sort.svg">
      </a>
      <a href="#" class="beer-cellar-header__link">
        <img class="beer-cellar-header__link-icon" src="../assets/icons/filter.svg">
      </a>
      <a href="#" class="beer-cellar-header__link">
        <img class="beer-cellar-header__link-icon" src="../assets/icons/settings.svg">
      </a>
    </header>
    <main class="beer-cellar-wrapper">
      <beer-cellar-item v-for="beer in sortedBeers" :key="beer.id" :beer="beer" @save-beer="saveBeer"></beer-cellar-item>
      <beer-cellar-add-new @add-beer="addNewBeer"></beer-cellar-add-new>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import BeerCellarItem from './BeerCellarItem.vue'
import BeerCellarAddNew from './BeerCellarAddNew.vue'

export default {
  name: 'BeerCellar',
  components: {
    BeerCellarAddNew,
    BeerCellarItem
  },
  data () {
    return {
      beers: [
        {
          id: 1,
          brewery: 'AleSmith',
          name: 'Speedway Stout',
          style: 'Imperial stout',
          abv: 12,
          quantity: 8,
          size: 47,
          date: '2017-12-11',
          minimumAge: 3,
          maximumAge: 0,
          status: 'Ageing'
        },
        {
          id: 2,
          brewery: 'Ayinger',
          name: 'Celebrator',
          style: 'Doppelbock',
          abv: 6.7,
          quantity: 11,
          size: 33,
          date: '2018-10-20',
          minimumAge: 1,
          maximumAge: 0,
          status: 'Ageing'
        },
        {
          id: 3,
          brewery: 'Brouwerij Bosteels',
          name: 'Tripel Karmeliet',
          style: 'Tripel',
          abv: 8.4,
          quantity: 4,
          size: 75,
          date: '2019-08-16',
          minimumAge: 3,
          maximumAge: 0,
          status: 'Ageing'
        },
        {
          id: 4,
          brewery: 'Stigbergets',
          name: 'Amazing Haze',
          style: 'IPA',
          abv: 6.4,
          quantity: 2,
          size: 44,
          date: '2020-01-04',
          minimumAge: 0,
          maximumAge: 0,
          status: 'Ageing'
        },
        {
          id: 5,
          brewery: 'To Øl',
          name: 'Black Malts & Body Salts',
          style: 'Black DIPA',
          abv: 9.9,
          quantity: 3,
          size: 33,
          date: '2020-02-01',
          minimumAge: 0,
          maximumAge: 0,
          status: 'Ageing'
        }
      ],
      currentDate: Date.now(),
      sortedBy: '',
      sortedBeers: []
    }
  },
  methods: {
    addNewBeer: function (beer) {
      beer.id = this.beers.length + 1
      this.beers.push(beer)
    },
    saveBeer: function (beer) {
      Vue.set(this.beers, beer.id - 1, beer)
    },
    sortBeers: function (param) {
      if (param !== this.sortedBy) {
        var sortedList = this.beers
        sortedList.sort(function (a, b) {
          return (a[param] > b[param]) ? 1 : -1
        })
        this.sortedBy = param
        this.sortedBeers = sortedList
      } else {
        this.sortedBeers = this.sortedBeers.reverse()
      }
    }
  },
  created: function () {
    this.sortBeers('name')
  }
}
</script>

<style lang="scss">

/* VARIABLES */

$small: 480px;
$medium: 768px;
$large: 992px;
$xlarge: 1200px;

/* BEER CELLAR HEADER */

.beer-cellar-header {
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba($color: #000000, $alpha: 0.25);
  height: 84px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 46px;
  width: 100%;

  &__title {
    flex: 1 0 auto;
    font-size: 18px;
    font-weight: 700;
    margin-left: 8px;
    text-align: left;
  }

  &__link {
    display: block;
    padding-left: 28px;
  }

  &__link-icon {
    height: 20px;
    width: 20px;
  }
}

/* BEER_CELLAR */

.beer-cellar-wrapper {
  padding: 32px 16px;
}

.beer-cellar {
  box-shadow: 5px 5px 10px #dfdfdf, -5px -5px 10px #ffffff;
  margin: 0 auto;
  padding: 8px;
  width: 100%;
  max-width: none;

  &__beer-form {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  &__beer-input {
    width: 100px;

    /* &:valid {
      outline: 1px solid green;
    } */

    /* &:invalid {
      outline: 1px solid red;
    } */
  }

  &__beer-item-edit {
    display: none;

    @media (min-width: $medium) {
      display: block;
    }
  }

  &__header {
    font-weight: 700;
    justify-content: flex-start;
  }
}

/* BEER CELLAR ITEM */

.beer-cellar-item {
  align-items: end;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  justify-items: start;
  grid-template-columns: auto 45px 45px 35px;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "name name name name"
    "brewery brewery . ."
    "style abv size quantity";
  margin-bottom: 8px;
  padding: 8px;

  &__name {
    grid-area: name;
    font-weight: bold;
    margin-bottom: 9px;
  }

  &__brewery {
    grid-area: brewery;
  }

  &__style {
    grid-area: style;
  }

  &__abv {
    grid-area: abv;
    justify-self: end;
  }

  &__size {
    grid-area: size;
    justify-self: end;
  }

  &__quantity {
    grid-area: quantity;
    justify-self: end;
  }

  &__beer-icon {
    height: 11px;
    margin-right: 5px;
  }

  &__age {
    display: none;
    text-align: left;
  }

  &__status {
    display: none;
    text-align: left;
  }

  &__ageing {
    color: #c0c0c0;
    font-style: italic;
  }
}

/* BEER CELLAR ADD NEW */

.add-beer {
  height: 0;
  width: 0;

  &__button {
    background: #ffffff;
    background-image: url('../assets/icons/add.svg');
    background-position: center;
    background-repeat: no-repeat;
    bottom: 16px;
    right: 16px;
    border: 0;
    border-radius: 100%;
    box-shadow: 0 2px 8px 0 rgba($color: #000000, $alpha: 0.25);
    height: 56px;
    width: 56px;
  }

  &__form-container {
    background: #ffffff;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
  }

  &__link-text {
    color: #2c3e50;
    text-decoration: none;
    text-decoration-color: #ffffff;
  }
}

/* ANIMATIONS */

.grow-enter-active {
  animation: grow .33s;
}
.grow-leave-active {
  animation: grow .33s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
    transform-origin: calc(100% - 44px) calc(100% - 44px);
  }
  100% {
    transform: scale(1);
    transform-origin: calc(100% - 44px) calc(100% - 44px);
  }
}

</style>
