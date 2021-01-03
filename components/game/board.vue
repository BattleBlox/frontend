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
      'currentMode',
      'gameOver'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    additionalClasses () {
      const isBoardEnabled = this.selectedPlayer.isComputer || this.gameOver
        ? 'c-board--disabled'
        : ''

      return `u-background--${this.selectedPlayer.colour} c-board--${this.currentMode} ${isBoardEnabled}`
    }
  }
}
</script>

<style scoped lang="scss">
.c-board {
  display: flex;
  flex-wrap: wrap;
  border: 3px solid black;
  width: 606px;
  border-radius: 10px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
  max-width: 100%;
  user-select: none;

  &.c-board--disabled {
    pointer-events: none;
  }

  &.c-board--roll {
    background-color: white;
  }
}
</style>
