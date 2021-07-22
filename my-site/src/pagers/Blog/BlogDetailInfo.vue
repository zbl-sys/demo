<template>
  <div class="blog-detail-info-container">
      <h1>{{article.title}}</h1>
      <div class="other-info">
          <span>日期: {{ article.createDate | formatDate }}</span>
          <span>浏览: {{article.scanNumber}}</span>
          <a href="#comment-content"><span>评论: {{article.commentNumber}}</span></a>
          <router-link :to="{name: 'type', params: {id:article.category.id}}"><span>{{article.category.name}}</span></router-link>
      </div>
      <div class="main-container markdown-body" v-html="article.htmlContent"></div>
  </div>
</template>

<script>
import '@/styles/markdown.css';
import "highlight.js/styles/github.css";
export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="less" scoped>
@import url('~@/styles/colorVar.less');
.blog-detail-info-container{
    width: 100%;
    padding: 20px;
    .other-info{
        color: @gray;
        span{
            font-size: 14px;
            margin-right: 20px;
        }
    }
    .main-container{
        padding: 20px 25px 20px 5px
    }
}
</style>