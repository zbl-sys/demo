<template>
  <div class="blog-list-container" v-loading="isLoading" ref="blogContainer">
    <ul>
      <li v-for="item in blogList.rows" :key="item.id">
        <!-- 图片区域 -->
        <div class="thumb">
          <router-link :to="{name: 'blogDetail', params: {id: item.id}}">
            <img :src="item.thumb" alt="" />
          </router-link>
        </div>
        <!-- 详情区域 -->
        <div class="info">
          <router-link :to="{name: 'blogDetail', params: {id: item.id}}">
            <h2>
              {{ item.title }}
            </h2>
          </router-link>
          <div class="other-info">
            <span>日期：{{ item.createDate | formatDate }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论: {{ item.commentNumber }}</span>
            <router-link :to="{name: 'type', params: {id: item.category.id}}">{{ item.category.name }}</router-link>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Pager
      :total="blogList.total"
      :current="routerInfo.page"
      @changePage="changePage"
      v-if="blogList.total"
    />
    <router-view></router-view>
    <Empty  v-if="blogList.length === 0 && !isLoading"/>
  </div>
</template>

<script>
import { getBlogData } from "@/http/blogData.js";
import Pager from "@/components/Pager/index";
import Empty from '@/components/Empty'
export default {
  components: {
    Pager,
    Empty
  },
  data() {
    return {
      isLoading: true,
      blogList: [],
    };
  },
  computed: {
    routerInfo() {
      return {
        categoryId: +this.$route.params.id || -1,
        page: +this.$route.query.page || 1,
        limit: +this.$route.query.limit || 10,
      };
    },
  },
  watch: {
    //   监听路由信息，如果发生变化，则根据路由信息重新获取数据
      '$route'(){
          this.isLoading = true;
          this.$refs.blogContainer.scrollTop = 0;
          this.getData();
      }
  },
  methods: {
      getData(opations = {}){
          getBlogData(opations).then(res => {
              this.blogList = res;
              this.isLoading = false;
          })
      },
    changePage(newPageNum) {
      const query = {
        page: newPageNum,
        limit: this.routerInfo.limit,
      };
      //   如果当前没有分类，则直接跳转到blog目录下
      if (this.routerInfo.categoryId === -1) {
        this.$router.push({
          path: "/blog",
          query,
        });
      } else {
        const id = this.routerInfo.categoryId;
        this.$router.push({
          name: 'type',
          query,
          params: {
            id
          },
        });
      }
    },
  },
  created() {
      this.getData(this.routerInfo);
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar.less");
.blog-list-container {
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    li {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid @gray;
      .thumb {
        flex: 0 0 auto;
        margin-right: 15px;
        img {
          display: block;
          max-width: 200px;
          border-radius: 5px;
        }
      }
      .info {
        flex: 1 1 auto;
        h2 {
          margin: 0;
        }
        .other-info {
          font-size: 12px;
          color: @gray;
          padding: 5px 0;
          span {
            margin-right: 20px;
          }
        }
        .desc {
          margin: 15px 0;
          font-size: 15px;
          line-height: 2rem;
          overflow: hidden;
          /* 设置该盒子为伸缩盒 */
          display: -webkit-box;
          /* 设置该盒子中的元素的排列方式 */
          -webkit-box-orient: vertical;
          /* 设置元素中要显示的文本行数，超出部分打点 */
          -webkit-line-clamp: 2;
        }
      }
    }
  }
}
</style>