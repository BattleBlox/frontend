<template>
  <div class="c-menu">
    <img class="c-menu-logo" src="/logo-square.png">

    <div class="c-game">
      <h2>Quick Match</h2>
      <p>1v1 player versus computer. Try to conquer the map</p>
      <button class="c-menu-button" @click="quickMatch()">
        <c-icon icon="play-circle" />
        Start Quick Match
      </button>
    </div>

    <div class="c-game">
      <h2>1 versus 1</h2>
      <p>Try taking on a friend, only human players</p>
      <button class="c-menu-button" @click="quickMatch(false)">
        <c-icon icon="play-circle" />
        Start Human 1v1
      </button>
    </div>

    <div class="c-game">
      <h2>Blitz Mode</h2>
      <p>You versus 3 computer players, duel to the death in a congested map</p>
      <button class="c-menu-button" @click="startBlitzGame()">
        <c-icon icon="fist-raised" />
        Start Blitz Mode
      </button>
    </div>

    <div class="c-game">
      <h2>AI Spectacle</h2>
      <p>Watch 10 computers fight to the death. No human players</p>
      <button class="c-menu-button" @click="startSpectacle()">
        <c-icon icon="brain" />
        Start Spectacle
      </button>
    </div>

    <div class="c-game">
      <h2>Chokepoint</h2>
      <p>Human versus computer, with small chokepoints</p>
      <button class="c-menu-button" @click="startChokepoint()">
        <c-icon icon="brain" />
        Start Chokepoint
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

    quickMatch (isPlayer2Computer = true) {
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
          isComputer: isPlayer2Computer,
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

    startChokepoint () {
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
    },

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

<style scoped lang="scss">
  .c-menu {
    color: white;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .c-menu-logo {
    margin: 80px;
    margin-bottom: 40px;
    height: 150px;
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

    svg {
      margin-right: 3px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
