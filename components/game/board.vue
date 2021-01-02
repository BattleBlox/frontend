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
      'currentMode'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    additionalClasses () {
      const isBoardEnabled = this.selectedPlayer.isComputer
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
  margin: 20px auto;
  transition: all 0.3s ease-in-out;
  max-width: 100%;

  &.c-board--disabled {
    pointer-events: none;
  }

  &.c-board--red {
    border: 3px solid red;

    &.c-board--attack {
      background-color: red;
    }
  }

  &.c-board--blue {
    border: 3px solid blue;

    &.c-board--attack {
      background-color: blue;
    }
  }

    &.c-board--purple {
    border: 3px solid purple;

    &.c-board--attack {
      background-color: purple;
    }
  }

    &.c-board--brown {
    border: 3px solid brown;

    &.c-board--attack {
      background-color: brown;
    }
  }

    &.c-board--yellow {
    border: 3px solid #D8B100;

    &.c-board--attack {
      background-color: #D8B100;
    }
  }

  &.c-board--pink {
    border: 3px solid #D64F8B;

    &.c-board--attack {
      background-color: #D64F8B;
    }
  }

  &.c-board--green {
    border: 3px solid green;

    &.c-board--attack {
      background-color: green;
    }
  }

    &.c-board--skyblue {
    border: 3px solid #3288D3;

    &.c-board--attack {
      background-color: #3288D3;
    }
  }

    &.c-board--lightred {
    border: 3px solid lightcoral;

    &.c-board--attack {
      background-color: lightcoral;
    }
  }

    &.c-board--orange {
    border: 3px solid orange;

    &.c-board--attack {
      background-color: orange;
    }
  }

    &.c-board--red {
    border: 3px solid red;

    &.c-board--attack {
      background-color: red;
    }
  }

  &.c-board--roll {
    background-color: white;
  }
}
</style>
