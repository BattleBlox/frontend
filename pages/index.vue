<template>
  <div class="c-menu">
    <img class="c-menu-logo" src="/logo-square.png">

    <div class="c-game">
      <h2>Quick Match</h2>
      <p>1v1 player versus computer. Try to conquer the map</p>
      <button class="c-menu-button" @click="quickMatch()">
        Start Quick Match
      </button>
    </div>

    <div class="c-game">
      <h2>Blitz Mode</h2>
      <p>You versus 3 computer players, duel to the death in a congested map</p>
      <button class="c-menu-button" @click="startBlitzGame()">
        Start Blitz Mode
      </button>
    </div>
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

    quickMatch () {
      this.setupBoard()
      this.setupBlockedTiles(25)

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

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    },

    startBlitzGame () {
      this.setupBoard()
      this.setupBlockedTiles(15)

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

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>

<style scoped lang="scss">
  .c-menu {
    color: white;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .c-menu-logo {
    margin: 30px;
    margin-bottom: 0;
    height: 300px;
  }

  .c-game {
    padding: 30px;

    p {
      margin-bottom: 10px;
    }
  }

  .c-menu-button {
    display: block;
    color: white;
    border: 1px solid white;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    margin: 0 auto;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
