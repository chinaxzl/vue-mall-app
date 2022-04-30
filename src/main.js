import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue';
import 'lib-flexible';
import router from "@/router"
import "./styles/global.less";
import store from "@/store";
Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
