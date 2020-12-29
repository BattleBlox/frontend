<template>
  <component
    :is="tileType"
    v-bind="tile" />
</template>

<script>
import { mapState } from 'vuex'
import OwnedTile from './tiles/owned-tile'
import EnemyTile from './tiles/enemy-tile'
import NeutralTile from './tiles/neutral-tile'
import BlockedTile from './tiles/blocked-tile'

export default {
  components: {
    OwnedTile,
    EnemyTile,
    NeutralTile,
    BlockedTile
  },

  props: {
    tile: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('turn', [
      'currentPlayer'
    ]),

    tileType () {
      if (this.tile.empire === null) {
        return 'neutral-tile'
      }

      if (this.tile.empire === 'blocked') {
        return 'blocked-tile'
      }

      // Render the current players tiles
      if (this.tile.empire === this.currentPlayer) {
        return 'owned-tile'
      }

      // Render the enemy players tiles
      if (this.tile.empire !== this.currentPlayer) {
        return 'enemy-tile'
      }

      return ''
    }
  }
}
</script>
