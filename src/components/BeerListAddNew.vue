<template>
  <section>
    <button @click="displayForm = !displayForm">Add new beer</button>
    <beer-list-form v-if="displayForm" @add-beer="addBeer"></beer-list-form>
  </section>
</template>

<script>
import BeerListForm from './BeerListForm.vue'

export default {
  name: 'BeerListAddNew',
  components: {
    BeerListForm
  },
  data () {
    return {
      beer: {},
      displayForm: false
    }
  },
  methods: {
    addBeer: function (beer) {
      this.$emit('add-beer', beer)
      this.displayForm = false
    }
  }
}
</script>

<style lang="scss">

</style>
