import _ from 'lodash'
import * as DS from './defaultState.js'

export default {
    CLEAR_ERROR: (state, title) => state.errors[title] = '',
    SET_COLUMNS: (state, columns) => state.columns = columns,
    START_LOADING: state => state.loading = true,
    STOP_LOADING: state => state.loading = false,
    SET_RESOURCE_URL: (state, resourceURL) => state.resourceURL = resourceURL,
    SET_GENERAL_SEARCH: (state, generalSearch) => state.generalSearch = generalSearch,
    SET_QUERIES: (state, queries) => state.queries = queries,
    SET_PER_PAGE: (state, perPage) => state.perPage = perPage,
    SET_EDITING_ROW: (state, editingRow) => Object.assign(state.editingRow, editingRow),
    SET_ACTIVE_COLUMNS: (state, activeColumns) => state.activeColumns = activeColumns,
    TOGGLE_ALL(state){
        state.selectAll = !state.selectAll
        state.selectBoxes = {}
        state.tableData.forEach(item => {
            state.selectBoxes[item.id] = Boolean(state.selectAll)
            if(state.selected.indexOf(item.id) == -1 && state.selectAll) state.selected.push(item.id)
            if(state.selected.indexOf(item.id) != -1 && !state.selectAll) state.selected.splice(state.selected.indexOf(item.id), 1)
        })
    },

    // Set all columns to active and queries to empty strings
    INITIALIZE(state){
        state.columns.forEach(column => {
            state.activeColumns[column.title] = true;
            state.queries[column.title] = ''
        });
    },

    // Change datatable page
    CHANGE_PAGE: (state, pageNumber) => {
        state.currentPage = pageNumber
        state.selectAll = false
    },

    // Sort datatable by column
    SORT_BY_COLUMN(state, column) {
        if (column.title === state.sortedColumn) {
            state.order = (state.order === 'asc') ? 'desc' : 'asc'
        } else {
            state.sortedColumn = column.title
            state.order = 'asc'
        }
    },

    // Select item from datatable, if its included remove it
    SELECT(state, item){
        const itemIncluded = state.selected.includes(item.id)
        !itemIncluded ? state.selected.push(item.id) : state.selected.splice(state.selected.indexOf(item.id), 1)
        state.selectBoxes[item.id] = !Boolean(itemIncluded)
    },

    // Clear datatable filters
    CLEAR_FILTERS: state => {
        state.queries = {}
        state.generalSearch = ''
    },

    PREPARE_FOR_FETCH: (state, reset) => {
        // Reset the pagination if needs resetting
        if (reset) state.currentPage = 1

        // Make sure search null value is ''
        state.generalSearch = nullToEmpty(state.generalSearch)

        // Prepare the fetch URL
        state.dataFetchUrl = `${state.resourceURL}?page=${state.currentPage}&column=${state.sortedColumn}&order=${state.order}&per_page=${state.perPage}&search=${state.generalSearch}`

        // Make sure other search null values are ''
        Object.keys(state.queries).forEach(item => {
            state.queries[item] = nullToEmpty(state.queries[item])
            state.dataFetchUrl += '&' + item + '=' + state.queries[item];
        })
    },

    // Make changes on active datatable columns
    CHANGE_ACTIVE_COLUMNS: (state) => {
        let obj = {}
        Object.assign(obj, state.activeColumns)
        state.activeColumns = {}
        state.activeColumns = obj
    },

    // Fetch datatable data
    FETCH_DATA: _.debounce((state) => {
        axios.get(state.dataFetchUrl)
            .then(({ data }) => {
                state.pagination = data
                state.tableData = data.data
                state.loading = false
            }).catch(error => {
                state.loading = false
            })
    }, 500),

    // Update datatable row
    UPDATE(state, {vm}) {
        axios.post(state.resourceURL + '/update', {
            row: JSON.stringify(state.editingRow)
        }).then(response => {
            vm.$notify({type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been updated'})
        }).catch(error => {
            console.log(error.response.data)
            if(error.response.data.errors) state.errors = error.response.data.errors
            vm.$notify({type: 'error', text: `<i class="fa fa-warning" aria-hidden="true"></i> &nbsp ${error.response.data.message} `})
        })
    },

    // Destroy datatable row
    DESTROY(state, {row, vm}){
        axios.post(state.resourceURL + '/destroy', {
            id: row.id
        }).then(response => {
            vm.$notify({type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been deleted'})
        }).catch(error => {
            vm.$notify({type: 'error', text: `<i class="fa fa-warning" aria-hidden="true"></i> &nbsp ${error.response.data.message} `})
        })
    },

    // Update many datatable rows
    UPDATE_MULTIPLE(state, {vm}) {
        let row = state.editingMultipleRow
        axios.post(state.resourceURL + '/update-many', {
            selected: JSON.stringify(state.selected),
            row: JSON.stringify(row)
        }).then(response => {
            vm.$notify({type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Items have been updated'})
        }).catch(error => {
            vm.$notify({type: 'error', text: `<i class="fa fa-warning" aria-hidden="true"></i> &nbsp ${error.response.data.message} `})
        })
    },

    HANDLE_FAILURE(error, type){
        this.loading = false
        this.$store.dispatch('loading/setLoading', false)

        if(error){
            this.errors[type] = error.response.data.errors
        } else {
            this.fetchData(false, {type: 'danger', text: '<i class="fa fa-times" aria-hidden="true"></i> &nbsp;An error occured'})
        }
    },

    SET_DATATABLE: (state, {resourceURL, columns}) => { 
        console.log(columns)
        state.resourceURL = resourceURL
        state.columns = columns 
    },

    SET_OPTIONS: (state, options) => state.options = options,
    SET_PICKER: (state, payload) => {},
    EMPTY_QUERY: (state, title) => state.queries[title] = '',

    RESET_STATE: (state) => {
        Object.assign(state, DS.defaultState())
    }
}

function nullToEmpty(string){
    if(string == null) return ''
    return string
}