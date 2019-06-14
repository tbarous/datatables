import Form from './../../../core/Form'

export default {
    // SET_DATA: (state, data) => {
    //     state[data] = data
    //     state.columns = data.columns
    //     state.resourceURL = data.url
    // }
    SET_COLUMNS: (state, columns) => {
    	state.columns = columns
    },
    SET_FORMS: (state, forms) => {
    	// state.forms = forms
        forms.forEach(item => {
            state.forms.push(new Form(item))
        })
    },
    SET_RESOURCE_URL: (state, resourceURL) => {
    	state.resourceURL = resourceURL
    }
}