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
  for (let key in obj) {
    if (obj[key]) {
      arr.push(typeof obj[key] == 'boolean' ? key : obj[key])
    }
  }
}

let validate = {
  bind(el, binding, vnode) {
    if (!Array.isArray(binding.value)) {
      console.log('请绑定数组')
      return;
    }
    let field = el.getAttribute('field') || '';
    let msg = el.getAttribute('msg') || ((el.getAttribute('tag') || '') + errorMsgs[binding.arg]);
    if (!binding.value.order) {
      binding.value.order = {}
    }
    binding.value.order[field || msg] = field ? msg : true;
    setErrors(binding.value, binding.value.order);
    el.addEventListener('change', () => {
      if ((binding.arg == 'noempty' && !el.value) || (regexs[binding.arg] && !regexs[binding.arg].test(el.value))) {
        binding.value.order[field || msg] = field ? msg : true;        
      } else {
        binding.value.order[field || msg] = false;
      }
      setErrors(binding.value, binding.value.order);
    })
  }  
}

module.exports = (Vue) => Vue.directive('validate', validate)
