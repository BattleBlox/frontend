<template>
  <div class="c-menu">
    <img class="c-menu-logo" src="/logo-square.png">
    <game-carousel />

    <p><c-icon icon="code" />Built by <a href="https://www.tommcclean.me" target="_blank">Thomas William McClean</a></p>
    <p><c-icon icon="code-branch" />Open source on <a href="https://github.com/BattleBlox" target="_blank">Github</a></p>
  </div>
</template>

<style scoped lang="scss">
  .c-menu {
    color: white;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .c-menu-logo {
    margin: 80px;
    margin-bottom: 40px;
    height: 150px;
  }

  .c-game {
    padding: 30px;

    p {
      margin-bottom: 10px;
    }
  }

  .c-menu-button {
    display: block;
    color: white;
    border: 1px solid white;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    margin: 0 auto;

    svg {
      margin-right: 3px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
