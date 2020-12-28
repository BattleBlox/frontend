<template>
  <div
    :class="`c-enemy-tile ${tileClass}`"
    @click="onClick">
    <span
      v-show="hitPoints"
      v-text="hitPoints" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    identifier: {
      type: Number,
      required: true
    },

    empire: {
      type: String,
      default: null
    },

    hitPoints: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState('players', ['players']),
    ...mapState('turn', ['currentPlayer', 'selectedTile', 'rangedTiles', 'selectedTileHitPoints']),

    isAttackable () {
      return (this.selectedTile && this.rangedTiles && this.rangedTiles.some(x => x === this.identifier))
    },

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.empire)

      const tileColour = (controllingPlayer)
        ? controllingPlayer.colour
        : 'gray'

      const tileSelectionState = (this.selectedTile === this.identifier)
        ? 'selected'
        : 'unselected'

      const attackState = this.isAttackable
        ? 'c-enemy-tile--attackable'
        : ''

      return `c-tile--${tileColour} c-tile--${tileSelectionState} ${attackState}`
    },

    ownedTile () {
      return (this.empire && this.empire === this.currentPlayer)
    }
  },

  methods: {
    ...mapActions('turn', ['selectTile', 'endTurn']),
    ...mapActions('tiles', ['controlTile']),

    onClick () {
      if (this.isAttackable) {
        let attackerHitPoints = this.selectedTileHitPoints
        let defenderHitPoints = this.hitPoints

        while (attackerHitPoints > 1 && defenderHitPoints > 1) {
          attackerHitPoints--
          defenderHitPoints--
        }

        if (attackerHitPoints > defenderHitPoints) {
          this.controlTile({
            empire: this.currentPlayer,
            hitPoints: attackerHitPoints - 1,
            tileIdentifier: this.identifier
          })

          this.controlTile({
            empire: this.currentPlayer,
            hitPoints: 1,
            tileIdentifier: this.selectedTile
          })
        } else {
          this.controlTile({
            empire: this.currentPlayer,
            hitPoints: 1,
            tileIdentifier: this.selectedTile
          })

          this.controlTile({
            empire: this.empire,
            hitPoints: defenderHitPoints,
            tileIdentifier: this.identifier
          })
        }

        this.endTurn()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-enemy-tile {
  width: 60px;
  height: 60px;
  background-color: lime;
  border: 1px solid white;
  transition: all 0.2s ease-in-out;
  text-align: center;
  border-radius: 10px;

  &.c-tile--red {
    background-color: red;
    color: white;
  }

  &.c-tile--blue {
    background-color: blue;
    color: white;
  }

  &.c-enemy-tile--attackable {
    background-color: orange;
  }

  &.c-tile--selected {
    border: 5px solid gold;
  }

  span {
    user-select: none;
  }
}
</style>
