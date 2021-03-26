import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$IOTA = require('@iota/core').composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
  });

Vue.prototype.$UTFConverter = require('tryte-utf8-json-codec');
Vue.prototype.$Converter = require('@iota/converter');
Vue.prototype.$MD5 = require('md5');

export const globalSettings = new Vue({
  data: {
    refreshTime: 4,
    UseID: false,
    PrivateKey: "",
    boardAddress:  'DATTTTRALIZEDCHANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    boardName:   'DATTTTRALIZEDCHAN'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
