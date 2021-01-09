<template>
  <div :class="`c-board ${additionalClasses}`">
    <computer-player />
    <tile v-for="tile in orderedTiles" :key="tile.identifier" :tile="tile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isMobile: false
    }
  },

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

      return `u-background--${this.selectedPlayer.colour} c-board--${this.currentMode} ${isBoardEnabled}`
    },

    orderedTiles () {
      // We rotate the board on mobile due to orientation differences

      if (!this.isMobile) {
        return this.tiles
      }

      const mapOrder = (array, order, key) => {
        array.sort(function (a, b) {
          const A = a[key]; const B = b[key]

          if (order.indexOf(A) > order.indexOf(B)) {
            return 1
          } else {
            return -1
          }
        })

        return array
      }

      const tiles = [
        ...this.tiles
      ]

      const sortingArray = [
        14, 28, 42, 56, 70, 84, 98, 112, 126, 140,
        13, 27, 41, 55, 69, 83, 97, 111, 125, 139,
        12, 26, 40, 54, 68, 82, 96, 110, 124, 138,
        11, 25, 39, 53, 67, 81, 95, 109, 123, 137,
        10, 24, 38, 52, 66, 80, 94, 108, 122, 136,
        9, 23, 37, 51, 65, 79, 93, 107, 121, 135,
        8, 22, 36, 50, 64, 78, 92, 106, 120, 134,
        7, 21, 35, 49, 63, 77, 91, 105, 119, 133,
        6, 20, 34, 48, 62, 76, 90, 104, 118, 132,
        5, 19, 33, 47, 61, 75, 89, 103, 117, 131,
        4, 18, 32, 46, 60, 74, 88, 102, 116, 130,
        3, 17, 31, 45, 59, 73, 87, 101, 115, 129,
        2, 16, 30, 44, 58, 72, 86, 100, 114, 128,
        1, 15, 29, 43, 57, 71, 85, 99, 113, 127
      ]

      const correctArray = mapOrder(tiles, sortingArray, 'identifier')

      return correctArray
    }
  },

  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize () {
      this.isMobile = window.innerWidth <= 768
    }
  }
}
</script>

<style scoped lang="scss">
.c-board {
  display: flex;
  flex-wrap: wrap;
  border: 3px solid black;
  width: 800px;
  border-radius: 10px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
  max-width: 95%;
  user-select: none;

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 0;
  }

  &.c-board--disabled {
    pointer-events: none;
  }

  &.c-board--roll {
    background-color: white;
  }
}
</style>
