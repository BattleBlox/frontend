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
import { PLAYERS_SET_PLAYERS } from '@/store/mutations.constants'

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
        hitPoints: 3,
        tiles: [1, 2, 11]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 3,
        tiles: [9, 10, 20]
      })

      this.controlTiles({
        empire: 'Player 3',
        hitPoints: 3,
        tiles: [81, 91, 92]
      })

      this.controlTiles({
        empire: 'Player 4',
        hitPoints: 3,
        tiles: [90, 99, 100]
      })

      this.setupBlockedTiles(18)

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play?type=Blitz' })
    }
  }
}
</script>
