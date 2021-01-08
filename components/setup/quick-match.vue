<template>
  <div>
    <h1>How to Play</h1>
    <p>BattleBlox is a free turn based board game, the aim is to wipe out all opposing players and control the map.</p>
    <p>Each turn has an Attack, Roll and Spend phase, choose your moves carefully.</p>

    <button class="c-menu-button" @click="quickMatch()">
      <c-icon icon="play-circle" />
      Start Quick Match
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

    quickMatch () {
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
        tiles: [34, 44, 54, 64]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 3,
        tiles: [37, 47, 57, 67]
      })

      this.setupBlockedTiles(25)

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play?type=Quick Match' })
    }
  }
}
</script>
