// window._ = require('lodash');

// try {
    // window.Popper = require('popper.js').default;
    // window.$ = window.jQuery = require('jquery');
// } catch (e) {}

require('bootstrap');

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

