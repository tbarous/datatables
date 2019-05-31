import _ from 'lodash'

const state = {
    columns: {},
    loading: false,
    pagination: { meta: { to: 1, from: 1 } },
    offset: 4,
    currentPage: 1,
    perPage: 15,
    order: 'desc',
    itemsShow: [15, 50, 100],
    sortedColumn: '',
    selectAll: false,
    generalSearch: '',
    tableData: [],
    queries: {},
    activeColumns: {},
    selected: [],
    selectBoxes: {},
}

const getters = {
    getLoading: state =>  state.loading,
    getSelectAll: state => state.selectAll,
    getPagination: state => state.pagination,
    getSelected: state => state.selected,
    getColumns: state => state.columns,
    getPerPage: state => state.perPage,
    getCurrentPage: state => state.currentPage,
    getPagesNumber: state => state.pagesNumber,
    getItemsShow: state => state.itemsShow,
    getActiveColumns: state => state.activeColumns,
    noData: state => state.tableData.length === 0 && !state.loading ? true : false,
    totalData: () => state.pagination.meta.to - state.pagination.meta.from + 1,
    serialNumber: (state) => (key) => (state.currentPage - 1) * state.perPage + 1 + key,
    getItemsCount() {
        if(state.perPage < state.pagination.meta.total) {
            return `${state.perPage} of ${state.pagination.meta.total} entries`
        }
        return `${state.pagination.meta.total} of ${state.pagination.meta.total} entries`
    },
    pagesNumber() {
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
        state.loading = true
        state.currentPage = pageNumber
        state.selectAll = false
    },

    sortByColumn(column) {
        state.loading = true;
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
        state.columns.map(column => {
            state.queries[column.title] = '';
        });
        state.fetchData()
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
                state.pagination = data
                state.tableData = data.data
                state.loading = false
                state.$store.dispatch('loading/setLoading', false);
            }).catch(error => {
                state.tableData = []
                state.handleFailure(error)
            })
    }, 500),
}

const actions = {
    setColumns: (context, columns) => context.commit('setColumns', columns),
    startLoading: (context) => context.commit('startLoading'),
    stopLoading: (context) => context.commit('stopLoading'),
    setActiveColumnsAndQueries(context){
        context.commit('setActiveColumnsAndQueries')
    },
    fetch(context, reset = false){
        context.commit('startLoading')
        context.dispatch('api/fetch')
    },
    clearFilters(context){
        context.commit('clearFilters')
    },
    fetchData(context){
        context.commit('startLoading')
        context.commit('fetchData')
    },
    select(context, item){
        context.commit('select', item)
    },

    sortByColumn: (context, column) => {
        context.commit('sortedColumn', column)
        context.commit('fetchData')
    },

    changePage: (context) => {
        context.commit('changePage')
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
