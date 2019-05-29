const state = {
    pages: []
}

const getters = {
    getPages: state => {
        return state.pages
    }
}

const mutations = {
    setPages(state, pages) {
        state.pages = pages
    }
}

const actions = {
    setPages(context, pages) {
        context.commit('setPages', pages)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
