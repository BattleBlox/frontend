<template>
  <div class="c-menu">
    <large-logo />
    <game-carousel />

    <p>
      <c-icon icon="code" />Built by <a href="https://www.tommcclean.me" target="_blank">Thomas William McClean</a>
    </p>

    <a href="https://github.com/BattleBlox" target="_blank"><c-icon icon="code-branch" /> Open Source on Github</a>

    <span> | </span>

    <nuxt-link to="/privacy">
      <c-icon icon="code-branch" />
      Privacy Policy
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss">
  .c-menu {
    margin: 0 auto;
    text-align: center;
  }

  p {
    margin-bottom: 10px;
  }
</style>
