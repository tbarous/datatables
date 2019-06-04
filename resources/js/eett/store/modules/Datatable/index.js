import _ from 'lodash'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
    dataFetchUrl: '',
    resourceURL: '',
    columns: {},
    loading: false,
    pagination: { meta: { to: 1, from: 1 } },
    offset: 4,
    currentPage: 1,
    perPage: 15,
    order: 'desc',
    itemsShow: [15, 50, 100],
    sortedColumn: 'updated_at',
    selectAll: false,
    generalSearch: '',
    tableData: [],
    queries: {},
    activeColumns: {},
    selected: [],
    selectBoxes: {},
    editingRow: {},
    editingMultipleRow: {}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}