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

export default {
  components: {
    OwnedTile,
    EnemyTile,
    NeutralTile
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
      // Render a neutral tile
      if (!this.tile.empire) {
        return 'neutral-tile'
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
