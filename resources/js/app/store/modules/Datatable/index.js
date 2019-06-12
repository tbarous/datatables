import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import * as InitialState from './state'

const state = InitialState.getState()

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}