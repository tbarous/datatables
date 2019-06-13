<script>
	import Datatable from './../components/Datatable/Layout/MainSection'
	import Add from './../components/Dialogs/Add'
	import Update from './../components/Dialogs/Update'
	import UpdateMultiple from './../components/Dialogs/UpdateMultiple'
	import Excel from './../components/Datatable/Actions/Excel'
	import PDF from './../components/Datatable/Actions/PDF'
	import Copy from './../components/Datatable/Actions/Copy'
	import Columns from './../components/Dialogs/Columns'
	import File from './../components/Datatable/Actions/File'

	export default {
		name: 'DatatableMixin',
	    components: {
	        Datatable, 
	        Excel, 
	        PDF, 
	        Copy, 
	        Update, 
	        UpdateMultiple, 
	        Columns,
	        File,
	        Add
	    },

	    methods: {
	    	setDatatable(table){
	    		this.$store.commit('datatable/SET_DATATABLE', this.$store.getters[table + '/GET_DATATABLE'])
	    	}
	    }
	}
</script>