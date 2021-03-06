export default {
    GET_RESOURCE_URL: state => state.resourceURL,
    GET_COLUMNS: state => state.columns,
    GET_DATATABLE: (state) => { 
    	return { 
    		resourceURL: state.resourceURL, 
    		columns: state.columns, 
    		filters: state.filters 
    	}
    }
}
