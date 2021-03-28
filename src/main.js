import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$IOTA = require('@iota/core').composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
  });

Vue.prototype.$UTFConverter = require('tryte-utf8-json-codec');
Vue.prototype.$Converter = require('@iota/converter');
Vue.prototype.$MD5 = require('md5');
Vue.prototype.$http = axios

export const globalSettings = new Vue({
  data: {
    refreshTime: 4,
    UseID: false,
    PrivateKey: "",
    PublicKey: "",
    boardAddress:  'DATTTTRALIZEDCHANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    boardName:   'DATTTTRALIZEDCHAN'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
