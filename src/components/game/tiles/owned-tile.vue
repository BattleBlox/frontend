<template>
  <div
    :class="`c-owned-tile ${tileClass}`"
    @click="onClick">
    <span
      v-show="hitPoints"
      v-text="hitPoints" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { TURN_SET_ROLL_VALUE } from '@/store/mutations.constants'

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
    ...mapState('turn', ['currentPlayer', 'selectedTile', 'currentMode', 'rollValue']),

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.empire)

      const tileSelectionState = (this.selectedTile === this.identifier)
        ? 'selected'
        : 'unselected'

      return `c-tile--${controllingPlayer.colour} c-tile--${tileSelectionState}`
    }
  },

  methods: {
    ...mapMutations('turn', [TURN_SET_ROLL_VALUE]),
    ...mapActions('turn', ['selectTile', 'endTurn']),
    ...mapActions('tiles', ['controlTile']),

    onClick () {
      console.log(this.currentMode)
      if (this.currentMode === 'roll') {
        console.log(this.rollValue)

        this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

        this.controlTile({
          empire: this.empire,
          hitPoints: this.hitPoints + 1,
          tileIdentifier: this.identifier
        })

        if (this.rollValue < 1) {
          this.endTurn()
        }
      }

      if (this.currentMode === 'attack') {
        this.selectTile({
          selectedTile: this.identifier,
          empire: this.empire,
          hitPoints: this.hitPoints
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-owned-tile {
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

  &.c-tile--selected {
    border: 5px solid gold;
  }

  span {
    user-select: none;
  }
}
</style>
