<template>
  <div class="beer-list">
    <table>
      <thead>
        <tr>
          <th>Brewery</th>
          <th>Name</th>
          <th>Style</th>
          <th>Abv</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <beer-list-item v-for="beer in beers" :key="beer.id" :beer="beer"></beer-list-item>
      </tbody>
    </table>
    <beer-list-add-new @add-beer="updateBeerList"></beer-list-add-new>
  </div>
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
}

</style>
