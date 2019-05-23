require('./bootstrap');

window.Vue = require('vue');
Vue.component('layout', require('./layouts/Layout.vue').default);

import Vuetify from 'vuetify'
import router from './router'
import axios from 'axios'

require('vuetify/dist/vuetify.min');
Vue.use(Vuetify);

import DateRangePicker from "@gravitano/vue-date-range-picker";
Vue.use(DateRangePicker);

axios.create({
  baseURL: 'http://project.local',
  timeout: 1000,
  headers: {'Accept': 'application/json'},
  timeout: 3000,
});

const app = new Vue({
    router,
    axios,
    el: '#app'
});
