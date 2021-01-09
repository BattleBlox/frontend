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
import { PLAYERS_SET_PLAYERS, SETTINGS_SET_COMPUTER_SPEED } from '@/store/mutations.constants'

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

    ...mapMutations('settings', [
      SETTINGS_SET_COMPUTER_SPEED
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

      this.SETTINGS_SET_COMPUTER_SPEED(1500)

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
        hitPoints: 5,
        tiles: [46, 60, 74, 88]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 5,
        tiles: [53, 67, 81, 95]
      })

      this.setupBlockedTiles(30)

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
