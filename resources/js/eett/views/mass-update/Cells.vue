<template>
	<div>
		<excel></excel>
        <PDF></PDF>
        <copy></copy>
        <v-divider></v-divider>
		<datatable></datatable>
		<update></update>
	</div>
</template>

<script>
	import Update from './../../components/Dialogs/Update'
	import Datatable from '../../components/Datatable/Datatable'
	import Excel from './../../components/Datatable/Actions/Excel'
	import PDF from './../../components/Datatable/Actions/PDF'
	import Copy from './../../components/Datatable/Actions/Copy'

	export default {
		components: {Datatable, Excel, PDF, Copy, Update},

		created(){
	        this.$store.commit('datatable/SET_DATATABLE', this.$store.getters['cells/GET_DATATABLE'])
	    },

		computed: {
			pages: {
				get(){
					return this.$store.getters['cells/GET_CELLS']
				},
				set(cells){
					this.$store.commit('cells/SET_CELLS', cells)
				}				
			}
		}
	}
</script>