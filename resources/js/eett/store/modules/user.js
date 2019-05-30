const state = {
    users: {}
}

const getters = {
    getData: state => {
        return state.users
    },
    getURL: state => {
        return state.users.url
    },
    getColumns: state => {
        return state.users.columns
    },
}

const mutations = {
    setData(state, users){
        state.users = users
    }
}

const actions = {
    setData(context, users){
        context.commit('setData', users)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
