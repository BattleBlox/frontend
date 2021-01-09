<template>
  <div class="c-game">
    <h2>Play Chokepoint</h2>
    <p>Play versus the computer in a tough game with only one path to the enemy.</p>
    <p>Control the chokepoint and you stand a good chance of winning the game!</p>
    <button class="c-menu-button" @click="start()">
      <c-icon icon="exchange-alt" />
      Start Chokepoint
    </button>
  </div>
</template>

<script>
import gameTypeMixin from './game-type.mixin'

export default {
  mixins: [gameTypeMixin],

  methods: {
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
        hitPoints: 3,
        tiles: [30, 31, 32, 39, 40, 41]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 3,
        tiles: [100, 101, 102, 109, 110, 111]
      })

      this.controlTiles({
        empire: 'blocked',
        hitPoints: 0,
        tiles: [
          57, 58, 59, 60, 61, 62, 65, 66, 67, 68, 69, 70,
          71, 72, 73, 74, 75, 76, 79, 80, 81, 82, 83, 84,
          48, 51, 90, 93, 34, 37, 104, 107
        ]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
