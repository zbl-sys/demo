<template>
  <div
    class="home-container"
    ref="home"
    @wheel="handleWheel"
    v-loading="isLoading"
  >
    <div class="iconUp" @click="changeIndex(showNum - 1)" v-show="showNum >= 1">
      <Icon type="arrowUp" />
    </div>
    <div
      class="iconDown"
      @click="changeIndex(showNum + 1)"
      v-show="showNum < data.length - 1"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="control">
      <li
        v-for="(item, index) in data"
        @click="changeIndex(index)"
        :key="item.id"
        :class="{ active: showNum === index }"
      ></li>
    </ul>
    <ul
      class="banner-img"
      :style="{ marginTop }"
      @transitionend="transitionHandle"
    >
      <li v-for="(item, index) in data" :key="item.id">
        <!-- isNow用来判断传过去的图片是不是当前显示的图片 -->
        <Carouse :bannerItem="item" :isNow="index === showNum" />
      </li>
    </ul>
  </div>
</template>

<script>
// import getBanner from "@/http/banner";
import { mapState } from "vuex";
import Icon from "@/components/Icon/index";
import Carouse from "./Carouse";
export default {
  components: {
    Icon,
    Carouse,
  },

  data() {
    return {
      // isLoading: true,
      // bannerList: [],
      showNum: 0,
      containerHeight: 0,
      switching: false,//是否正在切换
    };
  },

  methods: {
    // 点击切换轮播图
    changeIndex(index) {
      this.showNum = index;
    },
    // 滚轮事件
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      // 向下滚动
      if (e.deltaY > 0 && this.showNum < this.data.length - 1) {
        this.switching = true;
        this.showNum++;
      } else if (e.deltaY < 0 && this.showNum > 0) {
        //向上滚动
        this.switching = true;
        this.showNum--;
      }
    },
    // 过渡完成
    transitionHandle() {
      this.switching = false;
    },
    // 监听视口的尺寸变化
    resizeHandle() {
      this.containerHeight = this.$refs.home.clientHeight;
    },
  },

  computed: {
    marginTop() {
      return -this.showNum * this.containerHeight + "px";
    },
    ...mapState("banner", ["isLoading", "data"]),
  },

  created() {
    // getBanner().then((res) => {
    //   this.bannerList = res;
    //   this.isLoading = false;//拿到数据之后，取消显示加载状态
    // });
    // 通过分发状态来控制数据
    this.$store.dispatch("banner/getData");
  },

  mounted() {
    this.containerHeight = this.$refs.home.clientHeight;
    // 监听视口的尺寸变化
    window.addEventListener("resize", this.resizeHandle);
  },

  destroyed() {
    window.removeEventListener("resize", this.resizeHandle);
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar.less");
@size: 100%;
.home-container {
  width: @size;
  height: @size;
  position: relative;
  overflow: hidden;
  ul {
    list-style: none;
    margin: 0px;
    padding: 0;
  }
  .banner-img {
    width: @size;
    height: @size;
    transition: all 0.5s;
    li {
      width: @size;
      height: @size;
    }
  }
  .control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    z-index: 999;
    li {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 5px 0;
      border: 1px solid;
      background: @dark;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
  @top: 30px;
  .iconUp,
  .iconDown {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 999;
  }
  .iconUp {
    top: @top;
    animation: jump 1s infinite;
  }
  .iconDown {
    bottom: @top;
    animation: jump 1s infinite;
  }
  .icon-container {
    font-size: 35px;
    color: @gray;
  }
  @keyframes jump {
    0% {
      transform: scale(1.2) translateY(-10px);
    }
    50% {
      transform: scale(1) translateY(0px);
    }
    100% {
      transform: scale(1.2) translateY(-10px);
    }
  }
}
</style>