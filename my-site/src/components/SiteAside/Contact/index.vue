<template>
  <ul class="contact-container">
    <li v-for="(contact, index) in data" :key="contact.id">
      <a :href="contact.url" target="_blank">
        <div>
          <icon :type="contact.type"  class="icon" :class="{'weixin-icon':index === data.length - 1}"/>
        </div>
        <span>{{ contact.text }}</span>
      </a>
      <div class="code" v-if="contact.qrCodeUrl">
              <img :src="contact.qrCodeUrl">
          </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from 'vuex';
export default {
  name: 'Contact',
  components: {
    Icon,
  },
  computed: mapState('globalSet', ['data'])
};
</script>

<style lang="less" scoped>
@import url("~@/styles/colorVar");
.contact-container {
  list-style: none;
  padding: 20px 10px;
  margin: 0px;
  color: @gray;
  li {
    height: 30px;
    line-height: 30px;
    margin: 14px;
    position: relative;
    &:hover{
        .code{
            transform: scaleY(1);
        }
    }
    a {
      display: flex;
      align-items: center;
      cursor: pointer;
       div{
          width: 36px;
      }
      span{
        font-size: 14px;
      }
      }
      .icon {
        font-size: 26px;
      }
      .weixin-icon{
          font-size: 32px;
      }
    }
    .code{
        position: absolute;
        left: 0px;
        bottom: 35px;
        padding: 10px 15px;
        background-color: #fff;
        border-radius: 10px;
        transform-origin: center bottom;
        transform: scaleY(0);
        transition: .5s;
        &::after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: -5px;
            transform: translateX(-50%) rotate(45deg);
            width: 10px;
            height: 10px;
            background-color: #fff;

        }
        img{
            width: 160px;
            height: 160px;
        }
    }
  }

</style>