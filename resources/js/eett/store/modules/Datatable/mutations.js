export default {
    SET_COLUMNS: (state, columns) => state.columns = columns,
    START_LOADING: state => state.loading = true,
    STOP_LOADING: state => state.loading = false,
    SET_RESOURCE_URL: (state, resourceURL) => state.url = resourceURL,
    SET_GENERAL_SEARCH: (state, generalSearch) => state.generalSearch = generalSearch,
    SET_QUERIES: (state, queries) => state.queries = queries,
    SET_PER_PAGE: (state, perPage) => state.perPage = perPage,
    SET_EDITING_ROW: (state, editingRow) => Object.assign(state.editingRow, editingRow),
    SET_ACTIVE_COLUMNS: (state, activeColumns) => state.activeColumns = activeColumns,
    TOGGLE_ALL(state){
        state.selectAll = !state.selectAll
        state.tableData.map(item => {
            state.selectBoxes[item.id] = Boolean(state.selectAll)
            if(state.selected.indexOf(item.id) == -1) state.selected.push(item.id)
            if(state.selected.indexOf(item.id) != -1) state.selected.splice(state.selected.indexOf(item.id), 1)
        })
    },
    INITIALIZE(state){
        state.columns.map(column => {
            state.activeColumns[column.title] = true;
            state.queries[column.title] = ''
        });
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
    SELECT(state, item){
        let hmm = state.selected.includes(item.id)
        hmm ? state.selected.push(item.id) : state.selected.splice(state.selected.indexOf(item.id), 1)
        state.selectBoxes[item.id] = !Boolean(hmm)
    },
    CLEAR_FILTERS: state => {
        state.queries = {}
        state.generalSearch = ''
    },
    FETCH_DATA: _.debounce(function(state, reset){
        if (reset) state.currentPage = 1
        if (state.generalSearch == null) state.generalSearch = ''
        let dataFetchUrl = `${state.url}?page=${state.currentPage}&column=${state.sortedColumn}&order=${state.order}&per_page=${state.perPage}&search=${state.generalSearch}`

        Object.keys(state.queries).map(item => {
            let queryItem = state.queries[item];
            if (queryItem == null) queryItem = ''
            dataFetchUrl += '&' + item + '=' + queryItem;
        })

        state.loading = true;
        axios.get(dataFetchUrl)
            .then(({ data }) => {
                state.pagination = data
                state.tableData = data.data
                state.loading = false
                // state.$store.dispatch('loading/setLoading', false);
            }).catch(error => {
                // state.tableData = []
                // state.handleFailure(error)
            })
    }, 500),
    CHANGE_ACTIVE_COLUMNS: (state) => {
        let obj = {}
        Object.assign(obj, state.activeColumns)
        state.activeColumns = {}
        state.activeColumns = obj
    },
    UPDATE(state) {
         axios.post(state.url + '/update', {
            row: JSON.stringify(state.editingRow)
        }).then(response => {
            console.log(response)
            // this.errors.update = ''
            // this.$store.dispatch('loading/setLoading', false);
            
            // state.fetchData(false)
        }).catch(error => {
            // this.handleFailure(error, 'update')
        })
    },
    destroy(index, row){
        this.$store.dispatch('loading/setLoading', true);
        axios.post(this.url + '/destroy', {
            id: row.id
        }).then(response => {
            this.fetchData(false, {type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been deleted'})
        }).catch(error => {
            this.handleFailure(error)
        })
    },
    updateMultiple(row) {
        this.$store.dispatch('loading/setLoading', true)
        axios.post(this.url + '/update-many', {
            selected: JSON.stringify(this.selected),
            row: JSON.stringify(row)
        }).then(response => {
            this.fetchData(false, {type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Items has been updated'})
        }).catch(error => {
            this.handleFailure(error)
        })
    },
    handleFailure(error, type){
        this.loading = false
        this.$store.dispatch('loading/setLoading', false)

        if(error){
            console.log(error.response.data.errors)
            this.errors[type] = error.response.data.errors
        } else {
            this.fetchData(false, {type: 'danger', text: '<i class="fa fa-times" aria-hidden="true"></i> &nbsp;An error occured'})
        }
    },

    SET_DATATABLE: (state, resourceURL, columns) => { 
        state.resourceURL = resourceURL
        state.columns = columns 
    }
}
