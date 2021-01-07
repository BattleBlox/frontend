<template>
  <div
    :class="`u-tile c-neutral-tile ${tileClass}`"
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
      'selectedTile',
      'rangedTiles'
    ]),

    isAttackable () {
      return (this.selectedTile && this.rangedTiles && this.rangedTiles.some(x => x === this.tile.identifier))
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
        empire: this.selectedPlayer.name,
        hitPoints: 1,
        tileIdentifier: this.selectedTile.identifier
      })

      this.selectTile({
        identifier: this.tile.identifier,
        empire: this.selectedPlayer.name,
        hitPoints: this.selectedTile.hitPoints - 1
      })
    }
  }
}
</script>

<style scoped lang="scss">
.c-neutral-tile {
  background-color: silver;
  opacity: 0.7;
}
</style>
