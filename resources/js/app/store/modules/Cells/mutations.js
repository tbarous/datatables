export default {
    SET_CELLS: (state, cells) => {
        state.cells = cells
        state.columns = cells.columns
        state.resourceURL = cells.url
        state.filters = cells.filters
    }
}
