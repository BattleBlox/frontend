<template>
  <div class="c-largeLogo">
    <img src="/logo-square.png">
  </div>
</template>

<style scoped lang="scss">
  .c-largeLogo {
    padding-top: 80px;
    padding-bottom: 40px;
    text-align: center;
    width: 100%;

    @media (max-width: 450px) {
      padding-top: 50px;
    }
  }

  .c-largeLogo img {
    width: 300px;
    max-width: 50vw;
    margin: 0 auto;
  }
</style>
