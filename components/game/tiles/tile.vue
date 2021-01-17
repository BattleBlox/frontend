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
  width: calc(795px / 14);
  height: calc(795px / 14);
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
  text-align: center;
  border-radius: 10px;
  border: 2px solid rgba(white, .5);
  cursor: not-allowed;

  @media (max-width: 1024px) {
    width: 54px;
    height: 54px;
  }

  @media (max-width: 850px) {
    width: calc(542px / 10);
    height: calc(542px / 10);
    border-radius: 7.5px;
    border: 1.5px solid rgba(white, .5);
  }

  @media (max-width: 612px) {
    width: calc(93.3vw / 10);
    height: calc(93.3vw / 10);
    border-radius: 7.5px;
    border: 1.5px solid rgba(white, .5);
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
