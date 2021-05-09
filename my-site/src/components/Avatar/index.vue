<template>
    <img 
    :src="url" 
    :title="title" 
    :style="{width: `${size}px`, height: `${size}px`}"
    class="avatar-container">
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: '这是一张头像图片'
        },
        size: {
            type: Number,
            default: 50
        }
    }
}
</script>

<style scoped>
.avatar-container{
    border-radius: 50%;
    object-fit: cover;/* 让图片尽量保持原比例 */
    display: block;/* 防止照片出现白边 */
}
</style>>
