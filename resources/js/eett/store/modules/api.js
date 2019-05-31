const state = {
    resourceURL: ''
}

const getters = {
    getResourceURL: state => {
        return state.resourceURL
    }
}

const mutations = {
    setResourceURL(state, resourceURL){
        state.resourceURL = resourceURL
    },
    update() {
        this.$store.dispatch('loading/setLoading', true);
        axios.post(this.url + '/update', {
            row: JSON.stringify(this.editingRow)
        }).then(response => {
            console.log(response)
            this.errors.update = ''
            this.$store.dispatch('loading/setLoading', false);
            this.$notify({type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been updated'})
            this.fetchData(false, {type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been updated'})
        }).catch(error => {
            this.handleFailure(error, 'update')
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
}

const actions = {
    // setResourceURL(context, resourceURL){
    //     context.commit('setResourceURL', resourceURL)
    // }
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
