<template>
  <div class="c-gameCarousel">
    <div class="c-gameCarousel-arrow c-gameCarousel--left" @click="slide--">
      <div class="c-gameCarousel-arrow-inner">
        <c-icon icon="chevron-left" class="fa-fw" />
      </div>
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
        <artificial-intelligence />
      </slide>
      <slide v-show="slide === 5">
        <chokepoint />
      </slide>
      <slide v-show="slide === 6">
        <overload />
      </slide>
      <slide v-show="slide === 7">
        <golden-fields />
      </slide>
    </div>

    <div class="c-gameCarousel-arrow c-gameCarousel--right" @click="slide++">
      <div class="c-gameCarousel-arrow-inner">
        <c-icon icon="chevron-right" />
      </div>
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
        this.slide = 7
      } else if (this.slide > 7) {
        this.slide = 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-gameCarousel {
  width: 600px;
  max-width: 90%;
  margin: 0 auto;
  margin-bottom: 30px;
  height: 400px;
  border: 1px solid white;
  border-radius: 10px;
  background: rgba(30, 30, 30, 0.3);
  display: flex;
  align-items: center;
  user-select: none;

  @media (max-width: 450px) {
    height: 325px;
  }
}

.c-gameCarousel-arrow {
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s ease-in-out;

  &.c-gameCarousel--left {
    margin-left: 10px;
  }

  &.c-gameCarousel--right {
    margin-right: 10px;
  }

  .c-gameCarousel-arrow-inner {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 50%;

    svg {
      flex-grow: 1;
    }

    &:hover {
      background-color: white;

      svg {
        color: black;
      }
    }

    @media (max-width: 450px) {
      width: 30px;
      height: 30px;
    }
  }
}

.c-gameCarousel-inner {
  flex-grow: 1;
}
</style>
