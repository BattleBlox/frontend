<template functional>
  <div class="c-compactLogo">
    <nuxt-link to="/">
      <img src="/logo.png">
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss">
.c-compactLogo {
  padding: 20px;
  text-align:center;

  img {
    width: 200px;
  }

  @media (max-width: 1024px) {
      padding: 5px;
      height: 42px;
      margin-bottom: 5px;

      img {
        width: 150px;
      }
  }
}
</style>
