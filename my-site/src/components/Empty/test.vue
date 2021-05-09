<template>
    <div class="empty-container">
        <empty  text="没有数据了" />
    </div>
</template>

<script>
import Empty from './index'
export default {
    components: {
        Empty
    }
}
</script>

<style scoped>
.empty-container{
    width: 600px;
    height: 400px;
    border: 1px solid;
    margin:  0 auto;
}
</style>