import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from './router'
import { showPopInfo } from './utils'
import './mock'
import { loading } from '@/directive/loading'
import formatDate from '@/filter/formatdate'
import store from './store'
store.dispatch('globalSet/getData');//刷新页面即可获取数据


Vue.config.productionTip = false
Vue.prototype.$showPopInfo = showPopInfo;


Vue.prototype.$bus = new Vue();//挂载一个事件总线

Vue.directive('loading', loading);//注册全局的自定义指令,用来呈现加载中的效果
Vue.filter('formatDate', formatDate)//注册全局过滤器，用来格式化日期


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
