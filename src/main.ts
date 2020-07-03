import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

new Vue({
  // https://stackoverflow.com/questions/57999395/vue-js-error-in-render-typeerror-cannot-read-property-width-of-undefined-v
  // and similar errors fix
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdiSvg',
    },
  }),
  /* */
  router,
  store,
  render: h => h(App)
}).$mount('#app')
