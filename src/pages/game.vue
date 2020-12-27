<template>
  <div class="c-game">
    <board />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.setupTiles()
  },

  methods: {
    ...mapActions('tiles', [
      'setupTiles'
    ])
  }
}
</script>

<style scoped>
</style>
