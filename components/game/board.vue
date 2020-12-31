<template>
  <div :class="`c-board ${additionalClasses}`">
    <tile v-for="tile in tiles" :key="tile.identifier" :tile="tile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('turn', [
      'selectedPlayer',
      'currentMode'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    additionalClasses () {
      const isBoardEnabled = this.selectedPlayer.isComputer
        ? 'c-board--disabled'
        : ''

      return `c-board--${this.selectedPlayer.colour} c-board--${this.currentMode} ${isBoardEnabled}`
    }
  }
}
</script>

<style scoped lang="scss">
.c-board {
  display: flex;
  flex-wrap: wrap;
  border: 3px solid black;
  background-color: black;
  width: 606px;
  border-radius: 10px;
  margin: 20px auto;
  transition: all 0.3s ease-in-out;

  &.c-board--disabled {
    pointer-events: none;
  }

  &.c-board--red {
    border: 3px solid red;

    &.c-board--attack {
      background-color: red;
    }
  }

  &.c-board--blue {
    border: 3px solid blue;

    &.c-board--attack {
      background-color: blue;
    }
  }

  &.c-board--roll {
    background-color: white;
  }
}
</style>
