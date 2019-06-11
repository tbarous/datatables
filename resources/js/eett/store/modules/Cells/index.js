import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
    cells: {},
    columns: [],
    resourceURL: '',
    selectFilters: []
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
