<template>
  <div class="c-game">
    <board />

    <p>Current Player: {{ currentPlayer }} </p>
    <p>Current Mode: {{ currentMode }} </p>
    <p>Ranged Tiles: {{ rangedTiles }} </p>
    <p>Hit Points: {{ selectedTileHitPoints }} </p>
    <p>Roll Value: {{ rollValue }} </p>
    <p>Bonus Roll Points: {{ bonusRollPoints }} </p>

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
      'rangedTiles',
      'selectedTileHitPoints',
      'rollValue'
    ]),
    ...mapState('tiles', [
      'tiles'
    ]),
    controlledTiles () {
      return this.tiles.filter(x => x.empire === this.currentPlayer).length
    },
    bonusRollPoints () {
      return Math.round(this.controlledTiles / 6)
    }
  },

  created () {
    this.setupTiles()

    this.controlTiles({
      empire: 'Player 1',
      hitPoints: 2,
      tiles: [34, 44, 54, 64]
    })

    this.controlTiles({
      empire: 'Player 2',
      hitPoints: 2,
      tiles: [37, 47, 57, 67]
    })

    this.selectPlayer('Player 1')
    this.selectMode('attack')
  },

  methods: {
    ...mapActions('tiles', [
      'setupTiles',
      'controlTiles'
    ]),

    ...mapActions('turn', [
      'selectPlayer',
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

<style scoped>
</style>
