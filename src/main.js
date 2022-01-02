import Vue from 'vue'
import App from './App.vue'
import "./styles.css"

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

new Vue({
  render: h => h(App),
}).$mount('#app')
