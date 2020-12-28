<template>
  <div
    :class="`c-neutral-tile ${tileClass}`"
    @click="onClick" />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    identifier: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState('turn', ['currentPlayer', 'selectedTile', 'rangedTiles', 'selectedTileHitPoints']),

    isAttackable () {
      return (this.selectedTile && this.rangedTiles && this.rangedTiles.some(x => x === this.identifier))
    },

    tileClass () {
      return this.isAttackable
        ? 'c-neutral-tile--attackable'
        : ''
    }
  },

  methods: {
    ...mapActions('tiles', [
      'controlTile'
    ]),

    ...mapActions('turn', [
      'endTurn',
      'selectTile'
    ]),

    onClick () {
      if (!this.isAttackable) {
        return
      }

      if (!this.selectedTileHitPoints || this.selectedTileHitPoints < 2) {
        return
      }

      // Conquer Neutral Tile
      this.controlTile({
        empire: this.currentPlayer,
        hitPoints: this.selectedTileHitPoints - 1,
        tileIdentifier: this.identifier
      })

      // Reflect impact on selected tile
      this.controlTile({
        empire: this.currentPlayer,
        hitPoints: 1,
        tileIdentifier: this.selectedTile
      })

      this.selectTile({
        selectedTile: this.selectedTile,
        empire: this.currentPlayer,
        hitPoints: 1
      })
    }
  }
}
</script>

<style scoped lang="scss">
.c-neutral-tile {
  width: 60px;
  height: 60px;
  background-color: silver;
  border: 1px solid white;
  text-align: center;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;

  &.c-neutral-tile--attackable {
    background-color: orange;
    border-color: orange;
  }
}
</style>
