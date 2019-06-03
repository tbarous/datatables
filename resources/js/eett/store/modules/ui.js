const state = {
    loading: false,
    top: false,
    drawer: true,
    viewDialog: false,
    updateDialog: false,
    updateMultipleDialog: false
}

const getters = {
    getTop: state => state.top,
    getDrawer: state => state.drawer,
    getUpdateDialog: state => state.updateDialog,
    getViewDialog: state => state.viewDialog,
    getUpdateMultipleDialog: state => state.updateMultipleDialog,
    getLoading: state => state.loading
}

const mutations = {
    startLoading: (state) => state.loading = true,
    stopLoading: (state) => state.loading = false,
    setTop: (state, top) => state.top = top,
    setDrawer: (state, drawer) => state.drawer = drawer,
    toggleDrawer: (state) => state.drawer = !state.drawer,
    openUpdateDialog: (state) => state.updateDialog = true,
    openUpdateMultipleDialog: (state) => state.updateMultipleDialog = true,
    openViewDialog: (state) => state.viewDialog = true,
    closeUpdateDialog: (state) => state.updateDialog = false,
    closeViewDialog: (state) => state.viewDialog = false,
    closeUpdateMultipleDialog: (state) => state.updateMultipleDialog = false,
    closeAllDialogs(){
        state.updateDialog = false
        state.updateMultipleDialog = false
        state.viewDialog = false
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
