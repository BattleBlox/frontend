<template>
  <div v-if="currentPlayer" class="c-game">
    <board />
    <turn-menu />
    <bonus-button />
    <settings-button />
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
    ])
  },

  mounted () {
    this.setupBoard()

    this.setupBlockedTiles(25)

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
      'setupBoard',
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
