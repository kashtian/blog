<template>
  <div class="login-page">
    <div>
      <label>请输入用户名：</label>
      <input class="input" type="text" v-model="info.name" />
    </div>
    <div>
      <label>请输入密码：</label>
      <input class="input" type="password" v-model="info.password" />
    </div>
    <button class="submit-btn" @click="submit">登录</button>
  </div>
</template>

<script>
import fetch from 'fetch'

export default {
  name: 'login',
  path: '/login',
  title: '登录',

  data() {
    return {
      info: {
        name: '',
        password: ''
      }
    }
  },

  methods: {
    submit() {
      if (!this.info.name || !this.info.password) {
        alert('用户名或密码不能为空');
        return 
      }
      fetch({
        url: '/api/user/login',
        data: this.info
      }).then(res => {
        if (res.code == 200) {          
          localStorage.token = res.data;
          alert('登录成功')
        } else {
          res.msg && alert(res.msg);
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-page {
  .input {
    border: 1px solid silver;
  }
  .submit-btn {
    margin-top: 20pr;
    padding: 10pr;
    border: 1px solid pink;
  }
}
</style>


