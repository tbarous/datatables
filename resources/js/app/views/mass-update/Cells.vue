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
    export default {
        created(){
            this.setDatatable('cells')
        }
    }
</script>