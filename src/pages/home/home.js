import data from './data.json';

export default {
    name: 'home',
    path: '/',
    title: '首页',

    data() {
        return {
            list: data
        }
    }
}