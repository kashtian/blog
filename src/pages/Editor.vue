<template>
  <div class="editor-page">
    <div id="toolbar"></div>
    <div id="myEditor"></div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
let Quill;

export default {
  name: 'editor',
  path: '/editor',
  title: '编辑器',

  mounted() {
    if (!localStorage.token) {
      this.$router.replace('/login')
      return;
    }

    Quill = require('quill');
    
    this.initEditor();    
  },

  methods: {
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

    submit() {  
      console.log('contents---->', this.myQuill.container.firstChild.innerHTML)
    }

  }
}
</script>

<style src="quill/dist/quill.snow.css"></style>

<style lang="less">
.editor-page {
  height: 100%;
  #myEditor {
    height: 80%;
  }
}
</style>

