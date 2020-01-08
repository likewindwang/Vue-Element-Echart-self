import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./icons";

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import "@/assets/static/reset.css";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  
// import axios from 'axios';
// Vue.use(axios);
// Vue.prototype.$http = axios;

Vue.config.productionTip = false;



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
