<template>
  <nuxt-link to="/" class="c-largeLogo">
    <img src="/logo-square.png">
  </nuxt-link>
</template>

<style scoped lang="scss">
  .c-largeLogo {
    display: block;
    padding-top: 60px;
    padding-bottom: 40px;
    text-align: center;

    @media (max-width: 1024px) {
      padding-top: 40px;
    }

    @media (max-width: 450px) {
      padding-top: 40px;
    }

    img {
      width: 300px;
      max-width: 50vw;
      margin: 0 auto;

      @media (max-width: 1024px) {
        width: 200px;
      }
    }
  }
</style>
