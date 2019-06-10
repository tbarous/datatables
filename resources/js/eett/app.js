require('./bootstrap')

window.Vue = require('vue');

import "./filters"
import store from './store'
import router from './router'
import axios from './api'

import Vuetify from 'vuetify'
Vue.use(Vuetify);

import DateRangePicker from '@gravitano/vue-date-range-picker'
Vue.use(DateRangePicker);

import Notifications from 'vue-notification'
Vue.use(Notifications)

import Loading from 'vue-loading-overlay';
Vue.component('loading', Loading);
Vue.component('layout', require('./layouts/Layout.vue').default);

import Errors from './components/Form/Errors'
Vue.component('errors', Errors);

import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
Vue.use(VuejsDialog, {
	okText: 'Proceed',
	cancelText: 'Cancel'
});

store.commit('auth/SET_DATA', data.auth)
store.commit('user/SET_DATA', data.users)
store.commit('pages/SET_MENU', data.menu)
store.commit('pages/SET_PAGES', data.pages)

const app = new Vue({
    router,
    axios,
    store,
    el: '#app'
});
