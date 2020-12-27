<template>
  <div class="c-game">
    <board />

    <p>Current Player: {{ currentPlayer }} </p>
    <p>Current Mode: {{ currentMode }} </p>

    <button @click="selectMode('attack')">Attack</button>
    <button @click="selectMode('reinforce')">Reinforce</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('turn', [
      'currentPlayer',
      'currentMode'
    ])
  },

  created () {
    this.setupTiles()

    this.controlTile({
      tileIdentifier: 1,
      empire: 'Player 1',
      hitPoints: 5
    })

    this.controlTile({
      tileIdentifier: 2,
      empire: 'Player 1',
      hitPoints: 5
    })

    this.controlTile({
      tileIdentifier: 11,
      empire: 'Player 1',
      hitPoints: 5
    })

    this.controlTile({
      tileIdentifier: 100,
      empire: 'Player 2',
      hitPoints: 5
    })

    this.controlTile({
      tileIdentifier: 90,
      empire: 'Player 2',
      hitPoints: 5
    })

    this.controlTile({
      tileIdentifier: 99,
      empire: 'Player 2',
      hitPoints: 5
    })

    this.selectPlayer('Player 1')
  },

  methods: {
    ...mapActions('tiles', [
      'setupTiles',
      'controlTile'
    ]),

    ...mapActions('turn', [
      'selectPlayer',
      'selectMode'
    ])
  }
}
</script>

<style scoped>
</style>
