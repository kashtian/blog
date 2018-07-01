<template>
  <div class="test-page">
    <pull>
      <div class="item" v-for="(item, index) in arr" :key="index">
        {{item}}
      </div>
    </pull>
  </div>
</template>

<script>
import pull from '@/components/pull'

export default {
  name: 'test',
  path: '/test',
  title: '测试',

  components: {
    pull
  },

  data() {
    return {
      arr: []
    }
  },

  created() {
    let arr = []
    for (let i = 0; i < 30; i++) {
      arr.push(`test${i}`)
    }
    this.arr = arr
  },
}
</script>

<style lang="less">
.test-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 30pr;
  .item {
    height: 80pr;
    line-height: 80pr;
    margin-bottom: 20pr;
    text-align: center;
    border-radius: 10pr;
    box-shadow: 0px 0px 10pr rgba(0,0,0,0.2);
  }
}
</style>
