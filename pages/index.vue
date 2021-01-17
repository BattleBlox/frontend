<template>
  <div class="c-menu">
    <large-logo />
    <game-carousel />

    <a href="https://github.com/BattleBlox" target="_blank"><c-icon icon="code-branch" /> Github</a>

    <span> | </span>

    <nuxt-link to="/privacy">
      <c-icon icon="code-branch" />
      Privacy Policy
    </nuxt-link>

    <google-play />
  </div>
</template>

<style scoped lang="scss">
  .c-menu {
    margin: 0 auto;
    text-align: center;
  }

  a {
    margin: 10px;
  }

  p {
    margin-bottom: 5px;
  }
</style>
