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

      const tileSelectionState = (this.selectedTile === this.identifier)
        ? 'selected'
        : 'unselected'

      return `c-tile--${controllingPlayer.colour} c-tile--${tileSelectionState}`
    }
  },

  methods: {
    ...mapActions('turn', ['selectTile']),

    onClick () {
      this.selectTile({
        selectedTile: this.identifier,
        empire: this.empire,
        hitPoints: this.hitPoints
      })
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
