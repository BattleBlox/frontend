<template>
  <div>
    <h2>Play Blitz</h2>
    <p>Blitz is a high speed game mode where you face up against 3 computer players in a congested map.</p>
    <p>Use bonuses to survive, the last one alive wins.</p>
    <button class="c-menu-button" @click="startBlitzGame()">
      <c-icon icon="fist-raised" />
      Start Blitz
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

    startBlitzGame () {
      this.setupBoard()

      this.SETTINGS_SET_COMPUTER_SPEED(500)

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

      this.controlTiles({
        empire: 'You',
        hitPoints: 5,
        tiles: [1, 2, 15]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 5,
        tiles: [13, 14, 28]
      })

      this.controlTiles({
        empire: 'Player 3',
        hitPoints: 5,
        tiles: [113, 127, 128]
      })

      this.controlTiles({
        empire: 'Player 4',
        hitPoints: 5,
        tiles: [126, 139, 140]
      })

      this.setupBlockedTiles(25)

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
