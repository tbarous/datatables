<template>
	<div>
		<file title="File" url="/storage/invoices.xlsx"></file>
        <excel title="Excel" url="/storage/invoices.xlsx"></excel>
        <PDF></PDF>
        <copy></copy>
        <v-divider></v-divider>
		<datatable></datatable>
		<update></update>
	</div>
</template>

<script>
    export default {
        created(){
            this.setDatatable('pages')
        },
  //       computed: {
		// 	pages: {
		// 		get(){
		// 			return this.$store.getters['pages/GET_PAGES']
		// 		},
		// 		set(pages){
		// 			this.$store.commit('pages/SET_PAGES', pages)
		// 		}				
		// 	}
		// }
    }
</script>