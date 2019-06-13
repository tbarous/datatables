export default {
    TO_TOP: state => $("html, body").animate({ scrollTop: 0 }, "slow"),
    START_LOADING: state => state.loading = true,
    STOP_LOADING: state => state.loading = false,
    SET_TOP: (state, top) => state.top = top,
    SET_DRAWER: (state, drawer) => state.drawer = drawer,
    TOGGLE_DRAWER: state => state.drawer = !state.drawer,
    OPEN_ADD_DIALOG: state => state.addDialog = true,
    OPEN_UPDATE_DIALOG: state => state.updateDialog = true,
    OPEN_UPDATE_MULTIPLE_DIALOG: state => state.updateMultipleDialog = true,
    OPEN_VIEW_DIALOG: state => state.viewDialog = true,
    CLOSE_ADD_DIALOG: state => state.addDialog = false,
    CLOSE_UPDATE_DIALOG: state => state.updateDialog = false,
    CLOSE_VIEW_DIALOG: state => state.viewDialog = false,
    CLOSE_UPDATE_MULTIPLE_DIALOG: state => state.updateMultipleDialog = false,
    CLOSE_ALL_DIALOGS: state => {
        state.updateDialog = false;
        state.updateMultipleDialog = false;
        state.viewDialog = false;
    }
}