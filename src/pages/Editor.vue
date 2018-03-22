<template>
  <div class="editor-page">
    <div id="myEditor"></div>

    <div class="bottom">
      <div>
        <label>标题</label>
        <va-input v-model="info.title" :attr="{maxlength: 50}" arg="name" :errors="errors" tag="标题" />
      </div>
      <div>
        <label>作者</label>
        <va-input :readonly="true" v-model="info.author" :attr="{maxlength: 20}" arg="name" :errors="errors" tag="作者姓名" />
      </div>
      <div>
        <label>文章类型</label>
        <select v-model="info.type">
          <option v-for="item in types" :key="item._id">{{item.name}}</option>
        </select>
      </div>
      <div>
        <label>发布文章</label>
        <input type="checkbox" v-model="info.publish" />
      </div>
      <button class="submit" @click="submit">提交</button>
    </div>

  </div>
</template>

<script>
let Quill;
import { VaInput } from '../components'
import fetch from 'fetch'

export default {
  name: 'editor',
  path: '/editor/:id?',
  title: '编辑器',

  components: {
    VaInput
  },

  data() {
    return {
      info: {
        author: '',
        type: '',
        title: '',
        publish: false
      },
      errors: [],
      types: []
    }
  },

  mounted() {
    if (!localStorage.token) {
      this.$router.replace('/login')
      return;
    }

    Quill = require('quill');    
    this.initEditor(); 

    if (this.$route.params.id) {
      this.$store.dispatch('GET_ARTICLE', this.$route.params)
        .then(info => {
          if (info) {
            this.info = info;
            this.myQuill.setContents(info.delta)
          }
        })
    } else {
      this.getUserInfo();
    }

    this.getTypes();
  },

  methods: {
    submit() {
      if (this.myQuill.getLength() <= 1) {
        alert('文章内容不能为空')
        return;
      }
      if (this.errors.length) {
        alert(this.errors[0]);
        return;
      }
      this.info.content = this.myQuill.container.firstChild.innerHTML;
      this.info.delta = this.myQuill.getContents();

      if (this.$route.params.id) {
        this.update()
      } else {
        this.checkTitLe()
      }
    },

    // 增加文章的时候检查文章标题是否存在
    checkTitLe() {
      fetch({
        url: '/api/article/checkTitle',
        data: {
          title: this.info.title
        }
      }).then(res => {
        if (res.data.length > 0) {
          let dialog = confirm('您已创建过相同标题的文章，仍然继续创建吗？')
          if (dialog) {
            this.add();
          }
        } else {
          this.add();
        }
      })
    },

    add() {
      fetch({
        url: '/api/article/add',
        data: this.info
      }).then(res => {
        alert('添加文章成功')
      }).catch(err => {
        alert(err.message)
      })
    },

    update() {
      this.info.id = this.info._id
      fetch({
        url: '/api/article/update',
        data: this.info
      }).then(res => {
        alert('修改文章成功')
      }).catch(err => {
        alert(err.message)
      })
    },

    // 获取文章类型列表
    getTypes() {
      fetch({
        url: '/api/articletype/getall'
      }).then(res => {
        this.types = res.data || [];          
        (this.types[0] && !this.info.type) && (this.info.type = this.types[0].name);
      }).catch(err => {
        alert(err.message)
      })
    },

    // 获取用户信息
    getUserInfo() {
      fetch({
        url: '/api/user/info'
      }).then(res => {
        let data = res.data || {};
        this.info.author = data.name;
      }).catch(err => {
        alert(err.message)
      })
    },

    initEditor() {
      let toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'],

        ['clean']                                         // remove formatting button
      ];

      this.myQuill = new Quill('#myEditor', {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        }
      })
    },

  }
}
</script>

<style src="quill/dist/quill.snow.css"></style>

<style lang="less">
.editor-page {
  height: 100%;
  #myEditor {
    height: 70%;
  }
  .bottom {
    margin-top: 10pr;
    text-align: center;
  }
}
</style>
