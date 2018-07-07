<template>
  <div class="pull-box">
    <div class="refresh" v-if="topFn" :style="styleObj">{{topLabel}}</div>
    <div class="content" :style="styleObj" ref="content" @touchstart="start" @touchmove="move" @touchend="end">
      <slot></slot>
    </div>
    <div class="load" v-if="bottomFn" :style="styleObj">{{bottomLabel}}</div>
  </div>
</template>

<script>
export default {
  name: 'pull',

  props: {
    topFn: Function,
    bottomFn: Function,
    options: Object,
    noMore: Boolean
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
        minDis: 50,
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

  methods: {
    start(event) {
      let el = this.$refs.content
      if (el.scrollTop == 0) {
        this.isTop = true
      } else if (el.scrollTop == (el.scrollHeight - el.offsetHeight)) {
        this.isBottom = true
      }
      this.y0 = event.touches[0].pageY   
    },

    move(event) {
      if (this.topStatus == 'loading' || this.bottomStatus == 'loading') {
        return
      }
      let y = event.touches[0].pageY
      if (!((this.isTop && y > this.y0 && this.topFn) || (this.isBottom && y < this.y0 && this.bottomFn && !this.noMore))) {
        return
      }
      event.preventDefault()
      this.dis = (y - this.y0) / 2
      if (Math.abs(this.dis) > this.opts.maxDis) {
        this.dis = this.dis > 0 ? this.opts.maxDis : -this.opts.maxDis
      }
      this.setStauts(Math.abs(this.dis))
      this.setScroll()
    },

    end() {
      if (this.dis == 0) {
        return
      }
      if (this.isTop && this.topFn) {
        if (Math.abs(this.dis) >= this.opts.minDis) {
          this.topStatus = 'loading'
          this.topFn()
        } else {
          this.reset()
        }
      }
      if (this.isBottom && this.bottomFn) {
        if (Math.abs(this.dis) >= this.opts.minDis) {
          this.bottomStatus = 'loading'
          this.bottomFn()
        } else {
          this.reset()
        }
      }
    },

    onLoaded() {
      this.reset()
    },

    reset() {
      this.isTop = false
      this.isBottom = false
      this.topStatus = ''
      this.bottomStatus = ''
      this.dis = 0
      this.setScroll()
    },

    setScroll() {
      this.styleObj = {
        transform: `translateY(${this.dis}px)`
      }
    },

    setStauts(dis) {
      if (this.isTop) {
        if (dis > this.opts.minDis) {
          this.topStatus = 'drop'
        } else {
          this.topStatus = 'pull'
        }
      }
      if (this.isBottom) {
        if (dis > this.opts.minDis) {
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
  position: relative;
  overflow: hidden;
  .refresh {
    position: absolute;
    width: 100%;
    height: 40pr;
    top: 0px;
    left: 0px;
    margin-top: -40pr;
    text-align: center;
  }
  .load {
    position: absolute;
    width: 100%;
    height: 40pr;
    margin-bottom: -40pr;
    bottom: 0px;
    left: 0px;
    text-align: center;
  }
  .content {
    height: 100%;
    overflow: auto;
  }
}
</style>
