export default {
    SET_DATA: (state, pages) => state.pages = pages,
    REFRESH: (state) => {
		let temp = []
		temp = state.pages.slice(0);
		state.pages = []
		state.pages = temp.slice(0);
		// console.log(state.pages)
    }
}
