<template>
    <Layout>
      <template>
        <div ref="blogContentDiv" class="blogInfo-container" v-loading="isLoading">
          <BlogDetailInfo v-if="article" :article="article" />
          <CommentMessage v-if="!isLoading" title="评论" :subTitle='`(${comment.total})`' :commentList="comment.rows" :isLoading="isCommentLoading" @submit="handleSubmit" />
        </div>
      </template>
      <template v-slot:right>
        <div class="right-container" v-loading="isLoading">
          <BlogDetailTOC  :tocInfo="article.toc" v-if="article"  />
        </div>
      </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetailInfo from "./BlogDetailInfo";
import BlogDetailTOC from "./BlogDetailTOC";
import { getBlogById, getComments, addComment } from "@/http/blogData.js";
import CommentMessage from '@/components/CommentMessage'
export default {
  components: {
    Layout,
    BlogDetailInfo,
    BlogDetailTOC,
    CommentMessage
  },
  data() {
    return {
      article: null,//存博客文章
      comment: {},//存评论
      isLoading: true,
      isCommentLoading: true,
      page: 1,
      limit: 10,
    };
  },
  async created() {
    // 通过id请求单个文章
    let data = await getBlogById(this.$route.params.id);
    if(!data){
      this.$router.push('/404')
      return;
    }
    this.article = data;
    this.isLoading = false;
    // 请求所有评论
    const commentList = await getComments(this.$route.params.id, this.page, this.limit );
    this.comment = commentList;
    this.isCommentLoading = false;
  },
  computed: {
    hasMoreComment(){
      return this.comment.total >= this.comment.rows.length;
    }
  },
  methods: {
    // 加载下一页的函数
    async getMoreComment(){
      if(!this.hasMoreComment){
        return ;//代表已经没有更多的品论了
      }
      this.isCommentLoading = true;
      this.page ++;
      const res = await getComments(this.$route.params.id, this.page, this.limit );
      this.comment.total = res.total;
      this.comment.rows = [...this.comment.rows, ...res.rows];
      this.isCommentLoading = false;
    },
    // 处理子组件抛出的事件，提交评论信息
    async handleSubmit(commentInfo, callback){
      const addInfo = await addComment({
        blogId: this.$route.params.id,
        ...commentInfo
      });
      // 将返回的值，添加到所有评论的第一个
      this.comment.rows.unshift(addInfo);
      this.comment.total++;
      callback('评论成功');
    },
    handleScroll(){
      this.$bus.$emit('mainscroll', this.$refs.blogContentDiv);
      if(this.isCommentLoading){
        return;//表示正在加载
      }
      const { clientHeight, scrollTop, scrollHeight } = this.$refs.blogContentDiv;
      //可滚动高度减去视口的高度和滚出的高度，如果小于特定范围，就认为到达底部了，继续请求请求更多的评论
     if(scrollHeight - (clientHeight + scrollTop) < 100){
       this.getMoreComment();
     }
    }
  },
  // 触发滚动事件了之后，给事件总线上抛出一个事件
  mounted() {
    this.$bus.$on('totopclick', (top) => {
      this.$refs.blogContentDiv.scrollTop = top;
    })
    this.$refs.blogContentDiv.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    this.$bus.$off('totopclick')
    this.$bus.$emit('mainscroll')
    this.$refs.blogContentDiv.removeEventListener('scroll', this.handleScroll);
  },
  updated() {
    // 因为浏览器一刷新，就需要跳转，但是此时还没有实际的dom元素，等到dom元素渲染完毕后已经不会发生跳转了
    // 所以先将hash置为空，等数据更新之后再重新赋值
    const hash = location.hash;
    location.hash = '';
    setTimeout(() => {
      location.hash = hash;
    })
  },
};
</script>

<style scoped>
.blogInfo-container{
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container{
  position: relative;
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
}
</style>