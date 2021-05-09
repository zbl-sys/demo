<template>
  <div class="image-loader-container">
    <image-loader
     placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      :duration="3000"
    />
  </div>
</template>

<script>
import ImageLoader from "./index";
export default {
  components: {
    ImageLoader,
  },
};
</script>

<style lang="less" scoped>
.image-loader-container{
    width: 600px;
    height: 500px;
}
</style>