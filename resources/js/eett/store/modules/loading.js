const state = {
    loading: false
}

const getters = {
    getLoading: state => {
        return state.loading
    }
}

const mutations = {
    setLoading(state, loading) {
        state.loading = loading
    }
}

const actions = {
    setLoading(context, loading) {
        context.commit('setLoading', loading)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
