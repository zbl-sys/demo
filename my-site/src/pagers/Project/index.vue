<template>
  <div class="project-container" v-loading="isLoading">
    <ul>
      <li class="item-project" v-for="item in data" :key="item.id">
        <a :href="item.url" class="link" target="_blank">
          <img
            :src="item.thumb"
          />
        </a>
        <div class="describe">
          <div>
            <h1>{{ item.name }}</h1>
            <a class="gitLink" :href="item.github" target="_blank">github链接</a>
          </div>
          <p v-for="info in item.description" :key="info">{{ info }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'  
export default {
  computed: mapState('project', ['isLoading', 'data']),
  methods: {
    ...mapActions('project', ['getData'])
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
@import url('~@/styles/colorVar.less');
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    .item-project {
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
      transition: .2s;
      &:hover{
        box-shadow: -2px 2px 5px 5px @gray;
        border-radius: 15px;
        transform: scale(1.01);
      }
      .link{
        margin: 0px 10px;
        img{
          display: block;
          width: 300px;
          max-height: 220px;
          object-fit: cover;
          border-radius: 10px;
          transition: 0.2s;
          &:hover{
            transform: scale(1.05);
          }
        }
      }
      .describe{
        h1{
          margin: 0;
          font-size: 24px;
        }
        p{
          color: @words;
          margin: 10px 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-indent: 1.5em;
        }
        .gitLink{
          color: @lightWords;
          font-size: 14px;
        }
      }
    }
  }
}
</style>