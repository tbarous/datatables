require('./bootstrap')

window.Vue = require('vue');

import Vuetify from 'vuetify'

import axios from './api'
Vue.use(Vuetify);

Vue.component('Login', require('./views/Login.vue').default)
const app = new Vue({axios, el: '#app'})
