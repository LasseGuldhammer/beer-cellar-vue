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
    <beer-list-item v-for="beer in beers" :key="beer.id" :beer="beer"></beer-list-item>
    <beer-list-add-new @add-beer="updateBeerList"></beer-list-add-new>
  </main>
</template>

<script>
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
          date: 'December 11, 2017 00:00:00',
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
          date: 'October 20, 2018 00:00:00',
          minimumAge: 1,
          maximumAge: 0
        },
        {
          id: 3,
          brewery: 'Stigbergets',
          name: 'Amazing Haze',
          style: 'IPA',
          abv: 6.4,
          quantity: 2,
          size: 44,
          date: 'Januar 04, 2020 00:00:00',
          minimumAge: 0,
          maximumAge: 0
        }
      ]
    }
  },
  methods: {
    updateBeerList: function (beer) {
      this.beers.push(beer)
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

  &__beer-item {
    align-items: center;
    border: 1px solid #e0e0e0;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__beer-form {
    width: 100px;
  }

  &__column {
    padding-left: 8px;

    &.--brewery {
      flex: 0 0 15%;
    }

    &.--name {
      flex: 0 0 20%;
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
      flex: 0 0 6%;
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
