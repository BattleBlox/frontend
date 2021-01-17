<template>
  <div
    class="c-surrenderButton u-pointer"
    title="Surrender Game"
    @click="$router.push({ path: '/' })">
    <c-icon
      icon="flag"
      class="u-flex-grow" />
  </div>
</template>

<style scoped lang="scss">
.c-surrenderButton {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 45px;
  width: 45px;
  background: rgba(30, 30, 30, 0.5);
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background: rgba(30, 30, 30, 0.9);
  }
}
</style>
