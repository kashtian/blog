<template>
  <div class="pull-box">
    <div class="refresh" :style="styleObj">{{topLabel}}</div>
    <div class="content" :style="styleObj" ref="content" @touchstart="start" @touchmove="move" @touchend="end">
      <slot></slot>
    </div>
    <div class="load" :style="styleObj">{{bottomLabel}}</div>
  </div>
</template>

<script>
export default {
  name: 'pull',

  data() {
    return {
      dis: 0,
      minDis: 50,
      maxDis: 150,
      styleObj: {},
      topLabel: '下拉刷新',
      bottomLabel: '上拉加载'
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
      let y = event.touches[0].pageY
      if (!(this.isTop && y > this.y0 || (this.isBottom && y < this.y0))) {
        return
      }
      event.preventDefault()
      this.dis = (y - this.y0) / 2
      if (Math.abs(this.dis) > this.maxDis) {
        this.dis = this.dis > 0 ? this.maxDis : -this.maxDis
      }
      this.setLabel(Math.abs(this.dis))
      this.setScroll()
    },

    end() { 
      this.isTop = false
      this.isBottom = false
      this.dis = 0
      this.setScroll()
    },

    setScroll() {
      this.styleObj = {
        transform: `translateY(${this.dis}px)`
      }
    },

    setLabel(dis) {
      if (this.isTop) {
        if (dis > this.minDis) {
          this.topLabel = '释放刷新'
        } else {
          this.topLabel = '下拉刷新'
        }
      }
      if (this.isBottom) {
        if (dis > this.minDis) {
          this.bottomLabel = '释放加载'
        } else {
          this.bottomLabel = '上拉加载'
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
