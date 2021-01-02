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

export default {}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: black;
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
  font-size: 1.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(30, 30, 30, 0.8);
  }
}
</style>
