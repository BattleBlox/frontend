<template>
  <div :class="`c-turn-menu ${playerColourClass}`">
    <button
      @click="rollDice">
      Roll and End Turn
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('turn', [
      'currentPlayer',
      'currentMode',
      'rollValue'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    playerColourClass () {
      const player = this.players.find(plr => plr.name === this.currentPlayer)

      return `c-turn-menu--${player.colour}`
    },

    controlledTiles () {
      return this.tiles.filter(x => x.empire === this.currentPlayer).length
    }
  },

  methods: {
    ...mapActions('turn', [
      'selectMode',
      'roll'
    ]),

    rollDice () {
      this.selectMode('roll')
      this.roll(this.controlledTiles)
    }
  }
}
</script>

<style scoped lang="scss">
  .c-turn-menu {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 200px;
    height: 50px;
    background-color: black;
    display: flex;
    align-items: center;
    transition: background-color 0.2s ease-in-out;

    &.c-turn-menu--red {
      background-color: red;
    }

    &.c-turn-menu--blue {
      background-color: blue;
    }
  }
</style>
