<template>
  <div
    class="carouse-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="img" ref="image" :style="imagePosition">
      <image-loader
        :src="bannerItem.bigImg"
        :placeholder="bannerItem.midImg"
        @loaded="handleLoad"
      />
    </div>
    <div class="title" :class="{ show: isshow && isNow }">
      {{ bannerItem.title }}
    </div>
    <div class="desc" :class="{ show: isshow && isNow }">
      {{ bannerItem.description }}
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: {
    ImageLoader,
  },
  props: ["bannerItem", "isNow"],
  data() {
    return {
      isshow: false,//是否加载完成
      containerSize: null, //容器的尺寸
      imgSize: null, //图片的尺寸
      mouseCoordinate: null, //鼠标相对于容器的坐标
    };
  },
  methods: {
    handleLoad() {
      this.isshow = true;
    },
    handleMouseMove(e) {
      // getBoundingClientRect不具有实时性
      const { left, top } = this.$refs.container.getBoundingClientRect();
      this.mouseCoordinate = {
        x: e.pageX - left,
        y: e.pageY - top,
      };
    },
    handleMouseLeave(e) {
      this.mouseCoordinate = {
        x: this.mouseCenter.x,
        y: this.mouseCenter.y,
      };
    },
  },
  computed: {
    mouseCenter() {
      // 初始状态，或者鼠标移出之后，假设鼠标坐标在中间
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
    imagePosition() {
      if (!this.containerSize || !this.imgSize) {
        return;
      }
      const imgFlowWidth = this.imgSize.width - this.containerSize.width;
      const imgFlowHeight = this.imgSize.height - this.containerSize.height;
      const left =  (-imgFlowWidth / this.containerSize.width) * this.mouseCoordinate.x;
      const top =  (-imgFlowHeight / this.containerSize.height) * this.mouseCoordinate.y;
      return {
        left: left + "px",
        top: top + "px",
      };
    },
  },
  mounted() {
    this.containerSize = {
      width: this.$refs.container.clientWidth,
      height: this.$refs.container.clientHeight,
    };
    this.imgSize = {
      width: this.$refs.image.clientWidth,
      height: this.$refs.image.clientHeight,
    };
    // 初始状态，让鼠标的坐标在最中间
    this.mouseCoordinate = {
      x: this.mouseCenter.x,
      y: this.mouseCenter.y,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar.less");
.carouse-container {
  width: 100%;
  height: 100%;
  position: relative;
  color: lighten(@gray, 10%);
  overflow: hidden;
  .img {
    width: 110%;
    height: 110%;
    position: absolute;
    transition: 0.3s linear;
    top: 0;
    left: 0;
  }
  .title,
  .desc {
    position: absolute;
    font-size: 30px;
    letter-spacing: 3px;
    text-shadow: 2px 0 0 rgba(0, 0, 0, 0.7), -2px 0 0 rgba(0, 0, 0, 0.7),
      0 2px 0 rgba(0, 0, 0, 0.7), 0 -2px 0 rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 4s, transform 2s;
    transform-origin: left center;
    transform: scale(0);
    &.show {
      opacity: 1;
      transform: scale(1);
    }
  }
  .title {
    top: 47%;
    left: 30px;
  }
  .desc {
    top: 53%;
    left: 70px;
    font-size: 25px;
  }
}
</style>