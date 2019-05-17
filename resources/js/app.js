require('./bootstrap');

window.Vue = require('vue');

require('vuetify/dist/vuetify.min');

Vue.component('base-component', require('./components/BaseComponent.vue').default);

import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.use(Vuetify);

axios.create({
  baseURL: 'http://project.local',
  timeout: 1000,
  headers: {'Accept': 'application/json'}
});

const app = new Vue({
    router,
    store,
    axios,
    el: '#app'
});
