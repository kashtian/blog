<template>
  <div class="test-page">
    <pull ref="pull" :top-fn="refresh" :bottom-fn="loadmore" :no-more="nomore">
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
      arr: [],
      page: 1,
      pageSize: 20,
      nomore: false
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      let arr = []
      for (let i = 1; i <= this.pageSize; i++) {
        arr.push(`test${(this.page == 1 ? 0 : this.arr.length) + i}`)
      }
      setTimeout(() => {
        if (this.page == 1) {
          this.arr = arr
        } else {
          this.arr = this.arr.concat(arr)
        }
        if (this.arr.length > 50) {
          this.nomore = true
        } else {
          this.nomore = false
        }
        this.$refs.pull.onLoaded()
      }, 2000)
    },

    refresh() {
      this.page = 1
      this.getList()
    },

    loadmore() {
      this.page++
      this.getList()
    }
  }
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
    box-shadow: 0px 0px 10pr rgba(0, 0, 0, 0.2);
  }
}
</style>
