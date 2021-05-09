<template>
  <div class="to-top-container" v-show="this.isShow" @click="handleClick">
    top
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  created() {
    this.$bus.$on("mainscroll", (dom) => {
      // 如果没有dom元素，则不用进行后续处理
      if (!dom) {
        this.isShow = false;
        return;
      }
      dom.scrollTop > 500? (this.isShow = true) : (this.isShow = false);
    });
  },
  methods: {
      handleClick(){
          this.$bus.$emit('totopclick', 10);
      }
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar.less");
.to-top-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: @primary;
  position: fixed;
  right: 350px;
  bottom: 50px;
  color: #fff;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  z-index: 999;
}
</style>