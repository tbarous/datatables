require('./bootstrap');
window.Vue = require('vue');

import router from './router'
import store from './store'
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

const app = new Vue({
    router,
    axios,
    store,
    el: '#app'
});
