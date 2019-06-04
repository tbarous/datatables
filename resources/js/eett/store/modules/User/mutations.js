export default {
    SET_DATA: (state, users) => {
        state.users = users
        state.columns = users.columns
        state.resourceURL = users.url
    }
}