<template>
  <div class="u-badge-outer" title="Bonus Points (x2 Points for every tile with 10 points or more)">
    <div class="u-badge">
      <c-icon icon="city" class="fa-fw" />
      <span v-text="bonusCapitalPoints" />
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

    totalCapitalTiles () {
      return this.tiles.filter(x => x.empire === this.selectedPlayer.name && x.hitPoints >= 10).length
    },

    bonusCapitalPoints () {
      return Math.floor(this.totalCapitalTiles * 2)
    }
  }

}
</script>
