import store from './../../store'

const state = {}
const getters = {}
const mutations = {}

const actions = {
    setData({ commit, dispatch }) {
        store.dispatch('user/setUser', data.user)
        store.dispatch('pages/setPages', data.pages)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
