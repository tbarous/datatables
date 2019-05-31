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
    toggleAll(){
        if(!this.selectAll){
            this.selectAll = true
            this.tableData.map(item=>{
                this.selectBoxes[item.id] = true
                if(this.selected.indexOf(item.id) == -1) this.selected.push(item.id)
            })
        } else {
            this.selectAll = false
            this.tableData.map(item=>{
                this.selectBoxes[item.id] = false
                if(this.selected.indexOf(item.id) != -1)
                    this.selected.splice(this.selected.indexOf(item.id), 1)
            })
        }
    },
    setActiveColumnsAndQueries(){
        this.columns.map(column => {
            this.activeColumns[column.title] = true;
            this.queries[column.title] = '';
        });
    },

    fetchData(reset = false, msg = null){
        this.loading = true
        this.fetch(reset, msg)
    },

    fetch: _.debounce(function(reset, msg){
        if (reset) this.currentPage = 1
        if (this.generalSearch == null) this.generalSearch = ''

        let dataFetchUrl = `${this.url}?page=${this.currentPage}&column=${this.sortedColumn}&order=${this.order}&per_page=${this.perPage}&search=${this.generalSearch}`

        Object.keys(this.queries).map(item => {
            let queryItem = this.queries[item];
            if (queryItem == null) queryItem = ''
            dataFetchUrl += '&' + item + '=' + queryItem;
        })

        this.loading = true;
        axios.get(dataFetchUrl)
            .then(({ data }) => {
                this.pagination = data
                this.tableData = data.data
                // if(msg) setTimeout(() => this.$notify(msg), 200)
                this.loading = false
                this.$store.dispatch('loading/setLoading', false);
            }).catch(error => {
                this.tableData = []
                this.handleFailure(error)
            })
    }, 500),

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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
