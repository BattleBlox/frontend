<template>
  <div>
    <background />
    <div class="page">
      <nuxt />
    </div>
  </div>
</template>

<script>
import '@/styles/animations.scss'
import '@/styles/colours.scss'
import '@/styles/utilities.scss'

export default {}
</script>

<style lang="scss">
html {
  font-family: 'Alegreya Sans SC', sans-serif;
  font-size: 18px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: black;
  color: white;
}

body, button {
  font-family: 'Alegreya Sans SC', sans-serif;
}

.page {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 850px;
  max-width: 95vw;
  margin: 0 auto;
  overflow: auto;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

p {
  svg {
    margin-right: 5px;
  }
}

a {
  color: white;
}
</style>
