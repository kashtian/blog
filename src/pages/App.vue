<template>
  <div id="app">
      <loading /> 
      <router-view></router-view>
  </div>
</template>

<style lang="less">
html,body {
    margin: 0px;
    height: 100%;
}

#app {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  code,
  pre {
    display: block !important;
    padding: 20pr 30pr !important;
    background-color: #272822 !important;
  }
}

// body {
//     background-image: linear-gradient(90deg, #f58997, #b684f7 15%, #79e6e6 35%, #7fe679 55%, #eae75d 75%, #ea8c5d 90%, #f58997);
//     background-size: 300% 100%;
//     animation: changecolor 120s infinite linear;   
// }

// @keyframes changecolor {
//     0% {
//         background-position: 0% 0;
//     }
//     100% {
//         background-position: 150% 0;
//     }
// }
</style>

<script>
import tools from '../utils/tools';
import { Loading } from '../components'

export default {
    name: 'app',

    components: {
      Loading
    },

    mounted() {
        if (tools.isIOS() || tools.isAndroid()) {
            window.onresize = function() {
                let width = document.documentElement.clientWidth || document.body.clientWidth;
                let size = width / 375 * 16
                document.documentElement.style.fontSize = (size >= 32 ? 32 : size) + 'px';
            }
        }
    }
}
</script>
