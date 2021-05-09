<template>
  <div class="blog-aside-container" v-loading="isLoading">
    <h1>文章分类</h1>
    <TreeMenu :list="infoList" @select="handleSelect" />
  </div>
</template>

<script>
import { getBlogType } from "@/http/blogData.js";
import TreeMenu from "./TreeMenu";
export default {
  components: {
    TreeMenu,
  },
  data() {
    return {
      isLoading: true,
      typeList: [],
    };
  },
  created() {
    getBlogType().then((res) => {
      this.typeList = res;
      this.isLoading = false;
    });
  },
  methods: {
    handleSelect(nowInfo) {
      const query = {
        page: 1, //重新选择一个分类之后，默认显示第一页
        limit: this.limit,
      };
      if (nowInfo.id === -1) {
        this.$router.push({
          path: "/blog",
          query,
        });
      } else {
        this.$router.push({
          name: "type",
          query,
          params: {
            id: nowInfo.id,
          },
        });
      }
    },
  },
  computed: {
    categoryId() {
      // 从路由信息中得到，分类的id
      return +this.$route.params.id || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    infoList() {
      // 改造传递的分类列表，让其拥有isSelect属性,增加一项表示全部文章的总数
      const totalCount = this.typeList.reduce((num, item) => {
        return num + item.articleCount;
      }, 0);
      const addItem = [
        { name: "全部", id: -1, articleCount: totalCount },
        ...this.typeList,
      ];
      const result = addItem.map((item) => ({
        ...item,
        isSelect: this.categoryId === item.id,
      }));
      return result;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar.less");
.blog-aside-container {
  width: 250px;
  height: 100%;
  padding: 30px 10px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  h1 {
    font-size: 18px;
  }
}
</style>