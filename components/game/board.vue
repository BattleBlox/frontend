<template>
  <div :class="`c-board ${additionalClasses}`">
    <tile v-for="tile in tiles" :key="tile.identifier" :tile="tile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('turn', [
      'selectedPlayer',
      'currentMode',
      'gameOver'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    additionalClasses () {
      const isBoardEnabled = this.selectedPlayer.isComputer || this.gameOver
        ? 'c-board--disabled'
        : ''

      return `c-board--${this.selectedPlayer.colour} c-board--${this.currentMode} ${isBoardEnabled}`
    }
  }
}
</script>

<style scoped lang="scss">
.c-board {
  display: flex;
  flex-wrap: wrap;
  border: 3px solid black;
  background-color: black;
  width: 606px;
  border-radius: 10px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
  max-width: 100%;

  &.c-board--disabled {
    pointer-events: none;
  }

  &.c-board--red {
    &.c-board--attack {
      background-color: red;
    }
  }

  &.c-board--blue {
    &.c-board--attack {
      background-color: blue;
    }
  }

    &.c-board--purple {
    &.c-board--attack {
      background-color: purple;
    }
  }

    &.c-board--brown {
    &.c-board--attack {
      background-color: brown;
    }
  }

    &.c-board--yellow {
    &.c-board--attack {
      background-color: #D8B100;
    }
  }

  &.c-board--pink {
    &.c-board--attack {
      background-color: #D64F8B;
    }
  }

  &.c-board--green {
    &.c-board--attack {
      background-color: green;
    }
  }

    &.c-board--skyblue {
    &.c-board--attack {
      background-color: #3288D3;
    }
  }

    &.c-board--lightred {
    &.c-board--attack {
      background-color: lightcoral;
    }
  }

    &.c-board--orange {
    &.c-board--attack {
      background-color: orange;
    }
  }

  &.c-board--roll {
    background-color: white;
  }
}
</style>
