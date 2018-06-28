<template>
  <div class="test-page">
    <pull />
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
    }
  },
}
</script>

<style lang="less">
.test-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
