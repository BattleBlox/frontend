<template>
  <div class="c-play">
    <compact-navigator />
    <h3 v-if="gameType" v-text="gameType" />
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
    ]),

    gameType () {
      return this.$route.query.type
    }
  },

  middleware: 'game-detector'
}
</script>

<style scoped lang="scss">
.c-play {
  width: 606px;
  margin: 20px auto;
  max-width: 100%;
  user-select: none;

  h3 {
    margin-left: 10px;
    margin-bottom: 5px;
  }
}
</style>
