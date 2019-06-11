export default {
    SET_DATA: (state, data) => {
        state[data] = data
        state.columns = data.columns
        state.resourceURL = data.url
    }
}