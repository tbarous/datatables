export default {
    GET_DATA: state => state.users,
    GET_RESOURCE_URL: state => state.resourceURL,
    GET_COLUMNS: state => state.columns,
    GET_DATATABLE: (state) => { return { resourceURL: state.resourceURL, columns: state.columns }},
    GET_CRUD: state => state.crud,
    GET_FILES: state => state.files
}