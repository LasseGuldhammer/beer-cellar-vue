<template>
  <beer-list-form></beer-list-form>
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
      beer: {}
    }
  }
}
</script>

<style lang="scss">

</style>
