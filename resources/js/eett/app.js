require('./bootstrap')

window.Vue = require('vue');

import "./Filters"
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
Vue.component('layout', require('./Layouts/Layout.vue').default);

import Errors from './components/Form/Errors'
Vue.component('errors', Errors);

$(document).on('scroll', () => {
    $(window).scrollTop() > 500 ? store.commit('ui/SET_TOP', true) : store.commit('ui/SET_TOP', false)
})

store.commit('auth/SET_DATA', data.auth)
store.commit('user/SET_DATA', data.users)
store.commit('pages/SET_DATA', data.pages)

const app = new Vue({
    router,
    axios,
    store,
    el: '#app'
});
