<template>
  <div>
    <compact-navigator />
    <div v-if="players.length > 0" class="c-game">
      <board />

      <turn-menu />
      <bonus-button />
      <settings-button />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('players', [
    'players'
  ]),

  mounted () {
    if (this.players.length === 0) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
