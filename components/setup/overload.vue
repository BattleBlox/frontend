<template>
  <div>
    <h2>Play Overload</h2>
    <p>Overload is an almost impossible challenge, can you win after starting with a great disadvantage?</p>
    <p>Choose your strategy wisely; any mistep can cost you the game.</p>

    <button class="c-menu-button" @click="start()">
      <c-icon icon="play-circle" />
      Start Overload
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { PLAYERS_SET_PLAYERS } from '@/store/mutations.constants'

export default {
  computed: {
    ...mapState('turn', [
      'currentMode',
      'rangedTiles',
      'rollValue'
    ]),
    ...mapState('tiles', [
      'tiles'
    ]),
    ...mapState('players', [
      'players'
    ])
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
      'selectPlayer'
    ]),

    start () {
      this.setupBoard()
      this.setupBlockedTiles(10)

      this.PLAYERS_SET_PLAYERS(
        [{
          name: 'You',
          colour: 'red',
          isComputer: false,
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
        empire: 'You',
        hitPoints: 3,
        tiles: [31, 41, 51, 61]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 10,
        tiles: [40, 50, 60, 70]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play?type=Overload' })
    }
  }
}
</script>
