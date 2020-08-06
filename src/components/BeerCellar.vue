<template>
  <div class="beer-cellar">
    <header class="header fixed flex">
      <span class="header__title">Beer Cellar</span>
      <a href="#" class="header__image-item">
        <img class="header__image-item-icon" src="../assets/icons/sort.svg">
      </a>
      <a href="#" class="header__image-item">
        <img class="header__image-item-icon" src="../assets/icons/filter.svg">
      </a>
      <a href="#" class="header__image-item">
        <img class="header__image-item-icon" src="../assets/icons/settings.svg">
      </a>
    </header>
    <main class="beer-cellar__wrapper">
      <beer-cellar-item v-for="beer in sortedBeers" :key="beer.id" :beer="beer" @save-beer="saveBeer" @drink-one="drinkOne" @drink-all="removeBeer"></beer-cellar-item>
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
          id: 0,
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
          id: 1,
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
          id: 2,
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
          id: 3,
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
          id: 4,
          brewery: 'To Øl',
          name: 'Black Malts & Body Salts',
          style: 'Black DIPA',
          abv: 9.9,
          quantity: 3,
          size: 33,
          date: '2020-02-01',
          minimumAge: 1,
          maximumAge: 0,
          status: 'Ageing'
        }
      ],
      currentDate: Date.now(),
      reversed: false,
      sortedBy: '',
      sortedBeers: []
    }
  },
  methods: {
    addNewBeer: function (beer) {
      beer.id = this.beers.length
      this.beers.push(beer)
      this.sortBeers(this.sortedBy, this.reversed)
    },
    drinkOne: function (id) {
      let quantity
      this.beers.forEach(function (item) {
        if (id === item.id) {
          item.quantity -= 1
          quantity = item.quantity
        }
      })
      if (quantity === 0) {
        this.removeBeer(id)
      }
    },
    getBeerPosition: function (id) {
      let beerItem
      this.beers.forEach(function (item) {
        if (id === item.id) {
          beerItem = item
        }
      })
      return this.beers.indexOf(beerItem)
    },
    removeBeer: function (id) {
      const beers = this.beers
      const position = this.getBeerPosition(id)
      setTimeout(function () {
        beers.splice(position, 1)
      }, 250)
    },
    saveBeer: function (beer) {
      const position = this.getBeerPosition(beer.id)
      Vue.set(this.beers, position, beer)
    },
    sortBeers: function (key, reverse) {
      if (key !== this.sortedBy || !this.reversed) {
        var sortedList = this.beers
        sortedList.sort(function (a, b) {
          return (a[key] > b[key]) ? 1 : -1
        })
        this.sortedBy = key
        this.sortedBeers = sortedList
      } else {
        this.sortedBeers = this.sortedBeers.reverse()
      }
    }
  },
  created: function () {
    this.sortBeers('name', this.reversed)
  }
}
</script>

<style lang="scss">

/* VARIABLES */

$small: 480px;
$medium: 768px;
$large: 992px;
$xlarge: 1200px;

$wrapper-padding: 32px 16px;
$header-height: 72px;

/* BEER CELLAR */

.beer-cellar {
  padding-bottom: 32px;
  padding-top: $header-height;

  &__wrapper {
    padding: $wrapper-padding;
  }

  &__beer-item-edit {
    display: none;
  }
}

/* HEADER */

