export default {
    CLEAR_FILTERS: (context) => {
        context.commit('START_LOADING')
        context.commit('CLEAR_FILTERS')
        context.dispatch('FETCH_DATA')
    },
    FETCH_DATA(context){
        context.commit('START_LOADING')
        context.commit('PREPARE_FOR_FETCH')
        context.commit('FETCH_DATA')
    },
    SORT_BY_COLUMN: (context, column) => {
        context.commit('START_LOADING')
        context.commit('SORT_BY_COLUMN', column)
        context.dispatch('FETCH_DATA')
    },
    CHANGE_PAGE: (context, page) => {
        context.commit('CHANGE_PAGE', page)
        context.dispatch('FETCH_DATA')
    },
    SET_PER_PAGE: (context, perPage) => {
        context.commit('START_LOADING')
        context.commit('SET_PER_PAGE', perPage)
        context.dispatch('FETCH_DATA')
    },

    UPDATE: (context, vm) => {
        context.commit('UPDATE', vm)
    },
    
    INITIALIZE: (context) => {
        context.commit('INITIALIZE')
    }
}