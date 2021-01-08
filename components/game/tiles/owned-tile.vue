<template>
  <div
    :class="`u-tile u-pointer a-bounceIn c-owned-tile ${tileClass}`"
    @click="onClick">
    <span
      class="u-tile-hitPoints"
      v-text="tile.hitPoints" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { TURN_SET_ROLL_VALUE } from '@/store/mutations.constants'

export default {
  props: {
    tile: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('players', ['players']),
    ...mapState('turn', ['selectedTile', 'currentMode', 'rollValue']),

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.tile.empire)

      const tileSelectionState = (this.selectedTile && this.selectedTile.identifier === this.tile.identifier)
        ? 'selected'
        : 'unselected'

      let tileStrengthClass = this.tile.hitPoints > 1
        ? 'c-tile-strength--strong'
        : 'c-tile-strength--weak'

      if (this.tile.hitPoints >= 10) {
        tileStrengthClass = 'c-tile-strength--capital'
      }

      return `u-background--${controllingPlayer.colour} u-tile--${tileSelectionState} c-tile--${this.currentMode} ${tileStrengthClass}`
    }
  },

  methods: {
    ...mapMutations('turn', [
      TURN_SET_ROLL_VALUE
    ]),

    ...mapActions('turn', [
      'selectTile',
      'endTurn'
    ]),

    ...mapActions('tiles', [
      'controlTile'
    ]),

    onClick () {
      if (this.currentMode === 'roll') {
        this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

        this.controlTile({
          empire: this.tile.empire,
          hitPoints: this.tile.hitPoints + 1,
          tileIdentifier: this.tile.identifier
        })

        if (this.rollValue < 1) {
          this.endTurn()
        }
      }

      if (this.currentMode === 'attack') {
        this.selectTile(this.tile)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-owned-tile {
  &.c-tile-strength--weak {
    color: lightgray;
  }

  &.c-tile-strength--strong {
    color: white;
  }

  &.c-tile-strength--capital {
    color: white;
    font-weight: bold;
  }

  &.u-tile--selected {
    border: 5px solid gold;
  }

  &.c-tile--roll {
    border: 5px solid white;
  }

  span {
    flex-grow: 1;
    user-select: none;
  }
}
</style>
