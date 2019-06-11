import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './../store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    store.commit('ui/CLOSE_ALL_DIALOGS');
    store.commit('datatable/RESET_STATE');
    next()
})

export default router
