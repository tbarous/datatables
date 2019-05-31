import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import user from './modules/user'
import pages from './modules/pages'
import auth from './modules/auth'
import ui from './modules/ui'
import data from './modules/data'
import datatable from './modules/datatable'
import api from './modules/api'
import daterangepicker from './modules/daterangepicker'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    loading,
    user,
    pages,
    auth,
    ui,
    data,
    datatable,
    api,
    daterangepicker
  },
  // strict: debug
  strict: false
})