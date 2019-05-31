const state = {
    top: false,
    drawer: true
}

const getters = {
    getTop: state => {
        return state.top
    },
    getDrawer: state => {
        return state.drawer
    },
    getUpdateDialog: state => {
        return state.updateDialog
    },
    getUpdateMultipleDialog: state => {
        return state.updateMultipleDialog
    }
}

const mutations = {
    setTop(state, top) {
        state.top = top
    },
    setDrawer(state, drawer) {
        state.drawer = drawer
    },
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
    openUpdateDialog(state){
        state.updateDialog = true
    },
    openUpdateMultipleDialog(state){
        state.updateMultipleDialog = true
    },
    closeUpdateDialog(state){
        state.updateDialog = false
    },
    closeUpdateMultipleDialog(state){
        state.updateMultipleDialog = false
    },
    closeAllDialogs(){
        state.updateDialog = false
        state.updateMultipleDialog = false
    }
}

const actions = {
    setTop(context, top) {
        context.commit('setTop', top)
    },
    setDrawer(context, drawer) {
        context.commit('setDrawer', drawer)
    },
    toggleDrawer(context) {
        context.commit('toggleDrawer')
    },
    toTop() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    },
    closeAllDialogs(context){
         context.commit('closeAllDialogs')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
