<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <!-- 当当前页码是第一页的时候，回到首页和上一页的按钮将禁止使用 -->
    <a @click="handleClick(1)" :class="{ disabled: isShowFirst }">|&lt;&lt;</a>
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(num)"
      :class="[{ active: current === num }]"
      v-for="(num, index) in showNumbers"
      :key="index"
      >{{ num }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;</a
    >
    <a @click="handleClick(pageNumber)" :class="{ disabled: isShowEnd }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    current: {//当前页码
      type: Number,
      default: 5,
    },
    total: {//总的数据量
      type: Number,
      default: 200,
    },
    limit: {//每页的可以容纳的数据量
      type: Number,
      default: 10,
    },
    visibleNumber: {//可见的页码数
      type: Number,
      default: 10,
    },
  },
  methods: {
    handleClick(targetNum) {
      this.$emit("changePage", targetNum);
    },
  },
  computed: {
    pageNumber() {//总页数
      return Math.ceil(this.total / this.limit);
    },
    // 当当前显示的页码数包含最后一页的话，去到最后的按钮禁止使用
    isShowEnd() {
      return this.current + Math.ceil(this.visibleNumber / 2) > this.pageNumber? true: false;
    },
    isShowFirst() {
      return this.current - Math.ceil(this.visibleNumber / 2) <= 1? true: false;
    },
    visibleMinAndMax() {
      // 当前页面可见的最小的页码
      let minNumber = this.current - Math.floor(this.visibleNumber / 2);
      if (minNumber <= 1) {
        minNumber = 1;
      }// 当前页面可见的最大页码
      let maxNumber = minNumber + this.visibleNumber - 1;
      if (maxNumber >= this.pageNumber) {
        maxNumber = this.pageNumber;
      }
      return { minNumber, maxNumber };
    },
    // 当前页面要显示的所有页码
    showNumbers() {
      let pageArr = [];
      const { minNumber: min, maxNumber: max } = this.visibleMinAndMax;
      for (let i = min; i <= max; i++) {
        pageArr.push(i);
      }
      return pageArr;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/colorVar.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 5px;
    cursor: pointer;
    user-select: none;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      cursor: text;
      font-weight: bold;
    }
  }
}
</style>