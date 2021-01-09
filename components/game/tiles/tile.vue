<template>
  <component
    :is="tileType"
    :tile="tile" />
</template>

<script>
import { mapState } from 'vuex'
import OwnedTile from './owned-tile'
import EnemyTile from './enemy-tile'
import NeutralTile from './neutral-tile'
import BlockedTile from './blocked-tile'

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
      'selectedPlayer'
    ]),

    tileType () {
      switch (this.tile.empire) {
        case null: return 'neutral-tile'
        case 'blocked': return 'blocked-tile'
        case this.selectedPlayer.name: return 'owned-tile'
        default: return 'enemy-tile'
      }
    }
  }
}
</script>

<style lang="scss">
.c-tile {
  width: 56.5px;
  height: 56.5px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
  text-align: center;
  border-radius: 10px;
  border: 1px solid white;
  cursor: not-allowed;
  font-size: 1rem;

  @media (max-width: 768px) {
    width: calc(100% / 10);
    height: calc((95vw / 10));
    font-size: 1.25rem;
  }

  &.c-tile--selected {
    border: 5px solid gold;
  }

  &.c-tile--roll {
    border: 5px solid white;
  }

  &.c-tile--attackable {
    background-color: orange;
    border: 1px solid orange;
  }
}

.c-tile-hitPoints {
  flex-grow: 1;
  user-select: none;
}
</style>
