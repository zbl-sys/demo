<template>
  <div class="blog-detail-toc-container">
    <h1>目录</h1>
    <TreeMenu :list="newToc" @select="handleSelect" />
  </div>
</template>

<script>
import TreeMenu from "./TreeMenu";
import { debounce } from "@/utils";
export default {
  components: {
    TreeMenu,
  },
  props: {
    tocInfo: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      domId: "",
    };
  },
  computed: {
    // 改动目录数组，让其带isSelect属性
    newToc() {
      const addItem = (toc) => {
        return toc.map((item) => {
          return {
            ...item,
            isSelect: this.domId === item.anchor,
            children: addItem(item.children ? item.children : []),
          };
        });
      };
      return addItem(this.tocInfo);
    },
    // 根据tocInfo中的anchor属性，获取到对应的dom元素，后面根据位置，修改domid的值
    getDoms() {
      const doms = [];
      const getDomById = (toc) => {
        for (const item of toc) {
          doms.push(document.getElementById(item.anchor));
          if ((item.children && item.children.length > 0)) {
            getDomById(item.children);
          }
        }
      };
      getDomById(this.tocInfo);
      return doms;
    },
  },
  methods: {
    handleSelect(node) {
      location.hash = node.anchor;
    },
    // 设置domId的值
    setIsSelect(mainDom) {
      if(!mainDom){
        return;//证明已经没有这个dom了
      }
      this.domId = ""; //每次滚动先要将存放元素id的数据置为空，方便后面设置
      for (const dom of this.getDoms) {
        const offsetTop = dom.getBoundingClientRect().top;
        if (offsetTop <= 0) {
          // 如果距离顶部的距离小于0，代表当前元素在上方，先默认选中，继续循环
          this.domId = dom.id;
        } else if (offsetTop > 0 && offsetTop <= 150) {
          //在规定的范围内，则直接选中，然后结束循环
          this.domId = dom.id;
          return;
        } else {
          //代表元素还在下方，不需要操作
          return;
        }
      }
    },
  },
  created() {
    // 在事件总线上监听事件，避免滚动就执行函数，做函数防抖
    // 防抖函数会返回新函数作为处理事件的函数，在vue中处理事件的函数会自动带事件对象，因此在执行新函数的时候，会有参数
    // 防抖函数会将参数带给需要执行的函数
    this.$bus.$on("mainscroll", debounce(this.setIsSelect, 100));
  },
};
</script>

<style lang="less" scoped>
.blog-detail-toc-container {
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  h1 {
    font-size: 20px;
    padding-left: 20px;
  }
}
</style>