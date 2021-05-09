<template>
  <div class="layout-container">
      <Layout>
          <template v-slot:left>
          <div class="left">
              这是侧边栏
          </div>
      </template>
      <template>
          <div class="main">
              这是著区域
          </div>
      </template>
      <template v-slot:right>
          <div class="right">
              这是右侧边栏
          </div>
      </template>
      </Layout>
  </div>
</template>

<script>
import Layout from './index'
export default {
components: {
    Layout
}
}
</script>

<style lang="less" scoped>
.layout-container{
    width: 1000px;
    height: 800px;
    border: 2px solid;
}
.left{
        width: 250px;
        height: 100%;
        background: red;
    }
    .main{
        width: 100%;
        height: 100%;
        background: blue;
    }
    .right{
        width: 150px;
        height: 100%;
        background: black;
    }
</style>