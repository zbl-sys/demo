<template>
  <div class="menu-containe">
      <Menu />
  </div>
</template>

<script>
import Menu from './index';
import '@/styles/global.less'
export default {
    components: {
        Menu
    }
}
</script>

<style lang="less" scoped>
.menu-containe{
    width: 400px;
    height: 600px;
    background: black;
}
</style>