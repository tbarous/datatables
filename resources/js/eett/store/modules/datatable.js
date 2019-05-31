import _ from 'lodash'

const state = {
    columns: {},
    loading: false,
    pagination: {
        meta: {
            to: 1,
            from: 1
        }
    },
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
    getColumns: state => {
        return state.columns
    },
    getColumns: state => {
        return state.columns
    },
    getItemsCount() {
        if(this.perPage < this.pagination.meta.total) {
            return `${this.perPage} of ${this.pagination.meta.total} entries`
        }
        return `${this.pagination.meta.total} of ${this.pagination.meta.total} entries`
    },
    noData(){
        return this.tableData.length === 0 && !this.loading ? true : false
    },
    pagesNumber() {
        if (!this.pagination.meta.to) {
            return []
        }
        let from = this.pagination.meta.current_page - this.offset
        if (from < 1) {
            from = 1
        }
        let to = from + (this.offset * 2)
        if (to >= this.pagination.meta.last_page) {
            to = this.pagination.meta.last_page
        }
        let pagesArray = []
        for (let page = from; page <= to; page++) {
            pagesArray.push(page)
        }
        return pagesArray
    },
    totalData() {
        return (this.pagination.meta.to - this.pagination.meta.from) + 1
    }
}

const mutations = {
    setColumns(state, columns){
        state.columns = columns
    },
    startLoading(state){
        state.loading = true
    },
    stopLoading(state){
        state.loading = false
    },
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

    

    serialNumber(key) {
        return (this.currentPage - 1) * this.perPage + 1 + key
    },

    changePage(pageNumber) {
        this.loading = true
        this.currentPage = pageNumber
        this.selectAll = false
        this.fetchData()
    },

    sortByColumn(column) {
        this.loading = true;
        if (column.title === this.sortedColumn) {
            this.order = (this.order === 'asc') ? 'desc' : 'asc'
        } else {
            this.sortedColumn = column.title
            this.order = 'asc'
        }
        this.fetchData()
    },

    select(item){
        if(!this.selected.includes(item.id)){
            this.selected.push(item.id)
            this.selectBoxes[item.id] = true
        } else {
            this.selected.splice(this.selected.indexOf(item.id), 1)
            this.selectBoxes[item.id] = false
        }
    },
    clearFilters(){
        this.queries = {}
        this.generalSearch = ''
        this.columns.map(column => {
            this.queries[column.title] = '';
        });
        this.fetchData()
    }
}

const actions = {
    setColumns(context, columns){
        context.commit('setColumns', columns)
    },
    startLoading(context){
        context.commit('startLoading')
    },
    stopLoading(context){
        context.commit('stopLoading')
    },
    setActiveColumnsAndQueries(context){
        context.commit('setActiveColumnsAndQueries')
    },
    fetchData(context, reset = false){
        context.commit('startLoading')
        context.dispatch('api/fetch')
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