.header {
  align-items: flex-end;
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba($color: #000000, $alpha: 0.25);
  height: $header-height;
  left: 0;
  padding-left: 16px;
  padding-right: 16px;
  right: 0;
  top: 0;
  width: 100%;

  &.--form {
    margin-bottom: 32px;
  }

  &__title {
    flex: 1 0 auto;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    margin-left: 8px;
    text-align: left;
  }

  &__image-item {
    display: block;
    padding: 8px 12px;
  }

  &__image-item-icon {
    height: 20px;
    width: 20px;
  }

  &__text-item {
    background: #ffffff;
    border: 0;
    color: #2c3e50;
    padding: 12px 16px;
    text-decoration: none;
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
    "name name status status"
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

    &.--big {
      height: 15px;
      margin-right: 4px;
    }
  }

  &__age {
    display: none;
  }

  &__status {
    color: #004A10;
    font-size: 12px;
    font-weight: 300;
    grid-area: status;
    align-self: start;
    justify-self: end;
  }

  &__checkmark-icon {
    height: 13px;
    margin-left: 3px;
    vertical-align: text-top;

    &.--big {
      height: 15px;
      margin-left: 1px;
      vertical-align: initial;
    }
  }

  &__expanded-wrapper {
    background: #ffffff;
    // background-image: url(../assets/icons/beer.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40%;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 84px 8px 8px;
    right: 0;
    top: 0;
    z-index: 100;
  }

  &__expanded-heading {
    font-size: 36px;
    margin: 42px 0;
  }

  &__expanded-paragraph {
    font-size: 24px;
    margin: 0 0 6px 0;
  }

  &__expanded-details {
    font-size: 18px;
    justify-content: space-evenly;
    margin-top: 48px;
  }

  &__expanded-status {
    font-size: 16px;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "status1 status2"
      "age1 age2"
      "min1 min2";
    margin-top: 48px;
  }

  &__expanded-status-item {
    margin-bottom: 16px;
    padding-right: 8px;
    text-align: right;

    &:nth-of-type(even) {
      font-weight: 300;
      padding-left: 8px;
      text-align: left;
    }
  }

  &__expanded-buttons {
    justify-content: center;
    margin: 40px auto 0;
  }

  &__expanded-buttons-item {
    background: #ffffff;
    border: 1px solid black;
    border-radius: 4px;
    margin: 0 20px;
    padding: 8px;
  }
}

/* BEER CELLAR ADD NEW */

$button-offset: 12;
$button-size: 56;
$button-transform-origin: $button-offset + ($button-size / 2) + px;

.add-beer {
  height: 0;
  width: 0;

  &__button {
    background: #ffffff;
    background-image: url('../assets/icons/add.svg');
    background-position: center;
    background-repeat: no-repeat;
    bottom: $button-offset + px;
    right: $button-offset + px;
    border: 0;
    border-radius: 100%;
    box-shadow: 0 2px 8px 0 rgba($color: #000000, $alpha: 0.25);
    height: $button-size + px;
    width: $button-size + px;
  }

  /* &__form-container {

  } */
}

/* BEER CELLAR FORM */

.beer-form {
  background: #ffffff;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  // padding: 32px 0;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 200;

  &__fieldset {
    border: 0;
    margin: 0;
    padding: 0 16px;

    &.--required {
      border-bottom: 4px solid #c4c4c4;
      overflow: hidden;
    }

    &.--optional {
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 12px;
      padding-top: 24px;
    }
  }

  &__label {
    font-size: 12px;
  }

  &__input {
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid transparent;
    border-bottom: 2px solid #e3e3e3;
    height: 27px;
    margin-bottom: 36px;
    position: relative;

    &:nth-of-type(3) {
      margin-bottom: 48px;
    }

    &[type=date]:empty {
      color: #909090;
    }

    &:active,
    &:focus {
      outline: none;
    }

    &[required] {
      box-shadow: none;
    }

    &[value=""] {
      &:valid {
        border-bottom: 2px solid green;
      }

      &:invalid {
        border-bottom: 2px solid red;
      }
    }

    &.--large {
      width: 100%;
    }

    &.--small {
      width: 40%;
    }
  }
}

/* ANIMATIONS */

.grow-enter-active {
  animation: grow .25s ease-out
}
.grow-leave-active {
  animation: fade-down .20s ease-in reverse;
}

.grow-fab-enter-active {
  animation: grow-fab .25s ease-out
}
.grow-fab-leave-active {
  animation: fade-down .20s ease-in reverse;
}

@keyframes grow {
  0% {
    transform: scale(0);
    // transform-origin: calc(100% - #{$button-transform-origin}) calc(100% - #{$button-transform-origin});
  }
  100% {
    transform: scale(1);
    // transform-origin: calc(100% - #{$button-transform-origin}) calc(100% - #{$button-transform-origin});
  }
}

@keyframes grow-fab {
  0% {
    transform: scale(0);
    transform-origin: calc(100% - #{$button-transform-origin}) calc(100% - #{$button-transform-origin});
  }
  100% {
    transform: scale(1);
    transform-origin: calc(100% - #{$button-transform-origin}) calc(100% - #{$button-transform-origin});
  }
}

@keyframes fade-down {
  0% {
    opacity: 0.66;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%)
  }
}

</style>
