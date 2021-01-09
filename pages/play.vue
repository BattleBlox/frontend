<template>
  <div class="c-play">
    <compact-navigator />
    <div v-if="players.length > 0" class="c-game">
      <board />

      <turn-menu />
      <surrender-button />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('players', [
      'players'
    ])
  },

  middleware: 'game-detector'
}
</script>

<style scoped lang="scss">
.c-play {
  margin: 20px auto;
  user-select: none;
}
</style>
