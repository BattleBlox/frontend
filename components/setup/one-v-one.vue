<template>
  <div>
    <h2>Split Screen Multiplayer</h2>
    <p>Take on a friend on the same device in a one versus one format.</p>
    <button class="c-menu-button" @click="start()">
      <c-icon icon="play-circle" />
      Start Split Screen
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
          isComputer: false,
          index: 2
        }]
      )

      this.controlTiles({
        empire: 'You',
        hitPoints: 3,
        tiles: [47, 61, 75, 89]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 3,
        tiles: [52, 66, 80, 94]
      })

      this.setupBlockedTiles(30)

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
