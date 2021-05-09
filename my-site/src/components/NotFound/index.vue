<template>
  <div class="not-found-container">
      <h1>404 Not Found</h1>
      <p>不好意思！页面找不到了</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';
.not-found-container{
    width: 100%;
    height: 90%;
    .flex-center(column);
    h1{
        font-size: 40px;
    }
    p{
        font-size: 20px;
        font-weight: bolder;
    }
}
</style>