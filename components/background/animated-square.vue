<template>
  <div
    v-show="isLoaded"
    :style="styleOverrides"
    class="c-square" />
</template>

<script>
import randomiser from '@/services/randomiser.js'

export default {
  data () {
    return {
      isLoaded: false,
      size: 0,
      startTop: 0,
      startLeft: 0,
      speed: 0,
      animationVariant: 0
    }
  },

  computed: {
    styleOverrides () {
      const size = `width: ${this.size}px; height: ${this.size}px;`
      const position = `top: ${this.startTop}%; left: ${this.startLeft}%;`
      const animation = `animation-duration: ${this.speed}s;animation-name: a-translocate_${this.animationVariant};`

      return `${size}${position}${animation}`
    }
  },

  mounted () {
    this.setup()
  },

  methods: {
    setup () {
      this.size = randomiser.generateRandomNumber(30, 100)
      this.startTop = randomiser.generateRandomNumber(-25, 125)
      this.startLeft = randomiser.generateRandomNumber(-25, 125)
      this.speed = randomiser.generateRandomNumber(10, 70)

      const animationVariant = randomiser.generateRandomNumber(0, 40)
      if (animationVariant <= 10) {
        this.animationVariant = 1
      } else if (animationVariant <= 20) {
        this.animationVariant = 2
      } else if (animationVariant <= 30) {
        this.animationVariant = 3
      } else {
        this.animationVariant = 4
      }

      this.isLoaded = true
    }
  }
}
</script>

<style scoped>
  .c-square {
    position: fixed;
    border-radius: 10px;
    animation-name: a-translocate_1;
    animation-duration: 120s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
</style>
