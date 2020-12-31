<template>
  <div v-if="currentPlayer" class="c-game">
    <board />
    <turn-menu />
    <bonus-button />
    <settings-button />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { PLAYERS_SET_PLAYERS } from '@/store/mutations.constants'

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
    this.setupOneVOne()
  },

  methods: {
    ...mapMutations('players', [
      PLAYERS_SET_PLAYERS
    ]),
    ...mapActions('tiles', [
      'setupBoard',
      'setupBlockedTiles',
      'controlTiles'
    ]),

    ...mapActions('turn', [
      'selectPlayer',
      'selectMode'
    ]),

    setupOneVOne () {
      this.setupBoard()

      this.setupBlockedTiles(25)

      this.PLAYERS_SET_PLAYERS(
        [{
          name: 'Player 1',
          colour: 'red',
          isComputer: true,
          index: 1
        },
        {
          name: 'Player 2',
          colour: 'blue',
          isComputer: true,
          index: 2
        }]
      )

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
    setupFourPlayer () {
      this.setupBoard()

      this.PLAYERS_SET_PLAYERS(
        [{
          name: 'Player 1',
          colour: 'red',
          isComputer: true,
          index: 1
        },
        {
          name: 'Player 2',
          colour: 'blue',
          isComputer: true,
          index: 2
        },
        {
          name: 'Player 3',
          colour: 'purple',
          isComputer: true,
          index: 3
        },
        {
          name: 'Player 4',
          colour: 'brown',
          isComputer: true,
          index: 4
        }]
      )

      this.setupBlockedTiles(10)

      this.controlTiles({
        empire: 'Player 1',
        hitPoints: 3,
        tiles: [1, 2, 11]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 3,
        tiles: [90, 99, 100]
      })

      this.controlTiles({
        empire: 'Player 3',
        hitPoints: 3,
        tiles: [81, 91, 92]
      })

      this.controlTiles({
        empire: 'Player 4',
        hitPoints: 3,
        tiles: [9, 10, 20]
      })

      this.selectMode('attack')
      this.selectPlayer(this.players.find(x => x.name === 'Player 1'))
    }
  }
}
</script>

<style scoped>
</style>
