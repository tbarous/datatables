import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
    loading: false,
    top: false,
    drawer: true,
    viewDialog: false,
    updateDialog: false,
    updateMultipleDialog: false,
    notification: false
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
