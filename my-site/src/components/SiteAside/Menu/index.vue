<template>
  <ul class="menu-container">
    <li v-for="menu in menuList" :key="menu.id">
      <router-link :to="menu.link">
        <div class="icon">
          <icon :type="menu.iconType" />
        </div>
        <span>{{ menu.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon/index";
export default {
  name: "Menu",
  components: {
    Icon,
  },
  data() {
    return {
      menuList: [
        {
          link: "/home",
          title: "首页",
          iconType: "home",
          id: 1,
        },
        {
          link: "/blog",
          title: "文章",
          iconType: "blog",
          id: 2,
        },
        {
          link: "/about",
          title: "关于我",
          iconType: "about",
          id: 3,
        },
        {
          link: "/project",
          title: "项目&效果",
          iconType: "code",
          id: 4,
        },
        {
          link: "/message",
          title: "留言板",
          iconType: "chat",
          id: 5,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar.less");
.menu-container {
  list-style: none;
  color: @gray;
  margin-top: 50px;
  margin-bottom: 25px;
  padding: 0px;
  li {
    height: 45px;
    line-height: 45px;
    a {
      padding: 0px 60px;
      display: flex;
      align-items: center;
      &:hover {
        color: lighten(@gray, 60%);
      }
      .icon {
        width: 22px;
      }
      &.active {
        background-color: darken(@words, 5%);
        color: lighten(@gray, 60%);
      }
    }
  }
}
</style>