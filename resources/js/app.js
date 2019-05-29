require('./bootstrap');
window.Vue = require('vue');

import store from './store'
store.dispatch('user/setUser', data.user)
store.dispatch('pages/setPages', data.pages)

import router from './router'


import axios from './api'

import Vuetify from 'vuetify'
Vue.use(Vuetify);
// import 'vuetify/dist/vuetify.min';

import DateRangePicker from '@gravitano/vue-date-range-picker'
Vue.use(DateRangePicker);

import Notifications from 'vue-notification'
Vue.use(Notifications)

import Loading from 'vue-loading-overlay';
Vue.component('loading', Loading);

Vue.component('layout', require('./layouts/Layout.vue').default);


$(document).on('scroll', () => {
    $(window).scrollTop() > 500 ? store.dispatch('ui/setTop', true) : store.dispatch('ui/setTop', false)
})

const app = new Vue({
    router,
    axios,
    store,
    el: '#app'
});
