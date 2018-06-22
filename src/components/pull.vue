<template>
  <div class="pull-box">
    <div class="refresh">下拉刷新</div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="load">上拉加载</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dis: 0
    }
  }
}
</script>

<style lang="less">
.pull-box {
  flex: 1;
  position: relative;
  overflow: hidden;
  .refresh {
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    text-align: center;
    transform: translateY(-100%);
  }
  .load {
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 0px;
    text-align: center;
    transform: translateY(100%);
  }
}
</style>
