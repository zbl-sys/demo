<template>
  <i class="iconfont icon-container" :class="iconClass"></i>
</template>

<script>
// 字体图标类名的对应关系
const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
  arrowRight: "icon-youjiantou"
};
export default {
    name: 'Icon',
    props: {
        type: {
            type: String,
            required: true
        }
    },
    computed: {
        iconClass(){
            // 根据传递过来的类型，返回相应的类名
            return classMap[this.type];
        }
    }
}
</script>

<style scoped>
/* 引入字体图标的样式 */
@import url('http://at.alicdn.com/t/font_2164449_nalfgtq7il.css');
@import url('http://at.alicdn.com/t/font_2369612_jj7pdo66qm.css');
</style>