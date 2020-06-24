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

.beer-cellar-wrapper {
  padding: 32px 16px;
}

.beer-cellar {
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
    width: 50%;

    &:last-child {
      margin-bottom: 0;
    }

    &.expanded {
      flex-wrap: wrap;

      & .beer-cellar__column {
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

.add-beer {

  &__wrapper {
    height: 0;
    width: 0;
  }

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
}

</style>
