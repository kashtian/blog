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
        <va-input v-model="info.author" :attr="{maxlength: 20}" arg="name" :errors="errors" tag="作者姓名" />
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

export default {
  name: 'editor',
  path: '/editor',
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

    this.getTypes();
    this.getUserInfo();
  },

  methods: {
    submit() {  
      let content = this.myQuill.getText().replace(/^\n$/, '');
      if (!content) {
        alert('文章内容不能为空')
        return;
      }
      if (this.errors.length) {
        alert(this.errors[0]);
        return;
      }
      this.info.content = this.myQuill.container.firstChild.innerHTML;
      this.info.delta = JSON.stringify(this.myQuill.getContents());

      fetch({
        url: '/api/article/add',
        data: this.info
      }).then(res => {
        if (res.code == 200) {
          alert('添加文章成功')
        } else {
          res.msg && alert(res.msg)
        }
      })
    },

    // 获取文章类型列表
    getTypes() {
      fetch({
        url: '/api/articletype/getall'
      }).then(res => {
        if (res.code == 200) {
          this.types = res.data || [];
          this.types[0] && (this.info.type = this.types[0].name);
        } else {
          res.msg && alert(res.msg)
        }
      })
    },

    // 获取用户信息
    getUserInfo() {
      fetch({
        url: '/api/user/info'
      }).then(res => {
        if (res.code == 200) {
          let data = res.data || {};
          this.info.author = data.name;
          console.log(this.info.author, data)
        } else {
          res.msg && alert(res.msg)
        }
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
