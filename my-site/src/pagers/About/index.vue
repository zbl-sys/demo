<template>
  <div class="about-container" v-loading="isLoading || !iframeLoaded">
      <iframe :src="url" @load="handleLoad" v-if="url"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      iframeLoaded: false//保存iframe的src是否加载完毕
    }
  },
  computed: {
    ...mapState('about', ['isLoading', 'url'])
  },
  methods: {
    handleLoad(){
      console.log(1);
      this.iframeLoaded = true;
    }
  },
  mounted() {
    this.$store.dispatch('about/getData');
  },
}
</script>

<style lang="less" scoped>
@size: 100%;
.about-container{
  width: @size;
  height: @size;
  overflow: hidden;
  position: relative;
  iframe{
    width: @size;
    height: @size;
  }
}
</style>