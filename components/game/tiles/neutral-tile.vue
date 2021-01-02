<template>
  <div
    :class="`u-tile c-neutral-tile ${tileClass}`"
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
    ...mapState('turn', ['selectedPlayer', 'selectedTile', 'rangedTiles']),

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

      if (!this.selectedTile.hitPoints || this.selectedTile.hitPoints < 2) {
        return
      }

      // Conquer Neutral Tile
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: this.selectedTile.hitPoints - 1,
        tileIdentifier: this.identifier
      })

      // Reflect impact on selected tile
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: 1,
        tileIdentifier: this.selectedTile.identifier
      })

      this.selectTile({
        identifier: this.identifier,
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
  border: 1px solid white;
  opacity: 0.75;

  &.c-neutral-tile--attackable {
    background-color: orange;
    border-color: orange;
  }
}
</style>
