<template>
  <main class="beer-list">
    <div class="beer-list__header flex">
      <p class="beer-list__column --brewery text-left">Brewery</p>
      <p class="beer-list__column --name text-left">Name</p>
      <p class="beer-list__column --style text-left">Style</p>
      <p class="beer-list__column --abv text-right">Abv</p>
      <p class="beer-list__column --size text-right">Size</p>
      <p class="beer-list__column --quantity text-right">Qty.</p>
      <p class="beer-list__column --age text-left">Age</p>
      <p class="beer-list__column --status text-left">Status</p>
    </div>
    <beer-list-item v-for="beer in beers" :key="beer.id" :beer="beer" @save-beer="saveBeer"></beer-list-item>
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
          size: 33,
          date: '2017-12-11',
          minimumAge: 3,
          maximumAge: 0
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
          maximumAge: 0
        },
        {
          id: 3,
          brewery: 'Brouwerij Bosteels',
          name: 'Tripel Karmeliet',
          style: 'Tripel',
          abv: 8.4,
          quantity: 4,
          size: 33,
          date: '2019-08-16',
          minimumAge: 3,
          maximumAge: 0
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
          maximumAge: 0
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
          maximumAge: 0
        }
      ],
      currentDate: Date.now()
    }
  },
  methods: {
    addNewBeer: function (beer) {
      beer.id = this.beers.length + 1
      this.beers.push(beer)
    },
    saveBeer: function (beer) {
      Vue.set(this.beers, beer.id - 1, beer)
    }
  }
}
</script>

<style lang="scss">

.beer-list {
  box-shadow: 5px 5px 10px #dfdfdf, -5px -5px 10px #ffffff;
  margin: 0 auto;
  padding: 8px;
  width: 66%;
  max-width: 900px;

  &__beer-item-wrapper {
    border: 1px solid #e0e0e0;
    margin-bottom: 8px;
  }

  &__beer-item {
    align-items: center;

    &:last-child {
      margin-bottom: 0;
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
      flex: 0 0 17.5%;
    }

    &.--name {
      flex: 0 0 22.5%;
    }

    &.--style {
      flex: 0 0 15%;
    }

    &.--abv {
      flex: 0 0 7.5%;
    }

    &.--size {
      flex: 0 0 7.5%;
    }

    &.--quantity {
      flex: 0 0 10%;
      padding-right: 24px;
    }

    &.--age {
      flex: 0 0 10%;
    }

    &.--status {
      flex: 0 0 10%;
    }

    &.--ageing {
      color: #c0c0c0;
      font-style: italic;
    }
  }

  &__header {
    font-weight: 700;
    justify-content: flex-start;
  }
}

</style>
