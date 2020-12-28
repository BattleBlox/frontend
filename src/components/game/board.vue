<template>
  <div :class="`c-board ${playerColourClass}`">
    <tile v-for="tile in tiles" :key="tile.identifier" :tile="tile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('turn', [
      'currentPlayer'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    playerColourClass () {
      const player = this.players.find(plr => plr.name === this.currentPlayer)

      return `c-board--${player.colour}`
    }
  }
}
</script>

<style scoped lang="scss">
.c-board {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  background-color: black;
  width: 606px;
  border-radius: 10px;
  margin: 20px auto;
  transition: border 0.2s ease-in-out;

  &.c-board--red {
    border: 3px solid red;
    background-color: red;
  }

  &.c-board--blue {
    border: 3px solid blue;
    background-color: blue;
  }
}
</style>
