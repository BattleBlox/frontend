<template>
  <div
    :class="`u-tile c-owned-tile ${tileClass}`"
    @click="onClick">
    <span
      v-show="hitPoints"
      class="u-tile-hitPoints"
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
    ...mapState('turn', ['selectedTile', 'currentMode', 'rollValue']),

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.empire)

      const tileSelectionState = (this.selectedTile && this.selectedTile.identifier === this.identifier)
        ? 'selected'
        : 'unselected'

      let tileStrengthClass = this.hitPoints > 1
        ? 'c-tile-strength--strong'
        : 'c-tile-strength--weak'

      if (this.hitPoints >= 10) {
        tileStrengthClass = 'c-tile-strength--capital'
      }

      return `c-tile--${controllingPlayer.colour} u-tile--${tileSelectionState} c-tile--${this.currentMode} ${tileStrengthClass}`
    }
  },

  methods: {
    ...mapMutations('turn', [TURN_SET_ROLL_VALUE]),
    ...mapActions('turn', ['selectTile', 'endTurn']),
    ...mapActions('tiles', ['controlTile']),

    onClick () {
      if (this.currentMode === 'roll') {
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
          identifier: this.identifier,
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
  background-color: lime;
  border: 1px solid white;
  cursor: pointer;

  &.c-tile--red {
    background-color: red;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

  &.c-tile--blue {
    background-color: blue;
    color: white;

    &.c-tile-strength--weak {
      color: #7F7FFF;
    }

    &.c-tile-strength--strong {
      color: white;
    }

    &.c-tile-strength--capital {
      color: white;
      font-weight: bold;
    }
  }

    &.c-tile--purple {
    background-color: purple;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

    &.c-tile--brown {
    background-color: brown;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

    &.c-tile--pink {
    background-color: #D64F8B;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

      &.c-tile--green {
    background-color: green;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

      &.c-tile--yellow {
    background-color: #D8B100;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

      &.c-tile--skyblue {
    background-color: #3288D3;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

      &.c-tile--lightred {
    background-color: #FF7CB0;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

      &.c-tile--orange {
    background-color: #FF7459;
    color: white;

      &.c-tile-strength--weak {
        color: #FF7F7F;
      }

      &.c-tile-strength--strong {
        color: white;
      }

      &.c-tile-strength--capital {
        color: white;
        font-weight: bold;
      }
  }

  &.u-tile--selected {
    border: 5px solid gold;
  }

  span {
    flex-grow: 1;
    user-select: none;
  }

  &.c-tile--roll {
    border: 5px solid white;
  }
}
</style>
