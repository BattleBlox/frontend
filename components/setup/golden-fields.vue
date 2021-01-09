<template>
  <div>
    <h2>Play Golden Fields</h2>
    <p>Face up against the computer and fight for control of the golden field.</p>
    <p>The player who controls the field, will probably win the game.</p>

    <button class="c-menu-button" @click="start()">
      <c-icon icon="money-bill-alt" />
      Start Golden Fields
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

    start () {
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
        hitPoints: 4,
        tiles: [41, 42, 55, 56]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 4,
        tiles: [85, 86, 99, 100]
      })

      this.controlTiles({
        empire: 'blocked',
        hitPoints: 0,
        tiles: [
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
          45, 73, 87,
          54, 68, 96,
          71, 72, 69, 70
        ]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
