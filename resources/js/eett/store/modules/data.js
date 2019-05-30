import store from './../../store'

const state = {}
const getters = {}
const mutations = {}

const actions = {
    setData({ commit, dispatch }) {
        store.dispatch('auth/setData', data.auth)
        store.dispatch('user/setData', data.users)
        store.dispatch('pages/setData', data.pages)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
