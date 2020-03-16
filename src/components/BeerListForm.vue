<template>
  <section>
    <form v-if="beer">
      <input class="beer-item__input" type="text" v-model="beer.brewery" required>
      <input class="beer-item__input" type="text" v-model="beer.name" required>
      <input class="beer-item__input" type="text" v-model="beer.style">
      <!-- <input type="number"> to <input type="text" inputmode="numeric" pattern="[0-9]*"> -->
      <input class="beer-item__input" type="number" v-model.number="beer.abv" min="0" step="0.1">
      <input class="beer-item__input" type="number" v-model.number="beer.size">
      <input class="beer-item__input" type="number" v-model.number="beer.quantity">
      <input class="beer-item__input" type="date" v-model="beer.date">
      <input type="submit" value="Save beer" @click.prevent="saveBeer">
    </form>
    <form v-if="!beer">
      <input class="beer-item__input" type="text" v-model="newBeer.brewery" required>
      <input class="beer-item__input" type="text" v-model="newBeer.name" required>
      <input class="beer-item__input" type="text" v-model="newBeer.style">
      <!-- <input type="number"> to <input type="text" inputmode="numeric" pattern="[0-9]*"> -->
      <input class="beer-item__input" type="number" v-model.number="newBeer.abv" min="0" step="0.1">
      <input class="beer-item__input" type="number" v-model.number="newBeer.size">
      <input class="beer-item__input" type="number" v-model.number="newBeer.quantity">
      <input class="beer-item__input" type="date" v-model="newBeer.date">
      <input type="submit" value="Add new beer" @click.prevent="addBeer">
    </form>
  </section>

</template>

<script>
export default {
  name: 'BeerListForm',
  props: {
    beer: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      newBeer: {}
    }
  },
  methods: {
    saveBeer: function () {
      this.$emit('save-beer')
    },
    addBeer: function () {
      this.$emit('add-beer', this.newBeer)
      this.newBeer = {}
    }
  }
}
</script>

<style lang="scss">

.beer-item {

  &__input {
    width: 100px;
  }
}

</style>
