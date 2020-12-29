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
      switch (this.tile.empire) {
        case null: return 'neutral-tile'
        case 'blocked': return 'blocked-tile'
        case this.currentPlayer: return 'owned-tile'
        default: return 'enemy-tile'
      }
    }
  }
}
</script>

<style lang="scss">
.u-tile {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
  text-align: center;
  border-radius: 10px;

  &.u-tile--selected {
    border: 5px solid gold;
  }

  &.c-tile--roll {
    border: 5px solid white;
  }
}

.u-tile-hitPoints {
  flex-grow: 1;
  user-select: none;
}
</style>
