<template>
  <div v-if="currentPlayer" class="c-game">
    <board />

    <p>Bonus Tile Points: {{ bonusRollPoints }} </p>
    <p>Bonus Capital Points: {{ bonusCapitalPoints }} </p>

    <turn-menu />
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
    },
    bonusCapitalPoints () {
      return this.tiles.filter(x => x.empire === this.currentPlayer && x.hitPoints >= 10).length
    }
  },

  mounted () {
    this.setupTiles()

    this.setupBlockedTiles({ numberOfTiles: 15, excludedTiles: [34, 44, 54, 64, 37, 47, 57, 67] })

    this.controlTiles({
      empire: 'Player 1',
      hitPoints: 3,
      tiles: [34, 44, 54, 64]
    })

    this.controlTiles({
      empire: 'Player 2',
      hitPoints: 3,
      tiles: [37, 47, 57, 67]
    })

    this.selectPlayer('Player 1')
    this.selectMode('attack')
  },

  methods: {
    ...mapActions('tiles', [
      'setupTiles',
      'setupBlockedTiles',
      'controlTiles'
    ]),

    ...mapActions('turn', [
      'selectPlayer',
      'selectMode'
    ])
  }
}
</script>

<style scoped>
</style>
