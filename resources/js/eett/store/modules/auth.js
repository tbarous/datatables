const state = {
    auth: {}
}

const getters = {
    getAuth: state => {
        return state.auth
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setData(state, auth){
        state.auth = auth
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

    setData(context, auth){
        context.commit('setData', auth)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
