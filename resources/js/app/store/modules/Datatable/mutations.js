import _ from 'lodash'
import * as InitialState from './state'

export default {
    CLEAR_ERROR: (state, title) => state.errors[title] = '',
    SET_COLUMNS: (state, columns) => state.columns = columns,
    START_LOADING: state => state.loading = true,
    STOP_LOADING: state => state.loading = false,
    SET_RESOURCE_URL: (state, resourceURL) => state.resourceURL = resourceURL,
    SET_GENERAL_SEARCH: (state, generalSearch) => state.generalSearch = generalSearch,
    SET_PER_PAGE: (state, perPage) => state.perPage = perPage,
    SET_OPTIONS: (state, options) => state.options = options,
    SET_PICKER: (state, payload) => {},
    // SET_QUERIES: (state, queries) => state.queries = queries,
    // SET_ACTIVE_COLUMNS: (state, activeColumns) => state.activeColumns = activeColumns,
    // EMPTY_QUERY: (state, title) => state.queries[title] = '',
    RESET_STATE: (state) => Object.assign(state, InitialState.getState()),
    SET_ADDING_ROW: (state, row) => state.addingRow = row,
    SET_EDITING_ROW: (state, editingRow) => Object.assign(state.editingRow, editingRow),


    SET_DATATABLE: (state, {resourceURL, columns, filters}) => {
        state.resourceURL = resourceURL
        state.columns = columns 
        state.filters = filters
    },

    TOGGLE_ALL(state){
        state.selectAll = !state.selectAll
        state.tableData.forEach(item => {
            if(state.selected.indexOf(item.id) == -1 && state.selectAll) 
                state.selected.push(item.id)
            if(state.selected.indexOf(item.id) != -1 && !state.selectAll) 
                state.selected.splice(state.selected.indexOf(item.id), 1)
        })
    },
    CHANGE_PAGE: (state, pageNumber) => {
        state.currentPage = pageNumber
        state.selectAll = false
    },
    SORT_BY_COLUMN(state, column) {
        if (column.title === state.sortedColumn) {
            state.order = (state.order === 'asc') ? 'desc' : 'asc'
        } else {
            state.sortedColumn = column.title
            state.order = 'asc'
        }
    },
    SELECT: (state, item) => state.selected.includes(item.id) ? state.selected.splice(state.selected.indexOf(item.id), 1) : state.selected.push(item.id),
    CLEAR_FILTERS: state => {
        state.columns.forEach(item => item.query = '')
        state.generalSearch = ''
    },
    PREPARE_FOR_FETCH: (state, reset) => {
        if (reset) state.currentPage = 1
        state.generalSearch = state.generalSearch == null ? '' : state.generalSearch
        state.dataFetchUrl = `/${state.resourceURL}?page=${state.currentPage}&column=${state.sortedColumn}&order=${state.order}&per_page=${state.perPage}&search=${state.generalSearch}`
    },

    // API
    FETCH_DATA: _.debounce((state) => {
        state.columns.forEach(item => state.dataFetchUrl += '&' + item.title + '=' + item.query)
        axios.get(state.dataFetchUrl)
            .then(({ data }) => {
                state.pagination = data
                state.tableData = data.data
                state.loading = false
            }).catch(error => {
                state.loading = false
            })
    }, 500),

    ADD: (state, {resolve, reject}) => {
        axios.post(`${state.resourceURL}`, {
            row: JSON.stringify(state.addingRow)
        })
        .then(response => resolve(response))
        .catch(error => {
            state.errors = error.response.data.errors
            reject(error)
        })
    },

    UPDATE: (state, {resolve, reject}) => {
        axios.put(`${state.resourceURL}/${state.editingRow.id}`, {
            row: JSON.stringify(state.editingRow)
        })
        .then(response => resolve(response))
        .catch(error => {
            state.errors = error.response.data.errors
            reject(error)
        })
    },

    DESTROY: (state, {resolve, reject, id}) => {
        axios.delete(`${state.resourceURL}/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    },

    UPDATE_MULTIPLE: (state, {resolve, reject}) => {
        axios.post(state.resourceURL + '/update-many', {
            selected: JSON.stringify(state.selected),
            row: JSON.stringify(state.editingMultipleRow)
        })
        .then(response => resolve(response))
        .catch(error => {
            state.errors = error.response.data.errors
            reject(error)
        })
    }
}