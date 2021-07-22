<template>
  <pager :total="total" :current="current" @changePage="changePage"/>
</template>

<script>
import Pager from './index'
export default {
    data() {
    return {
      current:1,
      total:200
    }
  },
  components: {
    Pager
  },
  methods: {
    changePage(newPageNum){
      this.current = newPageNum;
    }
  },
}
</script>

<style>

</style>