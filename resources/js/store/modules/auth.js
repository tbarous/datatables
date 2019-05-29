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
    logout() {
        axios.post('/logout').then(response => {
            window.location.href = '/'
        }).catch(e => {
            console.log(e.response.data)
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
