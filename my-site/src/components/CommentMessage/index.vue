<template>
  <div class="message-comment-container">
    <h1 id="comment-content">{{title}}区</h1>
    <form class="form-data" ref="form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="input">
          <input
            type="text"
            placeholder="用户昵称"
            maxlength="10"
            v-model="formData.nickname"
            @focus="handkeFocus"
          />
          <span class="tip">{{ formData.nickname.length }}/10</span>
        </div>
        <div class="err">
          <Icon type="error" v-show="error.nickname" /><span>{{ error.nickname }}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="textarea">
          <textarea
            placeholder="输入信息"
            maxlength="300"
            v-model="formData.content"
          ></textarea>
          <span class="tip">{{ formData.content.length }}/300</span>
        </div>
        <div class="err">
          <Icon type="error" v-show="error.content" /><span>{{ error.content }}</span>
        </div>
      </div>
      <div class="form-item">
        <button class="btn" :class="{disabled: isSubmiting}">提交</button>
      </div>
    </form>
    <h2  v-if="commentList.length">{{ title }}   {{ subTitle }}</h2>
    <div class="showComment">
      <ul class="comment-list">
        <li v-for="list in commentList" :key="list.id">
          <Avatar
            :url="list.avatar"
            :size="44"
          />
          <div class="data">
            <div class="nickname">{{list.nickname}}</div>
            <div class="content">
            {{list.content}}
            </div>
            <div class="time">{{list.createDate | formatDate(true)}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading" v-loading="isLoading"></div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
export default {
  components: {
    Avatar,
    Icon,
  },
  props:{
       title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    commentList: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 表单部分
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },
    methods: {
        handkeFocus(){
            this.error.nickname = '';
            this.error.content = '';
        },
        handleSubmit(){
            this.error.nickname = this.formData.nickname ? '' : '请输入用户昵称';
            this.error.content = this.formData.content ? '' : '请留下你宝贵的意见';
            if(this.error.nickname || this.error.content){//输入框为空，即发生了错误，不提交
                return ;
            }
            this.isSubmiting = true;
            this.$emit('submit', this.formData, (info) => {
               this.$showPopInfo({
                   showText: info,
                   showType: 'success',
                   container: this.$refs.form,
                   callback: () => {
                       this.isSubmiting = false;
                       this.formData.nickname = '';
                       this.formData.content = '';
                   }
               })
            })
        }
    },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar.less");
.message-comment-container{
  overflow: hidden;
  padding: 20px;
  h2 {
    margin-bottom: 0;
  }
  .form-data {
    .form-item {
      margin: 10px 0;
      width: 60%;
      .input,
      .textarea {
        position: relative;
        margin-bottom: 5px;
      }
      .err {
        color: @danger;
        font-size: 15px;
        span {
          margin-left: 10px;
        }
      }
      .btn {
        outline: none;
        border: none;
        cursor: pointer;
        width: 100px;
        height: 34px;
        color: #fff;
        border-radius: 5px;
        background: @primary;
        &:hover {
          background: darken(@primary, 10%);
        }
        &.disabled {
          background-color: lighten(@primary, 20%);
          cursor: not-allowed;
        }
      }
    }
  }
}
input,
textarea {
  display: block;
  color: @words;
  box-sizing: border-box;
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 5px 10px;
  border: 1px dashed rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  &:focus {
    border-color: @primary;
  }
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 150px;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 2px;
  color: #b4b8bc;
  font-size: 12px;
}
.comment-list {
  list-style: none;
  margin: 0px;
  padding: 0px;
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid lighten(@gray, 10%);
    padding: 15px 0;
    .avatar-container {
      flex: 0 0 auto;
    }
    .data {
      margin-left: 15px;
      position: relative;
      flex: 1 1 auto;
      .nickname {
        color: darken(@success, 10%);
        margin-bottom: 10px;
      }
      .content {
        font-size: 14px;
      }
      .time {
        position: absolute;
        top: 5px;
        right: 15px;
        font-size: 12px;
        color: @gray;
      }
    }
  }
}
.loading {
  position: relative;
  height: 100px;
}
</style>