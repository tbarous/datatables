<template>
	<div>
		<v-treeview :items="pages"></v-treeview>
		<datatable></datatable>
	</div>
</template>

<script>
	import Datatable from '../components/Datatable/Datatable'
	export default {
		components: {Datatable},

		created(){
	        this.$store.commit('datatable/SET_DATATABLE', this.$store.getters['pages/GET_DATATABLE'])
	    },

		computed: {
			pages: {
				get(){
					return this.$store.getters['pages/GET_PAGES']
				},
				set(pages){
					this.$store.commit('pages/SET_PAGES', pages)
				}				
			}
		}
	}
</script>