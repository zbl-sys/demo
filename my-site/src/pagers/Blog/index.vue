<template>
  <div class="blog-container">
    <Layout>
      <!-- <template v-slot:left>
        <div class="left">这是侧边栏</div>
      </template> -->
      <template v-slot:default>
          <blog-list></blog-list>
      </template>
      <template v-slot:right>
          <blog-aside></blog-aside>
      </template>
    </Layout>
  </div>
</template>

<script>
import BlogAside from "./BlogAside";
import BlogList from "./BlogList";
import Layout from "@/components/Layout";
export default {
  components: {
    BlogAside,
    BlogList,
    Layout,
  },
};
</script>

<style lang="less" scoped>
.blog-container{
  width: 100%;
  height: 100%;
}
</style>