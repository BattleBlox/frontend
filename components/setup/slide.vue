<template>
  <div class="c-slide">
    <slot />
  </div>
</template>

<style lang="scss">
  .c-slide {
    padding: 30px;

    h1, h2 {
      margin-bottom: 15px;
    }
    p {
      margin-bottom: 30px;
    }
  }

  .c-menu-button {
    display: block;
    color: white;
    border: 1px solid white;
    padding: 20px;
    font-size: 1rem;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    margin: 0 auto;
    transition: all 0.2s ease-in-out;

    svg {
      margin-right: 3px;
    }

    &:hover {
      text-decoration: underline;
      background: rgba(30, 30, 30, 0.6);
    }
  }
</style>
