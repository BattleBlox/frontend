<template>
  <div class="c-game">
    <h2>Play Chokepoint</h2>
    <p>Play versus the computer in a tough game with only one path to the enemy.</p>
    <p>Control the chokepoint and you stand a good chance of winning the game!</p>
    <button class="c-menu-button" @click="startChokepoint()">
      <c-icon icon="brain" />
      Start Chokepoint
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { PLAYERS_SET_PLAYERS, SETTINGS_SET_COMPUTER_SPEED } from '@/store/mutations.constants'

export default {
  data () {
    return {
      startingPoints: 3,
      blockedTileCount: 25
    }
  },
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

    startChokepoint () {
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
        hitPoints: 2,
        tiles: [1, 2, 11, 81, 91, 92]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 2,
        tiles: [9, 10, 20, 90, 99, 100]
      })

      this.controlTiles({
        empire: 'blocked',
        hitPoints: 0,
        tiles: [5, 6, 15, 16, 24, 25, 26, 27, 34, 35, 36, 37, 44, 45, 46, 47, 64, 65, 66, 67, 74, 75, 76, 77, 85, 86, 95, 96]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play?type=Chokepoint' })
    }
  }
}
</script>
