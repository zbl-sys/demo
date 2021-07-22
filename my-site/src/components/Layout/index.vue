<template>
  <div class="layout-container">
      <div class="left">
          <slot name="left"></slot>
      </div>
      <div class="main">
          <slot></slot>
      </div>
      <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url('~@/styles/mixin.less');
.layout-container{
    width: 100%;
    height: 100%;
    display: flex;
    .left, .right{
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: auto;
    }
    .main{
        flex: 1 1 auto;
        overflow: hidden auto;
    }
}
</style>