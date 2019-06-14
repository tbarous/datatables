import Form from './../../../core/Form'

export default {
    SET_COLUMNS: (state, columns) => {
    	state.columns = columns
    },
    SET_FORMS: (state, forms) => {
        forms.forEach(item => {
            state.forms.push(new Form(item))
        })
    },
    SET_RESOURCE_URL: (state, resourceURL) => {
    	state.resourceURL = resourceURL
    },
    SET_FILES: (state, files) => {
        state.files = files
    },
    SET_CRUD: (state, crud) => {
        state.crud = crud
    }
}