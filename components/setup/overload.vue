<template>
  <div>
    <h2>Play Overload</h2>
    <p>Overload is an almost impossible challenge, can you win after starting with a great disadvantage?</p>
    <p>Choose your strategy wisely; any mistep can cost you the game.</p>

    <button class="c-menu-button" @click="start()">
      <c-icon icon="radiation-alt" />
      Start Overload
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
        tiles: [46, 60, 74, 88]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 10,
        tiles: [53, 67, 81, 95]
      })

      this.setupBlockedTiles(15)

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
