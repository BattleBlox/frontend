<template>
  <div>
    <h1>How to Play</h1>
    <p>BattleBlox is a free turn based board game, the aim is to wipe out all opposing players and control the map.</p>
    <p>Each turn has an Attack, Roll and Spend phase, choose your moves carefully.</p>

    <button class="c-menu-button" @click="start()">
      <c-icon icon="play-circle" />
      Start Quick Match
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
        hitPoints: 5,
        tiles: [47, 61, 75, 89]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 5,
        tiles: [52, 66, 80, 94]
      })

      this.setupBlockedTiles(30)

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
