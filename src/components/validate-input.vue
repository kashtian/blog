<template>
  <textarea v-if="type == 'textarea'"
    ref="el"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    v-model="curVal"
    @change="change">    
  </textarea>
  <input v-else 
    ref="el"
    :type="type"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    v-model="curVal"
    @change="change" />
</template>

<script>
export default {
  name: 'va-input', 

  props: {
    type: {
      type: String,
      default: 'text'
    },
    id: String,
    name: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    attr: Object,
    value: '',
    errors: Array,
    arg: String,
    tag: String,
    msg: String,
    field: String
  },

  data() {
    return {
      curVal: this.value
    }
  },

  watch: {
    value(val) {
      if (this.inputed) {
        this.inputed = false;
        return;
      }
      this.curVal = val;
      this.updateOnChange()
    },

    curVal(val) {
      this.inputed = true;
      this.$emit('input', val)
    }
  },

  created() {
    this.initErrors()
  },

  mounted() {
    this.setAttrs();
  },

  methods: {
    setAttrs() {
      for (let key in this.attr) {
        this.$refs.el.setAttribute(key, this.attr[key])
      }
    },

    initErrors() {
      if (!this.errors.order) {
        this.errors.order = {};
      }
      this.errmsg = this.msg || ((this.tag || '') + errorMsgs[this.arg]);
      this.errors.order[this.field || this.errmsg] = this.field ? this.errmsg : true;
      setErrors(this.errors, this.errors.order)
    },

    updateOnChange() {
      if ((this.arg == 'noempty' && !this.curVal) || (regexs[this.arg] && !regexs[this.arg].test(this.curVal))) {
        this.errors.order[this.field || this.errmsg] = this.field ? this.errmsg : true;        
      } else {
        this.errors.order[this.field || this.errmsg] = false;
      }
      setErrors(this.errors, this.errors.order);
    },

    change() {
      this.$emit('change', this.curVal);
      this.updateOnChange();
    }
  }
}

let regexs = {
  name: /^[\u4e00-\u9fa5|\w]+$/,
  password: /^[\w!@#\$%\^&\*]{6,20}$/,
  email: /^\w+@\w+\.\w{2,4}$/
}

let errorMsgs = {
  name: '只支持中文，字母，数字，下划线',
  password: '密码为数字，字母，下划线及!,@,#,$,%,^,&,*组成的6-20个字符',
  email: '邮件格式错误',
  noempty: '不能为空'
}

function setErrors(arr, obj) {
  arr.length = 0;
  arr.pop();
  for (let key in obj) {
    if (obj[key]) {
      arr.push(typeof obj[key] == 'boolean' ? key : obj[key])
    }
  }
}
</script>
