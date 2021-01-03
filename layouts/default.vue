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

body, h1, h2, h3, p, button, a {
  font-family: 'Alegreya Sans SC', sans-serif;
}

.page {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

svg {
  font-size: 3rem;
  color: white;
}

.u-flex-grow {
  flex-grow: 1;
}

.u-pointer {
  cursor: pointer;
}

.u-game-button {
  position: fixed;
  height: 50px;
  width: 50px;
  background: rgba(30, 30, 30, 0.5);
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background: rgba(30, 30, 30, 0.8);
  }
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
