import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import * as DS from './defaultState.js'
const state = DS.defaultState()

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}