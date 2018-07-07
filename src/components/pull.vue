<template>
  <div class="pull-box">
    <div class="content" :style="styleObj" ref="content" @touchstart="start" @touchmove="move" @touchend="end" @scroll="scroll">
      <div class="refresh" v-if="topFn">{{topLabel}}</div>
      <slot></slot>
      <div class="load" v-if="bottomFn">{{bottomLabel}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pull',

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
        bottomDropText: '释放加载',
      }, this.options)
    }
  },

  watch: {
    topStatus(val) {
      if (!val) {
        this.topLabel = ''
        return
      }
      switch(val) {
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
      switch(val) {
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
    this.el = this.$refs.content
  },

  methods: {
    start(event) {
      this.y0 = event.touches[0].pageY
    },

    isTop(y) {
      return this.el.scrollTop == 0 && y > this.y0 && this.topFn
    },

    isBottom(y) {
      return this.el.scrollTop == (this.el.scrollHeight - this.el.offsetHeight) && y < this.y0 && this.bottomFn && !this.noMore
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
      if (this.el.scrollTop == (this.el.scrollHeight - this.el.offsetHeight)) {
        if (this.bottomFn && this.scrollLoad && !this.noMore && this.bottomStatus != 'loading') {
          this.bottomStatus = 'loading'
          this.dis = -30
          this.setScroll()
          this.bottomFn()
        }
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
        transform: `translateY(${this.dis}px)`,
        overflow: this.dis > 0 ? 'visible' : 'auto'
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
  flex: 1;
  overflow: hidden;
  .refresh, .load {    
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
  .content {
    height: 100%;
    overflow: auto;
  }
}
</style>
