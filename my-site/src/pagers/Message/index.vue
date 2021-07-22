<template>
  <div class="message-container" ref="messageContaner" v-loading="isLoading">
    <CommentMessage
      v-if="!isLoading"
      title="留言"
      :isLoading="isLoadMore"
      :subTitle="`(${messageList.total})`"
      :commentList="messageList.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import CommentMessage from "@/components/CommentMessage";
import { postMessage, getMessages } from "@/http/message.js";
import { debounce } from "@/utils";
export default {
  components: {
    CommentMessage,
  },
  data() {
    return {
      messageList: [],
      isLoading: true,
      page: 1,
      limit: 10,
      isLoadMore: false,
    };
  },
  computed: {
    hasMoreData() {
      return this.messageList.rows.length < this.messageList.total;
    },
  },
  created() {
   
    getMessages(this.page, this.limit).then((res) => {
      this.messageList = res;
      this.isLoading = false;
    });
  },
  mounted() {
     this.$bus.$on('totopclick' , (top) => {
      this.$refs.messageContaner.scrollTop = top;
    })
    this.$bus.$emit("mainscroll", this.$refs.messageContaner);
    this.$refs.messageContaner.addEventListener(
      "scroll",
      debounce(this.handleScroll)
    );
  },
  beforeDestroy() {
    this.$bus.$off('totopclick')
    this.$bus.$emit("mainscroll");
    this.$refs.messageContaner.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getMoreMessage() {
      if (!this.hasMoreData) {
        return; //代表已经没有更多的品论了
      }
      this.isLoadMore = true;
      this.page++;
      getMessages(this.page, this.limit).then((res) => {
        this.messageList.total = res.total;
        this.messageList.rows = this.messageList.rows.concat(res.rows);
        this.isLoadMore = false;
      });
    },
    async handleSubmit(commentInfo, callback) {
      const addInfo = await postMessage({
        ...commentInfo,
      });
      // 将返回的值，添加到所有评论的第一个
      this.messageList.rows.unshift(addInfo);
      this.messageList.total++;
      callback("感谢您的留言");
    },
    handleScroll() {
      this.$bus.$emit("mainscroll", this.$refs.messageContaner);
      const {
        clientHeight,
        scrollTop,
        scrollHeight,
      } = this.$refs.messageContaner;
      if (scrollHeight - (clientHeight + scrollTop) < 100) {
        this.getMoreMessage();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  position: relative;
  scroll-behavior: smooth;
  .message-comment-container {
    width: 70%;
    margin: 0 auto;
  }
  .to-top-container {
    right: 50px;
  }
}
</style>