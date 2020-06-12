<template>
  <div class="pull-box">
    <div class="content" :style="styleObj">
      <div class="refresh" v-if="topFn">{{topLabel}}</div>
      <slot></slot>
      <div class="load" v-if="bottomFn">{{bottomLabel}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loadmore',

  props: {
    topFn: Function,
    bottomFn: Function,
    options: Object,
    noMore: Boolean,
    scrollLoad: Boolean
  },

  data() {
    return {
      dis: 0,
      styleObj: {},
      topLabel: '',
      bottomLabel: '',
      topStatus: '',
      bottomStatus: '',
      opts: Object.assign({
        minDis: 80,
        maxDis: 150,
        topText: '下拉刷新',
        topLoadingText: '加载中...',
        topDropText: '释放刷新',
        bottomText: '上拉加载',
        bottomLoadingText: '加载中...',
        bottomDropText: '释放加载'
      }, this.options)
    }
  },

  watch: {
    topStatus(val) {
      if (!val) {
        this.topLabel = ''
        return
      }
      switch (val) {
        case 'pull':
          this.topLabel = this.opts.topText
          break
        case 'drop':
          this.topLabel = this.opts.topDropText
          break
        case 'loading':
          this.topLabel = this.opts.topLoadingText
          break
      }
    },

    bottomStatus(val) {
      if (!val) {
        this.bottomLabel = ''
        return
      }
      switch (val) {
        case 'pull':
          this.bottomLabel = this.opts.bottomText
          break
        case 'drop':
          this.bottomLabel = this.opts.bottomDropText
          break
        case 'loading':
          this.bottomLabel = this.opts.bottomLoadingText
          break
      }
    }
  },

  mounted() {
    this.scrollTarget = this.getScrollTarget(this.$el)
    this.bindEvents()
  },

  beforeDestroy() {
    this.removeEvents()
  },

  methods: {
    // 绑定相应事件
    bindEvents() {
      if (this.scrollLoad) {
        this.scrollTarget.addEventListener('scroll', this.scroll)
      } else {
        this.$el.addEventListener('touchstart', this.start)
        this.$el.addEventListener('touchmove', this.move)
        this.$el.addEventListener('touchend', this.end)
      }
    },

    // 移除相应事件
    removeEvents() {
      if (this.scrollLoad) {
        this.scrollTarget.removeEventListener('scroll', this.scroll)
      } else {
        this.$el.removeEventListener('touchstart', this.start)
        this.$el.removeEventListener('touchmove', this.move)
        this.$el.removeEventListener('touchend', this.end)
      }
    },

    isTop(y) {
      return this.getScrollTop() == 0 && y > this.y0 && this.topFn
    },

    isBottom(y) {
      return this.checkBottomReached() && y < this.y0 && this.bottomFn && !this.noMore
    },

    // 检查元素是否已经滚动到底部
    checkBottomReached() {
      if (this.scrollTarget === window) {
        return this.getScrollTop() === document.documentElement.scrollHeight - document.documentElement.clientHeight
      } else {
        return this.$el.getBoundingClientRect().bottom <= this.scrollTarget.getBoundingClientRect().bottom + 1
      }
    },

    // 获取真正的滚动元素，直到查找到body
    getScrollTarget(el) {
      let currentNode = el
      while (currentNode && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = window.getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
          return currentNode
        }
        currentNode = currentNode.parentNode
      }
      // 返回window, 好绑定scroll事件
      return window
    },

    // 获取滚动元素的scrollTop
    getScrollTop() {
      if (this.scrollTarget === window) {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      } else {
        return this.scrollTarget.scrollTop
      }
    },

    start(event) {
      this.y0 = event.touches[0].pageY
    },

    move(event) {
      if (this.topStatus == 'loading' || this.bottomStatus == 'loading') {
        return
      }
      let y = event.touches[0].pageY
      if (!(this.isTop(y) || this.isBottom(y))) {
        return
      }
      event.preventDefault()
      this.dis = (y - this.y0) / 2
      if (Math.abs(this.dis) > this.opts.maxDis) {
        this.dis = this.dis > 0 ? this.opts.maxDis : -this.opts.maxDis
      }
      this.setStauts(this.dis)
      this.setScroll()
    },

    end() {
      if (this.topFn && this.dis > 0) {
        if (this.dis >= this.opts.minDis) {
          this.topStatus = 'loading'
          this.dis = 30
          this.setScroll()
          this.topFn()
        } else {
          this.reset()
        }
      }
      if (this.bottomFn && this.dis < 0) {
        if (!this.scrollLoad && Math.abs(this.dis) >= this.opts.minDis) {
          this.bottomStatus = 'loading'
          this.dis = -30
          this.setScroll()
          this.bottomFn()
        } else {
          this.reset()
        }
      }
    },

    scroll() {
      if (this.scrollLoad && this.bottomFn && !this.noMore && this.bottomStatus != 'loading' && this.checkBottomReached()) {
        this.bottomStatus = 'loading'
        this.dis = -30
        this.setScroll()
        this.bottomFn()
      }
    },

    onLoaded() {
      this.reset()
    },

    reset() {
      this.topStatus = ''
      this.bottomStatus = ''
      this.dis = 0
      this.setScroll()
    },

    setScroll() {
      this.styleObj = {
        transform: this.dis === 0 ? null : `translateY(${this.dis}px)`
      }
    },

    setStauts(dis) {
      if (dis > 0) {
        if (dis >= this.opts.minDis) {
          this.topStatus = 'drop'
        } else {
          this.topStatus = 'pull'
        }
      }
      if (dis < 0) {
        if (Math.abs(dis) >= this.opts.minDis) {
          this.bottomStatus = 'drop'
        } else {
          this.bottomStatus = 'pull'
        }
      }
    }
  }
}
</script>

<style lang="less">
.pull-box {
  overflow: hidden;
  .refresh,
  .load {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
  }
  .refresh {
    margin-top: -30px;
  }
  .load {
    margin-bottom: -30px;
  }
}
</style>
