const state = {
    users: {},
    columns: [],
    resourceURL: ''
}

const getters = {
    getData: state => {
        return state.users
    },
    getResourceURL: state => {
        return state.resourceURL
    },
    getColumns: state => {
        return state.columns
    },
}

const mutations = {
    setData(state, users){
        state.users = users
        state.columns = users.columns
        state.resourceURL = users.url
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
