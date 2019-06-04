import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/User'
import pages from './modules/Page'
import auth from './modules/Auth'
import ui from './modules/UI'
import datatable from './modules/Datatable'
import daterangepicker from './modules/Daterangepicker'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    pages,
    auth,
    ui,
    datatable,
    daterangepicker
  },
  // strict: debug
  strict: false
})