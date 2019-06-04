const mutations = {
    SET_DATA: (state, users) => {
        state.users = users
        state.columns = users.columns
        state.resourceURL = users.url
    },
    GET_DATATABLE: (state) => {state.resourceURL, state.columns}
}