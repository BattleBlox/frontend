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
    ]),
    ...mapState('players', [
      'players'
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

    this.selectMode('attack')
    this.selectPlayer(this.players.find(x => x.name === 'Player 1'))
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
