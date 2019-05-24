const state = {
    user: {}
}

const getters = {
    getUser: state => {
        return state.user
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

const actions = {
    setUser(context, user) {
        context.commit('setUser', user)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
