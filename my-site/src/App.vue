<template>
  <div class="app-container">
    <Layout>
      <template v-slot:left>
        <div class="left">
          <site-aside></site-aside>
        </div>
      </template>
      <template v-slot:default>
        <div class="main">
          <router-view></router-view>
        </div>
      </template>
      <!-- <template v-slot:right>
        <div class="right">这是右侧边栏</div>
      </template> -->
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "./components/Layout/index";
import SiteAside from "./components/SiteAside/index";
import ToTop from '@/components/ToTop'
export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
    ToTop
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/mixin.less");
.app-container {
  .fill-all(fixed);
  .left{
    width: 250px;
    height: 100%;
  }
  .main{
    width: 100%;
    height: 100%;
  }
}
</style>