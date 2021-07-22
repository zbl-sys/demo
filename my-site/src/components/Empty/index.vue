<template>
  <div class="empty-container">
      <icon type="empty" />
      <p class="text">{{text}}</p>
  </div>
</template>

<script>
import Icon from '@/components/Icon/index'
export default {
    name: 'Empty',
    components: {
        Icon
    },
    props: {
        text: {
            type: String,
            default: '无数据'
        }
    }
}
</script>

<style lang="less" scoped>
@import url('~@/styles/colorVar.less');
@import url('~@/styles/mixin.less');
.empty-container{
    height: 100%;
    .flex-center(column);
    color: @gray;
    .icon-container{
        font-size: 60px;
    }
}
</style>>
