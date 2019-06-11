require('./bootstrap')

window.Vue = require('vue');

import filter from './filters'
import store from './store'
import router from './router'
import axios from './api'
import Vuetify from 'vuetify'
import DateRangePicker from '@gravitano/vue-date-range-picker'
import Notifications from 'vue-notification'

import Errors from './components/Form/Errors'
import VuejsDialog from 'vuejs-dialog'
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min'
import DatatableMixin from './mixins/DatatableMixin'

Vue.use(DateRangePicker);
Vue.use(Vuetify);
Vue.use(Notifications)
Vue.use(VuejsDialog, {okText: 'Proceed', cancelText: 'Cancel'});

Vue.component('layout', require('./layouts/Layout.vue').default);
Vue.component('errors', Errors);

Vue.mixin(DatatableMixin)

store.commit('auth/SET_DATA', data.auth)
store.commit('user/SET_DATA', data.users)
store.commit('pages/SET_MENU', data.menu)
store.commit('pages/SET_PAGES', data.pages)
store.commit('cells/SET_CELLS', data.cells)

const app = new Vue({router, axios, store, el: '#app'});
