<template>
  <div
    :class="`c-tile c-neutral-tile ${tileClass}`"
    @click="onClick" />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    tile: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('turn', [
      'selectedPlayer',
      'selectedTile'
    ]),

    isAttackable () {
      return (
        this.selectedTile &&
        this.selectedTile.hitPoints > 1 &&
        this.selectedTile.rangedTiles &&
        this.selectedTile.rangedTiles.some(x => x === this.tile.identifier)
      )
    },

    tileClass () {
      return this.isAttackable
        ? 'c-tile--attackable u-pointer'
        : ''
    }
  },

  methods: {
    ...mapActions('tiles', [
      'controlTile'
    ]),

    ...mapActions('turn', [
      'selectTile'
    ]),

    onClick () {
      if (!this.isAttackable) {
        return
      }

      // Conquer Neutral Tile
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: this.selectedTile.hitPoints - 1,
        tileIdentifier: this.tile.identifier
      })

      // Reflect impact on selected tile
      this.controlTile({
        hitPoints: 1,
        tileIdentifier: this.selectedTile.identifier
      })

      this.selectTile({
        identifier: this.tile.identifier,
        empire: this.selectedPlayer.name,
        hitPoints: this.selectedTile.hitPoints - 1,
        rangedTiles: this.tile.rangedTiles
      })
    }
  }
}
</script>

<style scoped lang="scss">
.c-neutral-tile {
  background-color: #A0A0A0;
  opacity: 0.6;
}
</style>
