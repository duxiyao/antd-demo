import Vue from 'vue'
// import Antd from 'ant-design-vue';
import App from './App.vue'
import coreBus from "./event-bus"

// import 'ant-design-vue/dist/antd.css';

import {Button, message} from 'ant-design-vue';

import router from './router'

Vue.config.productionTip = false

/* v1.1.2 */
// Vue.component(Button.name, Button);
// Vue.component(Button.Group.name, Button.Group);

/* v1.1.3+ 自动注册Button下组件，如Button.Group */
Vue.use(Button);

Vue.prototype.$message = message;

// Vue.use(Antd);
new Vue({
    router,
    render: h => h(App),
    mounted() {
        let that = this
        coreBus.$on('msg:tips', (data) => {
            that.$message.info(data.msg);
        });
        coreBus.$on('error:tips', (data) => {
            that.$message.error(data.msg);
        });
    },
    beforeDestroy() {
        coreBus.$off('msg:tips')
        coreBus.$off('error:tips')
    },
}).$mount('#app')
