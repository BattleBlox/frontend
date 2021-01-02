<template>
  <div>
    <h2>Artificial Intelligence</h2>
    <p>Watch 10 computers fight to the death. No human players are harmed in this game mode.</p>
    <button class="c-menu-button" @click="startSpectacle()">
      <c-icon icon="brain" />
      Watch Game
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

    startSpectacle () {
      this.setupBoard()
      this.setupBlockedTiles(10)

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
        },
        {
          name: 'Player 5',
          colour: 'yellow',
          isComputer: true,
          index: 5
        },
        {
          name: 'Player 6',
          colour: 'green',
          isComputer: true,
          index: 6
        },
        {
          name: 'Player 7',
          colour: 'pink',
          isComputer: true,
          index: 7
        },
        {
          name: 'Player 8',
          colour: 'skyblue',
          isComputer: true,
          index: 8
        },
        {
          name: 'Player 9',
          colour: 'lightred',
          isComputer: true,
          index: 9
        },
        {
          name: 'Player 10',
          colour: 'orange',
          isComputer: true,
          index: 10
        }]
      )

      this.controlTiles({
        empire: 'Player 1',
        hitPoints: 1,
        tiles: [1]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 1,
        tiles: [3]
      })

      this.controlTiles({
        empire: 'Player 3',
        hitPoints: 1,
        tiles: [5]
      })

      this.controlTiles({
        empire: 'Player 4',
        hitPoints: 1,
        tiles: [7]
      })

      this.controlTiles({
        empire: 'Player 5',
        hitPoints: 1,
        tiles: [9]
      })

      this.controlTiles({
        empire: 'Player 6',
        hitPoints: 1,
        tiles: [92]
      })

      this.controlTiles({
        empire: 'Player 7',
        hitPoints: 1,
        tiles: [94]
      })

      this.controlTiles({
        empire: 'Player 8',
        hitPoints: 1,
        tiles: [96]
      })

      this.controlTiles({
        empire: 'Player 9',
        hitPoints: 1,
        tiles: [98]
      })

      this.controlTiles({
        empire: 'Player 10',
        hitPoints: 1,
        tiles: [100]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
