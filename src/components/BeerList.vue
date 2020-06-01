<template>
  <main class="beer-list">
    <h1 class="text-uppercase">Beer Cellar</h1>
    <div class="beer-list__header flex">
      <p class="beer-list__column --brewery pointer text-left" @click="sortBeers('brewery')">Brewery</p>
      <p class="beer-list__column --name pointer text-left" @click="sortBeers('name')">Name</p>
      <p class="beer-list__column --style pointer text-left" @click="sortBeers('style')">Style</p>
      <p class="beer-list__column --abv pointer text-right" @click="sortBeers('abv')">Abv</p>
      <p class="beer-list__column --size pointer text-right" @click="sortBeers('size')">Size</p>
      <p class="beer-list__column --quantity pointer text-right" @click="sortBeers('quantity')">Qty.</p>
      <p class="beer-list__column --age pointer text-left" @click="sortBeers('date')">Age</p>
      <p class="beer-list__column --status pointer text-left" @click="sortBeers('status')">Status</p>
    </div>
    <beer-list-item v-for="beer in sortedBeers" :key="beer.id" :beer="beer" @save-beer="saveBeer"></beer-list-item>
    <beer-list-add-new @add-beer="addNewBeer"></beer-list-add-new>
  </main>
</template>

<script>
import Vue from 'vue'
import BeerListItem from './BeerListItem.vue'
import BeerListAddNew from './BeerListAddNew.vue'

export default {
  name: 'BeerList',
  components: {
    BeerListAddNew,
    BeerListItem
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
          quantity: 9,
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
    this.sortBeers('brewery')
  }
}
</script>

<style lang="scss">

$small: 480px;
$medium: 768px;
$large: 992px;
$xlarge: 1200px;

.beer-list {
  box-shadow: 5px 5px 10px #dfdfdf, -5px -5px 10px #ffffff;
  margin: 0 auto;
  padding: 8px;
  width: 100%;
  max-width: none;

  &__beer-item-wrapper {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  &__beer-item {
    align-items: start;
    min-height: 40px;
    padding: 8px 0;

    &:last-child {
      margin-bottom: 0;
    }

    &.expanded {
      flex-wrap: wrap;

      & .beer-list__column {
        display: inline;
      }
    }
  }

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

  &__column {
    padding-left: 8px;

    &.--brewery {
      flex: 0 0 31%;
      text-align: left;

      @media (min-width: $medium) {
        flex: 0 0 17.5%;
      }
    }

    &.--name {
      flex: 0 0 43%;
      font-weight: bold;
      margin-bottom: 4px;
      text-align: left;

      @media (min-width: $medium) {
        flex: 0 0 22.5%;
      }
    }

    &.--style {
      flex: 0 0 26%;
      text-align: left;

      @media (min-width: $medium) {
        flex: 0 0 15%;
      }
    }

    &.--abv {
      flex: 0 0 15%;
      display: none;
      text-align: left;

      @media (min-width: $medium) {
        display: inline;
        flex: 0 0 7.5%;
        text-align: right;
      }
    }

    &.--size {
      flex: 0 0 15%;
      display: none;
      text-align: left;

      @media (min-width: $medium) {
        display: inline;
        flex: 0 0 7.5%;
        text-align: right;
      }
    }

    &.--quantity {
      flex: 0 0 15%;
      padding-right: 24px;
      display: none;
      text-align: left;

      @media (min-width: $medium) {
        display: inline;
        flex: 0 0 10%;
        text-align: right;
      }
    }

    &.--age {
      flex: 0 0 30%;
      display: none;
      text-align: left;

      @media (min-width: $medium) {
        display: inline;
        flex: 0 0 10%;
      }
    }

    &.--status {
      flex: 0 0 25%;
      display: none;
      text-align: left;

      @media (min-width: $medium) {
        display: inline;
        flex: 0 0 10%;
      }
    }

    &.--ageing {
      color: #c0c0c0;
      font-style: italic;
    }
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

</style>
