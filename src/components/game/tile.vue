<template>
  <div
    :class="`c-tile ${tileClass}`"
    @click="selectTile({ selectedTile: identifier, empire })">
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
    ...mapState('turn', ['selectedTile']),

    tileClass () {
      const controllingPlayer = this.players.find(plr => plr.name === this.empire)

      const tileColour = (controllingPlayer)
        ? controllingPlayer.colour
        : 'gray'

      const tileSelectionState = (this.selectedTile === this.identifier)
        ? 'selected'
        : 'unselected'

      return `c-tile--${tileColour} c-tile--${tileSelectionState}`
    }
  },

  methods: {
    ...mapActions('turn', ['selectTile'])
  }
}
</script>

<style scoped lang="scss">
.c-tile {
  width: 60px;
  height: 60px;
  background-color: silver;
  border: 1px solid white;
  transition: all 0.2s ease-in-out;
  text-align: center;
  border-radius: 10px;

  &:hover {
    background-color: gray;
  }

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
