import * as DS from './defaultState.js'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = DS.defaultState()

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}