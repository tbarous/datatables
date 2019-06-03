require('./bootstrap')

window.Vue = require('vue');

import store from './store'
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



import Errors from './components/Form/Errors'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

Vue.component('errors', Errors);

import "./Filters"

store.dispatch('data/setData', data)

const app = new Vue({
    router,
    axios,
    store,
    el: '#app'
});
