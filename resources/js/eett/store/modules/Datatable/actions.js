export default {
    // setColumns: (context, columns) => context.commit('setColumns', columns),
    // startLoading: (context) => context.commit('startLoading'),
    // stopLoading: (context) => context.commit('stopLoading'),
    // setActiveColumnsAndQueries: (context) => context.commit('setActiveColumnsAndQueries'),
    // select: (context, item) => context.commit('select', item),
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
    },
    update: ({ dispatch, commit, getters, rootGetters }) => {
        commit('update')
    }
}