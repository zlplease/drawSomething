import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './socket/index'
import VueKonva from 'vue-konva'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueKonva)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
