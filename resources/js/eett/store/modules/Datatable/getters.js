export default {
    GET_LOADING: state =>  state.loading,
    GET_SELECT_ALL: state => state.selectAll,
    GET_PAGINATION: state => {console.log(state.pagination);return state.pagination},
    GET_SELECTED: state => state.selected,
    GET_COLUMNS: state => state.columns,
    GET_ORDER: state => state.order,
    GET_PER_PAGE: state => state.perPage,
    GET_SELECT_BOXES: state => state.selectBoxes,
    GET_TABLE_DATA: state => state.tableData,
    GET_CURRENT_PAGE: state => state.currentPage,
    GET_SORTED_COLUMN: state => state.sortedColumn,
    GET_GENERAL_SEARCH: state => state.generalSearch,
    GET_EDITING_ROW: state => state.editingRow,
    GET_EDITING_MULTIPLE_ROW: state => state.editingMultipleRow,
    GET_QUERIES: state => state.queries,
    GET_ITEMS_SHOW: state => state.itemsShow,
    GET_ACTIVE_COLUMNS: state => state.activeColumns,
    NO_DATA: state => state.tableData.length === 0 && !state.loading,
    TOTAL_DATA: () => state.pagination.meta.to - state.pagination.meta.from + 1,
    GET_SERIAL_NUMBER: (state) => (key) => (state.currentPage - 1) * state.perPage + 1 + key,
    GET_ITEMS_COUNT: (state) => {
        if(state.perPage < state.pagination.meta.total) {
            return `${state.perPage} of ${state.pagination.meta.total} entries`
        }
        return `${state.pagination.meta.total} of ${state.pagination.meta.total} entries`
    },
    GET_PAGES_NUMBER: (state) => {
        if (!state.pagination.meta.to) {
            return []
        }
        let from = state.pagination.meta.current_page - state.offset
        if (from < 1) {
            from = 1
        }
        let to = from + (state.offset * 2)
        if (to >= state.pagination.meta.last_page) {
            to = state.pagination.meta.last_page
        }
        let pagesArray = []
        for (let page = from; page <= to; page++) {
            pagesArray.push(page)
        }
        return pagesArray
    }
}