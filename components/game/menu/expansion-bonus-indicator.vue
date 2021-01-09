<template>
  <div
    class="u-badge-outer"
    title="Bonus Points (x1 point for every 4 tiles you control)">
    <div class="u-badge">
      <c-icon
        icon="th-large"
        class="fa-fw" />

      <span
        v-text="playerTilesBonus" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('tiles', [
      'tiles'
    ]),

    ...mapState('turn', [
      'selectedPlayer'
    ]),

    playerTilesBonus () {
      const totalPlayerTiles = this.tiles.filter(x => x.empire === this.selectedPlayer.name).length

      return Math.floor(totalPlayerTiles / 4)
    }
  }

}
</script>
