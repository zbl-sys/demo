<template>
  <div class="image-loader-container">
      <!-- 占位图片 -->
      <img :src="placeholder" class="placeholder" v-if="!isAllDone" />
      <img :src="src" @load="handleLoad" :style="{ opacity: opacityShow, transition: `${duration / 1000}s` }" />
  </div>
</template>

<script>
export default {
    name: 'image-loader',
    props: {
        src: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 500,
        }
    },
    data() {
        return {
            isLoaded: false,
            isAllDone: false,//全部执行完毕
        }
    },
    computed: {
        opacityShow(){
            return this.isLoaded ? 1 : 0;
        }
    },
    methods: {
        handleLoad(){
            this.isLoaded = true;//图片加载完毕
            setTimeout(() => {
                this.isAllDone = true;//过渡完成，删除占位图片
                this.$emit('loaded')
            }, this.duration);
        }
    },
}
</script>

<style lang="less" scoped>
@import url('~@/styles/mixin.less');
.image-loader-container{
    width: 100%;
    height: 100%;
    position: relative;
    img{
        .fill-all();
        object-fit: cover;
    }
    .placeholder{
        filter: blur(5px);
    }
}
</style>