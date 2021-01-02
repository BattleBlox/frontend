<template>
  <div class="c-slide">
    <slot />
  </div>
</template>

<style lang="scss">
  .c-slide {
    padding: 30px;

    h1, h2 {
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 20px;
    }
  }

  .c-menu-button {
    display: block;
    color: white;
    border: 1px solid white;
    padding: 15px;
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
