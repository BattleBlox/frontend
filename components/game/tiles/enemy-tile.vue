<template>
  <div
    :class="`u-tile c-enemy-tile ${tileClass}`"
    @click="onClick">
    <span
      v-show="hitPoints"
      class="u-tile-hitPoints"
      v-text="hitPoints" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { TURN_DESELECT_TILE } from '@/store/mutations.constants'

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
    ...mapState('turn', ['selectedPlayer', 'selectedTile', 'rangedTiles']),

    isAttackable () {
      return (this.selectedTile && this.rangedTiles && this.rangedTiles.some(x => x === this.identifier))
    },

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.empire)

      const tileColour = (controllingPlayer)
        ? controllingPlayer.colour
        : 'gray'

      const tileSelectionState = (this.selectedTile && this.selectedTile.identifier === this.identifier)
        ? 'selected'
        : 'unselected'

      const attackState = this.isAttackable
        ? 'c-enemy-tile--attackable'
        : ''

      return `c-tile--${tileColour} c-tile--${tileSelectionState} ${attackState}`
    },

    ownedTile () {
      return (this.empire && this.empire === this.selectedPlayer.name)
    }
  },

  methods: {
    ...mapMutations('turn', [
      TURN_DESELECT_TILE
    ]),
    ...mapActions('turn', ['selectTile', 'endTurn']),
    ...mapActions('tiles', ['controlTile']),

    onClick () {
      if (this.isAttackable) {
        let attackerHitPoints = this.selectedTile.hitPoints
        let defenderHitPoints = this.hitPoints

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
            tileIdentifier: this.identifier
          })

          this.controlTile({
            empire: this.selectedPlayer.name,
            hitPoints: 1,
            tileIdentifier: this.selectedTile.identifier
          })

          this.selectTile({
            identifier: this.identifier,
            empire: this.selectedPlayer.name,
            hitPoints: attackerHitPoints - 1
          })
        } else {
          this.controlTile({
            empire: this.selectedPlayer.name,
            hitPoints: 1,
            tileIdentifier: this.selectedTile.identifier
          })

          this.controlTile({
            empire: this.empire,
            hitPoints: defenderHitPoints,
            tileIdentifier: this.identifier
          })

          this.TURN_DESELECT_TILE()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-enemy-tile {
  background-color: lime;
  border: 1px solid white;

  &.c-tile--red {
    background-color: red;
    color: white;
  }

  &.c-tile--blue {
    background-color: blue;
    color: white;
  }

  &.c-tile--purple {
    background-color: purple;
    color: white;
  }

  &.c-tile--brown {
    background-color: brown;
    color: white;
  }

  &.c-tile--pink {
    background-color: #D64F8B;
    color: white;
  }

  &.c-tile--green {
    background-color: green;
    color: white;
  }

  &.c-tile--yellow {
    background-color: #D8B100;
    color: white;
  }

  &.c-tile--skyblue {
    background-color: #3288D3;
    color: white;
  }

  &.c-tile--lightred {
    background-color: #FF7CB0;
    color: white;
  }

  &.c-tile--orange {
    background-color: #FF7459;
    color: white;
  }

  &.c-enemy-tile--attackable {
    background-color: orange;
  }
}
</style>
