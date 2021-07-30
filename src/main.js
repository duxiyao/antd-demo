import Vue from 'vue'
// import Antd from 'ant-design-vue';
import App from './App.vue'
// import 'ant-design-vue/dist/antd.css';

import { Button, message } from 'ant-design-vue';

Vue.config.productionTip = false

/* v1.1.2 */
// Vue.component(Button.name, Button);
// Vue.component(Button.Group.name, Button.Group);

/* v1.1.3+ 自动注册Button下组件，如Button.Group */
Vue.use(Button);

Vue.prototype.$message = message;

// Vue.use(Antd);
new Vue({
  render: h => h(App),
}).$mount('#app')
