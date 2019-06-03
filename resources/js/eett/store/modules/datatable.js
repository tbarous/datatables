import _ from 'lodash'

const state = {
    url: '',
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
    editingRow: {}
}

const getters = {
    getLoading: state =>  state.loading,
    getSelectAll: state => state.selectAll,
    getPagination: state => state.pagination,
    getSelected: state => state.selected,
    getColumns: state => state.columns,
    getOrder: state => state.order,
    getPerPage: state => state.perPage,
    getSelectBoxes: state => state.selectBoxes,
    getTableData: state => state.tableData,
    getCurrentPage: state => state.currentPage,
    getSortedColumn: state => state.sortedColumn,
    getGeneralSearch: state => state.generalSearch,
    getEditingRow: state => state.editingRow,
    getQueries: state => state.queries,
    getItemsShow: state => state.itemsShow,
    getActiveColumns: state => state.activeColumns,
    noData: state => state.tableData.length === 0 && !state.loading,
    totalData: () => state.pagination.meta.to - state.pagination.meta.from + 1,
    getSerialNumber: (state) => (key) => (state.currentPage - 1) * state.perPage + 1 + key,
    getItemsCount() {
        if(state.perPage < state.pagination.meta.total) {
            return `${state.perPage} of ${state.pagination.meta.total} entries`
        }
        return `${state.pagination.meta.total} of ${state.pagination.meta.total} entries`
    },
    getPagesNumber() {
        if (!state.pagination.meta.to) {
            return []
        }
        let from = state.pagination.meta.current_page - state.offset
        if (from < 1) {
            from = 1
        }
        let to = from + (state.offset * 2)
        if (to >= state.pagination.meta.last_page) {
            to = state.pagination.meta.last_page
        }
        let pagesArray = []
        for (let page = from; page <= to; page++) {
            pagesArray.push(page)
        }
        return pagesArray
    }
}

const mutations = {
    setColumns: (state, columns) => state.columns = columns,
    startLoading: state => state.loading = true,
    stopLoading: state => state.loading = false,
    setResourceURL: (state, resourceURL) => state.url = resourceURL,
    toggleAll(state){
        if(!state.selectAll){
            state.selectAll = true
            state.tableData.map(item=>{
                state.selectBoxes[item.id] = true
                if(state.selected.indexOf(item.id) == -1) state.selected.push(item.id)
            })
        } else {
            state.selectAll = false
            state.tableData.map(item=>{
                state.selectBoxes[item.id] = false
                if(state.selected.indexOf(item.id) != -1)
                    state.selected.splice(state.selected.indexOf(item.id), 1)
            })
        }
    },
    setActiveColumnsAndQueries(state){
        state.columns.map(column => {
            state.activeColumns[column.title] = true;
            state.queries[column.title] = '';
        });
    },
    changePage: (state, pageNumber) => {
        state.currentPage = pageNumber
        state.selectAll = false
    },
    sortByColumn(state, column) {
        if (column.title === state.sortedColumn) {
            state.order = (state.order === 'asc') ? 'desc' : 'asc'
        } else {
            state.sortedColumn = column.title
            state.order = 'asc'
        }
    },
    select(item){
        if(!store.selected.includes(item.id)){
            store.selected.push(item.id)
            store.selectBoxes[item.id] = true
        } else {
            store.selected.splice(store.selected.indexOf(item.id), 1)
            store.selectBoxes[item.id] = false
        }
    },
    clearFilters: state => {
        state.queries = {}
        state.generalSearch = ''
    },
    fetchData: _.debounce(function(state, reset){
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
                // console.log(data)
                state.pagination = data
                state.tableData = data.data
                state.loading = false
                // state.$store.dispatch('loading/setLoading', false);
            }).catch(error => {
                // console.log(error)
                // state.tableData = []
                // state.handleFailure(error)
            })
    }, 500),
    setGeneralSearch: (state, generalSearch) => {
        state.generalSearch = generalSearch
    },
    setQueries: (state, queries) => {
        state.queries = queries
    },
    setPerPage: (state, perPage) => {
        state.perPage = perPage
    },
    setEditingRow: (state, editingRow) => {
        state.editingRow = editingRow
    }
}

const actions = {
    setColumns: (context, columns) => context.commit('setColumns', columns),
    startLoading: (context) => context.commit('startLoading'),
    stopLoading: (context) => context.commit('stopLoading'),
    setActiveColumnsAndQueries: (context) => context.commit('setActiveColumnsAndQueries'),
    select: (context, item) => context.commit('select', item),
    clearFilters: (context) => {
        context.commit('startLoading')
        context.commit('clearFilters')
        context.commit('fetchData')
    },
    fetchData(context){
        context.commit('startLoading')
        context.commit('fetchData')
    },
    sortByColumn: (context, column) => {
        context.commit('startLoading')
        context.commit('sortByColumn', column)
        context.commit('fetchData')
    },
    changePage: (context, page) => {
        context.commit('changePage', page)
        context.commit('fetchData')
    },
    setPerPage: (context, perPage) => {
        context.commit('startLoading')
        context.commit('setPerPage', perPage)
        context.commit('fetchData')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
