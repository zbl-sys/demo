<template>
  <div class="site-aside-container">
      <avatar url="https://img2.baidu.com/it/u=1407335370,4125449451&fm=26&fmt=auto&gp=0.jpg" :size="150" />
      <h3 class="user">小赵的个人空间</h3>
      <Menu />
      <contact />
      <p class="footer">龙ICP备案号000001号</p>
  </div>
</template>

<script>
import Menu from './Menu/index';
import Contact from './Contact/index';
import Avatar from '@/components/Avatar/index'
export default {
    components: {
        Menu,
        Contact,
        Avatar
    }
}
</script>

<style lang="less" scoped>
@import url('~@/styles/colorVar.less');
.site-aside-container{
    width: 100%;
    height: 100%;
    background: @dark;
    box-sizing: border-box;
    padding: 20px 0;
    .avatar-container{
        margin: 0 auto;
    }
    .user{
        color: lighten(@gray, 50%);
        text-align: center;
        margin-top: 5px;
    }
    .footer{
        font-size: 14px;
        color: darken(@gray, 30%);
        text-align: center;
    }
}
</style>