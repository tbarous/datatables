export default {
    SET_MENU: (state, menu) => state.menu = menu,
    SET_PAGES: (state, pages) => {
        state.pages = pages
        state.columns = pages.columns
        state.resourceURL = pages.url
    }
}
