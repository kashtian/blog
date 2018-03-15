export default {
  isIOS() {
      let UA = window.navigator.userAgent.toLowerCase();
      return UA && /iphone|ipad|ipod|ios/.test(UA);
  },

  isAndroid() {
      let UA = window.navigator.userAgent.toLowerCase();
      return UA && UA.indexOf('android') > 0;
  },

  // 格式化日期，fmt: yyyy-MM-dd hh:mm:ss
	formatDate(date, fmt) {
		if (!date || !fmt || !(date instanceof Date)) {
			return ''
		}
		let tObj = {
			M: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			m: date.getMinutes(),
			s: date.getSeconds()
		}
		fmt = fmt.replace(/y+/, date.getFullYear());
		for (let key in tObj) {
			if (new RegExp(`(${key}+)`).test(fmt)) {
				if (RegExp.$1.length == 1) {
					fmt = fmt.replace(RegExp.$1, tObj[key])
				} else {
					fmt = fmt.replace(RegExp.$1, ('00' + tObj[key]).slice((tObj[key] + '').length))
				}
			}
		}
		return fmt;
  }
  
}
