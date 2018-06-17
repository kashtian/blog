<template>
  <div class="login-page">
    <form class="login-form">
      <div class="form-row">
        <label>请输入用户名：</label>
        <input class="input" type="text" v-model="info.name" />
      </div>
      <div class="form-row">
        <label>请输入密码：</label>
        <input class="input" type="password" v-model="info.password" />
      </div>
      <button class="submit-btn" @click.prevent="submit">登录</button>
    </form>
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
        localStorage.token = res.data;
        alert('登录成功')
        this.$router.push('/my')
      }).catch(err => {
        alert(err.message)
      })
    }
  }
}
</script>

<style lang="less">
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login-form {
    padding: 50pr;
    background-color: #b1eefb;
    border-radius: 10pr;
    text-align: center;
  }
  .form-row {
    margin-bottom: 20pr;
  }
  .input {
    padding: 8pr;
    border: 1px solid silver;
  }
  .submit-btn {
    width: 300pr;
    margin-top: 20pr;
    padding: 10pr;
    background-color: pink;
    border-radius: 8pr;
    border: none;
    outline: none;
  }
}
</style>
