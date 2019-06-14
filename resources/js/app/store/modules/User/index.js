import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
    crud: [],
    columns: [],
    resourceURL: '',
    // forms: [],
    files: []
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}