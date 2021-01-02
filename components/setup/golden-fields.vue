<template>
  <div>
    <h2>Play Golden Fields</h2>
    <p>Face up against the computer and fight for control of the golden field.</p>
    <p>The player who controls the field, will probably win the game.</p>

    <button class="c-menu-button" @click="start()">
      <c-icon icon="play-circle" />
      Start Golden Fields
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
        tiles: [2, 3]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 3,
        tiles: [98, 99]
      })

      this.controlTiles({
        empire: 'blocked',
        hitPoints: 0,
        tiles: [22, 22, 23, 24, 25, 26, 27, 28, 29, 32, 52, 62, 72, 39, 49, 69, 79, 73, 74, 75, 76, 77, 78, 79]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play?type=Golden Fields' })
    }
  }
}
</script>
