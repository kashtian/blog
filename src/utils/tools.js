export default {
    isIOS() {
        let UA = window.navigator.userAgent.toLowerCase();
        return UA && /iphone|ipad|ipod|ios/.test(UA);
    },

    isAndroid() {
        let UA = window.navigator.userAgent.toLowerCase();
        return UA && UA.indexOf('android') > 0;
    }
}