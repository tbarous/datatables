export default {
    // setColumns: (context, columns) => context.commit('setColumns', columns),
    // startLoading: (context) => context.commit('startLoading'),
    // stopLoading: (context) => context.commit('stopLoading'),
    // setActiveColumnsAndQueries: (context) => context.commit('setActiveColumnsAndQueries'),
    // select: (context, item) => context.commit('select', item),
    CLEAR_FILTERS: (context) => {
        context.commit('START_LOADING')
        context.commit('CLEAR_FILTERS')
        context.commit('FETCH_DATA')
    },
    FETCH_DATA(context){
        context.commit('START_LOADING')
        context.commit('FETCH_DATA')
    },
    SORT_BY_COLUMN: (context, column) => {
        context.commit('START_LOADING')
        context.commit('SORT_BY_COLUMN', column)
        context.commit('FETCH_DATA')
    },
    CHANGE_PAGE: (context, page) => {
        context.commit('CHANGE_PAGE', page)
        context.commit('FETCH_DATA')
    },
    SET_PER_PAGE: (context, perPage) => {
        context.commit('START_LOADING')
        context.commit('SET_PER_PAGE', perPage)
        context.commit('FETCH_DATA')
    },
    UPDATE: ({ dispatch, commit, getters, rootGetters }) => {
        commit('UPDATE')
    },
    INITIALIZE: (context) => {
        context.commit('INITIALIZE')
    }
}