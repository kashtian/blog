<template>
  <div class="loading" v-show="isLoading">
    <div class="content">
      <div class="dot"></div>
      <div class="dot two"></div>
      <div class="dot three"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'loading',

  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
}
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 160pr;
    height: 160pr;
    padding: 0px 30pr;
    color: #fff;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.6);
    box-sizing: border-box;
    .dot {
      width: 20pr;
      height: 20pr;
      background-color: #fff;
      border-radius: 100%;
      animation: fadeIn 1.5s infinite ease-in-out;
      &.two {
        animation-delay: -1.2s;
      }
      &.three {
        animation-delay: -0.9s; 
      }
    }
  }
}

@keyframes fadeIn {
  0%, 66.6%, 100% {
    opacity: 0.1;
  }
  33.3% {
    opacity: 1;
  }
}
</style>
