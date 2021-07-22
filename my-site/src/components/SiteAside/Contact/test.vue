<template>
  <div class="contact-containe">
      <contact />
  </div>
</template>

<script>
import Contact from './index';
import '@/styles/global.less';
export default {
    components: {
        Contact
    }
}
</script>

<style lang="less" scoped>
.contact-containe{
    padding-top: 300px;
    width: 400px;
    height: 800px;
    background: black;
}
</style>>

