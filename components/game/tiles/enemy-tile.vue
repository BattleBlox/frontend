<template>
  <div
    :class="`c-tile c-enemy-tile ${tileClass}`"
    @click="onClick">
    <span
      class="c-tile-hitPoints"
      v-text="tile.hitPoints" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { TURN_DESELECT_TILE } from '@/store/mutations.constants'

export default {
  props: {
    tile: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('players', [
      'players'
    ]),

    ...mapState('turn', [
      'selectedPlayer',
      'selectedTile'
    ]),

    isAttackable () {
      return (
        this.selectedTile &&
        this.selectedTile.hitPoints > 1 &&
        this.selectedTile.rangedTiles &&
        this.selectedTile.rangedTiles.some(x => x === this.tile.identifier))
    },

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.tile.empire)

      const tileColourClass = (controllingPlayer)
        ? `u-background--${controllingPlayer.colour}`
        : 'u-background--gray'

      const attackStateClass = this.isAttackable
        ? 'c-tile--attackable u-pointer'
        : ''

      return `${tileColourClass} ${attackStateClass}`
    },

    ownedTile () {
      return (this.tile.empire === this.selectedPlayer.name)
    }
  },

  methods: {
    ...mapMutations('turn', [
      TURN_DESELECT_TILE
    ]),

    ...mapActions('turn', [
      'selectTile'
    ]),

    ...mapActions('tiles', [
      'controlTile'
    ]),

    onClick () {
      if (this.isAttackable) {
        let attackerHitPoints = this.selectedTile.hitPoints
        let defenderHitPoints = this.tile.hitPoints

        while (attackerHitPoints > 1 && defenderHitPoints > 1) {
          const result = Math.floor(Math.random() * 10) + 1
          if (result <= 4) {
            attackerHitPoints--
          } else {
            defenderHitPoints--
          }
        }

        if (attackerHitPoints > defenderHitPoints) {
          this.controlTile({
            empire: this.selectedPlayer.name,
            hitPoints: attackerHitPoints - 1,
            tileIdentifier: this.tile.identifier
          })

          this.controlTile({
            empire: this.selectedPlayer.name,
            hitPoints: 1,
            tileIdentifier: this.selectedTile.identifier
          })

          this.selectTile({
            identifier: this.tile.identifier,
            empire: this.selectedPlayer.name,
            hitPoints: attackerHitPoints - 1,
            rangedTiles: this.tile.rangedTiles
          })
        } else {
          this.controlTile({
            empire: this.selectedPlayer.name,
            hitPoints: 1,
            tileIdentifier: this.selectedTile.identifier
          })

          this.controlTile({
            empire: this.tile.empire,
            hitPoints: defenderHitPoints,
            tileIdentifier: this.tile.identifier
          })

          this.TURN_DESELECT_TILE()
        }
      }
    }
  }
}
</script>
