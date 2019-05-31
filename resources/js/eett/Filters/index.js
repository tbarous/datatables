import Vue from "vue"

Vue.filter("columnHead", str => str.split('_').join(' ').toUpperCase())
Vue.filter("columnLow", str => str.split('_').join(' ').toLowerCase())