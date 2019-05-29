const state = {
    top: false,
    drawer: false
}

const getters = {
    getTop: state => {
        return state.top
    },
    getDrawer: state => {
        return state.drawer
    }
}

const mutations = {
    setTop(state, top) {
        state.top = top
    },
    setDrawer(state, drawer) {
        state.drawer = drawer
    },
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
}

const actions = {
    setTop(context, top) {
        context.commit('setTop', top)
    },
    setDrawer(context, drawer) {
        context.commit('setDrawer', drawer)
    },
    toggleDrawer(context) {
        context.commit('toggleDrawer')
    },
    toTop() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
