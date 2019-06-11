export default {
    SET_CELLS: (state, cells) => {
    	console.log(cells.url)
        state.cells = cells
        state.columns = cells.columns
        state.resourceURL = cells.url
    }
}
