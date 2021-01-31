import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import TrendChart from "vue-trend-chart";

Vue.config.productionTip = false

Vue.use(TrendChart);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
