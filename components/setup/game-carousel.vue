<template>
  <div class="c-gameCarousel">
    <div class="c-gameCarousel-arrow c-gameCarousel--left" @click="slide--">
      <c-icon icon="chevron-left" />
    </div>

    <div class="c-gameCarousel-inner">
      <slide v-show="slide === 1">
        <quick-match />
      </slide>
      <slide v-show="slide === 2">
        <one-v-one />
      </slide>
      <slide v-show="slide === 3">
        <blitz />
      </slide>
      <slide v-show="slide === 4">
        <spectacle />
      </slide>
      <slide v-show="slide === 5">
        <chokepoint />
      </slide>
    </div>

    <div class="c-gameCarousel-arrow c-gameCarousel--right" @click="slide++">
      <c-icon icon="chevron-right" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 1
    }
  },
  watch: {
    slide () {
      if (this.slide < 1) {
        this.slide = 5
      }

      if (this.slide > 5) {
        this.slide = 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-gameCarousel {
  width: 600px;
  max-width: 95%;
  margin: 0 auto;
  height: 400px;
  border: 1px solid white;
  border-radius: 10px;
  background: rgba(30, 30, 30, 0.3);
  display: flex;
  align-items: center;
  user-select: none;
}

.c-gameCarousel-arrow {
  margin: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: white;

    svg {
      color: black;
      font-size: 20px;
    }
  }
}

.c-gameCarousel-inner {
  flex-grow: 1;
}
</style>
