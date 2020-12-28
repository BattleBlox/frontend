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
    ...mapState('turn', ['currentPlayer', 'selectedTile']),

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.empire)

      const tileColour = (controllingPlayer)
        ? controllingPlayer.colour
        : 'gray'

      const tileSelectionState = (this.selectedTile === this.identifier)
        ? 'selected'
        : 'unselected'

      return `c-tile--${tileColour} c-tile--${tileSelectionState}`
    },

    ownedTile () {
      return (this.empire && this.empire === this.currentPlayer)
    }
  },

  methods: {
    ...mapActions('turn', ['selectTile']),

    onClick () {
      if (this.ownedTile) {
        this.selectTile({
          selectedTile: this.identifier,
          empire: this.empire
        })
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

  &.c-tile--selected {
    border: 5px solid gold;
  }

  span {
    user-select: none;
  }
}
</style>
