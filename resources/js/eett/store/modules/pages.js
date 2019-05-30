const state = {
    pages: []
}

const getters = {
    getPages: state => {
        return state.pages
    }
}

const mutations = {
    setData(state, pages) {
        state.pages = pages
    }
}

const actions = {
    setData(context, pages) {
        context.commit('setData', pages)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
