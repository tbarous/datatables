export default {
    SET_DATA: (context, data) => {
    	context.commit('SET_COLUMNS', data.columns)
    	context.commit('SET_FORMS', data.forms)
    	context.commit('SET_RESOURCE_URL', data.resourceURL)
    	context.commit('SET_FILES', data.files)
    }
}