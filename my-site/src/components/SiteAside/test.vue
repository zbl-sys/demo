<template>
  <div class="site-aside-container">
      <site-aside />
  </div>
</template>

<script>
import SiteAside from './index'
import '@/styles/global.less'
export default {
    components: {
        SiteAside
    }
}
</script>

<style scoped lang='less'>

.site-aside-container{
    width: 250px;
    height: 100vh;
}
</style>