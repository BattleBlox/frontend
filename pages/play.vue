<template>
  <div class="c-play">
    <compact-navigator />
    <h3 v-if="gameType" v-text="gameType" />
    <div v-if="players.length > 0" class="c-game">
      <board />

      <turn-menu />
      <bonus-button />
      <surrender-button />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      gameType: null
    }
  },

  computed: mapState('players', [
    'players'
  ]),

  mounted () {
    if (this.players.length === 0) {
      this.$router.push({ path: '/' })
    }

    this.gameType = this.$route.query.type
  }
}
</script>

<style scoped lang="scss">
.c-play {
  width: 606px;
  margin: 20px auto;
  max-width: 100%;

  h3 {
    margin-left: 10px;
    margin-bottom: 5px;
  }
}
</style>
