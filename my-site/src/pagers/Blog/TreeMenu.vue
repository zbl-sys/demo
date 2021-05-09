<template>
  <ul class="tree-menu-container">
    <li
      v-for="node in list"
      :key="node.name"
      :class="{ selected: node.isSelect }"
    >
      <span @click="chooseHandle(node)" class="title">{{ node.name }}</span>
      <span @click="chooseHandle(node)" class="num" v-if="node.articleCount"
        >{{ node.articleCount }}篇</span
      >
      <tree-menu
        :list="node.children"
        v-if="node.children"
        @select="chooseHandle"
      />
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  name: "tree-menu",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    Icon,
  },
  methods: {
    chooseHandle(node) {
      this.$emit("select", node); //抛出选择事件
    },
  },
};
</script>

<style scoped lang="less">
@import url("~@/styles/colorVar.less");
.tree-menu-container {
  list-style: none;
  padding: 5px 0;
  margin-top: -10px;
  li {
    font-size: 14px;
    margin: 20px 0px 0px 20px;
    cursor: pointer;
    color: @words;
    .title {
      margin-right: 10px;
      &:hover {
        color: @primary;
      }
    }
    .num {
      font-size: 12px;
      color: @gray;
    }
    &.selected {
      .num{
        color: @warn;
      }
        color: @warn;
        font-weight: bolder;
    }
  }
}
</style>