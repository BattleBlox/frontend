<template>
  <div class="c-game">
    <board />

    <p>Current Player: {{ currentPlayer }} </p>
    <p>Current Mode: {{ currentMode }} </p>

    <button
      @click="selectMode('attack')">
      Attack
    </button>
    <button
      @click="selectMode('reinforce')">
      Reinforce
    </button>
    <button
      @click="selectMode('roll')">
      Roll
    </button>
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

    this.controlTiles({
      empire: 'Player 1',
      hitPoints: 5,
      tiles: [1, 2, 11]
    })

    this.controlTiles({
      empire: 'Player 2',
      hitPoints: 5,
      tiles: [100, 90, 99]
    })

    this.selectPlayer('Player 1')
    this.selectMode('attack')
  },

  methods: {
    ...mapActions('tiles', [
      'setupTiles',
      'controlTiles'
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
